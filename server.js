const express=require('express');
const app=express();
const {MongoClient} =require('mongodb'); 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { NlpManager } = require('node-nlp');
const myModel= new NlpManager({ languages: ['en'] });


const client = new MongoClient(uri) //on crée un objet mongoClient pour connecter à l'uri donnée, mais cela  n'ouvre pas la connexion entre la db et le client
const myDB = client.db("nlpDB");
const feuille = myDB.collection('processedLogs') ; 

async function main(){
    try{
        await client.connect();
        app.post('/',async(req,res)=>{
    try{
        await myModel.load()
        const {text}=req.body
        const response =  await myModel.process('en', text);
        const log = {utterance:response.utterance,label:response.intent,confidence:response.score,entities:response.entities,date:new date()};
        const result = await feuille.updateOne(
            { utterance: response.utterance }, //le filtre ou le query cherche le document au meme texte
            { $setOnInsert: log  }, // si n'existe pas, insère
            { upsert: true }   // crée si pas trouvé
        );
        if (result.upsertedCount > 0) {
            res.status(201).json('Log inséré, ID:', result.upsertedId);
        } else {
            res.status(400).json('insertin ignorée: [doublon refusé]', result.upsertedId);        }
    } catch (e) {
        res.status(500).json('erreur dans POST: ',e);
    }
    });
    }catch(e){
        console.log("probleme de cnx",e);
    }/*finally{
        await client.close();
        console.log("client fermé");
    }*/
};

main();
