
//in this project we want our model to take spoken input, and classify it based on what the user wants to achieve , therefore we're using intent recognition
//we manually provide data samples and their associated intent. it will be used as training data for our model  
// we have to put to mind that improving NLU performance demands that the focus shift from the NLU model to the training data.
// as the project description put us in "customer help center" context=>I narrowed down the intents to three: greetings.hello , customer.help , shipping policy , return and exchange policy , track norder 
// myModel.addDocument('en', 'hello hey greetings', 'greetings'); => this is bad practice because it takes hello hey greetings as one sentence and no one talks like that so it weakens the model. we have to put real life user utterances
myModel.addDocument('en', 'hi there ', 'greetings ');
myModel.addDocument('en', ' hi', 'greetings');
myModel.addDocument('en', ' hey', 'greetings');
myModel.addDocument('en', ' hello', 'greetings');
myModel.addDocument('en', 'help', 'customer help');
myModel.addDocument('en', 'problem', 'customer help');
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
//now we add our named entities 
//one of the unnamed tasks u have to do is an analysis for what entities and intents are best based on what you want your model to understand 
//manager.addNamedEntityText('product',)
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
