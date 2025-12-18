const express=require('express');
const app=express();
const myDB = require ('./connection.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT=3000
const axios = require('axios')
const feuille = myDB.collection('processedLogs') ; 

async function main(){
    app.post('/api/request',async(req,res)=>{
        const usertext =req.body.text;
        try{
            const response=await axios.post('http://127.0.0.1:8000/api/request',{text:usertext});
            const data=response.data ;
            const log = {utterance:data.utterance,intent:data.intent,confidence:data.confidence,entities:data.entities,timestamp:data.timestamp};
            try{
                const result = await feuille.updateOne(
                { utterance: data.utterance }, //le filtre ou le query cherche le document au meme texte
                { $setOnInsert: log  }, // si n'existe pas, insère
                { upsert: true }   // crée si pas trouvé
                );
                res.json(result);
                res.status(201).json({message:'Log inséré, ID:',id: result.upsertedId});
            }catch(e){
                res.status(400).json({message:'insertin ignorée: [doublon refusé]'});   
            }     
        } catch (e) {
            res.status(500).json({message:'erreur dans POST: ',error:e.toString()});

        }
    });
    app.listen(PORT,()=>{console.log(`serveur en écoute en ${PORT}`)}) ;
}

main();
