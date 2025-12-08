const {MongoClient} =require('mongodb'); 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { NlpManager } = require('node-nlp');
const myModel= new NlpManager({ languages: ['en'] });

const uri ='mongodb+srv://marambenmohamed14_db_user:HcdZlbOLqpVvuwEe@cluster0.hb4tsvh.mongodb.net/?appName=Cluster0';
const client = new MongoClient(uri) 
const myDB = client.db("nlpDB");
const feuille = myDB.collection('KnowledgeBase') ;

async function add(feuille,data){
    try{
        await client.connect();
        const result=feuille.insertDocument({intent:"Wheres's my order?",patterns:["Can you tell me the current status of my order?", 
            "I need an update on my shipment's location.", "Where is my package right now?", "Can you provide a tracking update for order #[ORDER_NUMBER]?",
            "I'd like to follow the delivery progress of my recent purchase.", "My order is past the estimated delivery date. What happened?", 
            "Why hasn't my package arrived yet?", "The delivery is running late. Can you check on it?", "It's [NUMBER] days past the promised delivery. Where's my stuff?",
            "My order is delayed. Can you give me a new delivery estimate?", "The tracking says delivered, but I don't have it. Where is it?", "My order status is delivered but I can't find the package.",
            "Can you help me locate a package marked as delivered?", "I wasn't home when it said it was delivered. Where was it left?",
            "The delivery notification came, but the package isn't at my door.", "I got a notification that my package is undeliverable. What does that mean?", 
            "Why was my order returned to sender as undeliverable?", "My shipment status says undeliverable." ,"Where is my order now?", 
            "The courier couldn't deliver my package. What happens next?", "An attempt was made but the package couldn't be delivered. How do I get it?"],
        entities:["order_number", "delivery_status", "delivery_date", "time_duration", "location"],solution:"[]"})
    }catch(e){
        console.log("erreur dans insertion: ");
        console.error(e);
    }
}