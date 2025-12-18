const {MongoClient  }= require ('mongodb') ;
const uri = 'mongodb+srv://marambenmohamed14_db_user:HcdZlbOLqpVvuwEe@cluster0.hb4tsvh.mongodb.net/?appName=Cluster0'
const client = new MongoClient(uri) //on crée un objet mongoClient pour connecter à l'uri donnée, mais cela  n'ouvre pas la connexion entre la db et le client

async function connect(){
    try{
        const result=await client.connect()
        console.log('serveur connecté avec la base');
    }catch(e){
        console.error(e)
    }
}
connect()
const myDB = client.db("nlpDB");
module.exports=myDB ;