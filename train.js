
const { Recognizers, Culture } = require('@microsoft/recognizers-text-suite');
const { TextEntityRecognizer, ListEntityRecognizer, RegexEntityRecognizer } = require('botbuilder');
//in this project we want our model to take spoken input, and classify it based on what the user wants to achieve , therefore we're using intent recognition
//we manually provide data samples and their associated intent. it will be used as training data for our model  
// we have to put to mind that improving NLU performance demands that the focus shift from the NLU model to the training data.
// as the project description put us in "customer help center" context=>I narrowed down the intents to three:   shipping policy , return and exchange policy , track norder 
// myModel.addDocument('en', 'hello hey greetings', 'greetings'); => this is bad practice because it takes hello hey greetings as one sentence and no one talks like that so it weakens the model. we have to put real life user utterances also greetingss fit better as entities and not intents
//one of the unnamed tasks u have to do is an analysis for what entities and intents are best based on what you want your model to understand
//here the model does get trained for intents but not for entity extraction! here, entity extraction is not machine learning !it gives us a set of lookup values but it's not data to train the model, in python however that changes with ML libraries like huggingface
myModel.addDocument('en','Do you offer same day shipping?', 'Shipping and handling policy'); 
myModel.addDocument("en","Can you ship to Italy?", "Shipping and handling policy");  
myModel.addDocument("en","How long does delivery take?", "Shipping and handling policy");  //i'm trying to put words variations(package,order,delivery..) to improve the data
myModel.addDocument("en","Can I buy online and pick up my order in store?", "Shipping and handling policy");  
myModel.addDocument("en","What are your shipping options?", "Shipping and handling policy"); 
myModel.addDocument("en","My order arrived damaged, can I get a refund?", " return or exchange policy");  
myModel.addDocument("en","You sent me the wrong item", "return or exchange policy");
myModel.addDocument("en","I want to exchange my item for another colour", "return or exchange policy"); 
myModel.addDocument("en","I ordered something and it wasn't what I expected. Can I return it?", "return or exchange policy");  
myModel.addDocument("en","What's your return policy?", "return or exchange policy");
myModel.addDocument("en","Where's my package?", "Track order");
myModel.addDocument("en","What's my shipping number?", "Track order");
myModel.addDocument("en","Which carrier is my package with?", "Track order"); 
myModel.addDocument("en","Is my package delayed?", "Track order")
 
//now we add our named ,pattern-based entities 
//entities will let my model extract and isolate structured pieces of data from the user's unstructured input
const { TextEntityRecognizer, ListEntityRecognizer, RegexEntityRecognizer } = require('botbuilder');

// Create recognizers
const textRecognizer = new TextEntityRecognizer();
const listRecognizer = new ListEntityRecognizer();
const regexRecognizer = new RegexEntityRecognizer();
//here our entity varibale 'subscription_plan' encapsulates three variations of subscription! what I'm trying to do is make my model performant and as i said the focus needs to shift from the model itself to the data !
listRecognizer.addInstance('subscription_plan', 'basic', ['basic', 'basic plan', 'monthly plan']);
listRecognizer.addInstance('subscription_plan', 'premium', ['premium', 'premium plan', 'gold plan', 'yearly plan']);
listRecognizer.addInstance('subscription_plan', 'trial', ['trial', 'free trial', 'trial period']);
listRecognizer.addInstance('delivery_status',null,'eng',['shipped','processing','out for delivery','delivered','delayed']);
listRecognizer.addInstance('service_type',null,'eng',['refund',' exchange', 'technical support', 'account help']);
listRecognizer.addInstance('return_reason', 'damaged', ['damaged', 'broken', 'defective', 'arrived damaged']);
listRecognizer.addInstance('return_reason', 'wrong_item', ['wrong item', 'incorrect item', 'sent the wrong item']);
listRecognizer.addInstance('return_reason', 'not_as_expected', ['not what I expected', "doesn't match description", 'different than pictured']);
listRecognizer.addInstance('return_reason', 'size_issue', ['wrong size', 'too small', 'too large', 'size issue']);

listRecognizer.addInstance('request_type', 'refund', ['refund', 'I want a refund', 'refund request']);
listRecognizer.addInstance('request_type', 'exchange', ['exchange', 'I want to exchange', 'replace item']);
listRecognizer.addInstance('request_type', 'cancel_order', ['cancel order', 'i want to cancel', 'cancel my purchase']);
listRecognizer.addInstance('request_type', 'status_update', ['order status', 'where is my order', 'tracking update']);

listRecognizer.addInstance('greeting_word', 'hello', ['hello', 'hi', 'hey', 'good morning', 'good evening']);

// Regex entities (pattern-based)
regexRecognizer.addRegexEntity('order_number','eng', /\b#[0-9]{4}\b/i);
regexRecognizer.addRegexEntity('location', /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/);
regexRecognizer.addRegexEntity('date', /\b(?:\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|today|tomorrow|yesterday|next week|next month)\b/gi);
regexRecognizer.addRegexEntity('price_amount', /\b(?:\$|€|£)\s?\d+(?:\.\d{2})?|\b\d+(?:\.\d{2})?\s?(USD|EUR|GBP)\b/gi);
regexRecognizer.addRegexEntity('discount_code', /\b[A-Z0-9]{5,15}\b/);

//Now these recognizers can be used in the bot's answers!
module.exports = { textRecognizer, listRecognizer, regexRecognizer };

async function main(){
    try{
    await myModel.train()
    await myModel.save()
    const response =  await myModel.process('en', 'I have a complaint about my order you gave me the wrong size');
    console.log("reponse est: ",response); 

    }catch(e){
        console.error(e);
    } 
}    
main();
