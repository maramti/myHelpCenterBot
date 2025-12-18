const express=require('express');
const app=express();
const myDB = require ('./connection.js')
const cors=require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:5173'}))
const PORT=3000
const axios = require('axios')
const feuille = myDB.collection('processedLogs') ; 
const generateResponse =require ('./response.js')

async function main(){
    app.post('/api/request',async(req,res)=>{
        const usertext =req.body.text;
        try{ 
            const response=await axios.post('http://127.0.0.1:8000/api/request',{text:usertext}); //l'objet retourné par axios ici je doit le rattraper et l'encapsuler en une variable alors que res est fournie par node quand mon serveur envoie une requete http 
            const data=response.data ;
            //const output=generateResponse(data.intent,data.entities)
            const log = {utterance:data.utterance,intent:data.intent,confidence:data.confidence,entities:data.entities,timestamp:data.timestamp};
            try{
                const result = await feuille.updateOne(
                { utterance: data.utterance }, //le filtre ou le query cherche le document au meme texte
                { $setOnInsert: log  }, // si n'existe pas, insère
                { upsert: true }   // crée si pas trouvé
                );
               console.log({id: result.upsertedId});
            }catch(e){
                console.log({message:'insertin ignorée: [doublon refusé]'});   
            }   
        res.json(log)  
        } catch (e) {
            res.status(500).json({message:'erreur dans POST: ',error:e.toString()});

        }
    });
    app.listen(PORT,()=>{console.log(`serveur en écoute en ${PORT}`)}) ;
}

main();
