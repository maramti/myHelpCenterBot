#in this project we want our model to take spoken input, and classify it based on what the user wants to achieve , therefore we're using intent recognition
#we manually provide data samples and their associated intent. it will be used as training data for our model  
# we have to put to mind that improving NLU performance demands that the focus shift from the NLU model to the training data.
#as the project description put us in "customer help center" context=>I narrowed down the intents to three:   shipping policy , return and exchange policy , track norder 
#['hello hey greetings] => this is bad practice because it takes hello hey greetings as one sentence and no one talks like that so it weakens the model. we have to put real life user utterances also greetingss fit better as entities and not intents
#one of the unnamed tasks u have to do is an analysis for what entities and intents are best based on what you want your model to understand
#here the model does get trained for intents but not for entity extraction! here, entity extraction is not machine learning !it gives us a set of lookup values but it's not data to train the model,  however that changes with ML libraries like huggingface
