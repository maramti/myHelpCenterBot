#in this project we want our model to take spoken input, and classify it based on what the user wants to achieve , therefore we're using intent recognition
#we manually provide data samples and their associated intent. it will be used as training data for our model  
# we have to put to mind that improving NLU performance demands that the focus shift from the NLU model to the training data.
#as the project description put us in "customer help center" context=>I narrowed down the intents to three:   shipping policy , return and exchange policy , track norder 
#['hello hey greetings'] => this is bad practice because it takes hello hey greetings as one sentence and no one talks like that so it weakens the model. we have to put real life user utterances also greetingss fit better as entities and not intents
#one of the unnamed tasks u have to do is an analysis for what entities and intents are best based on what you want your model to understand
#here the model does get trained for intents but not for entity extraction! here, entity extraction is not machine learning !it gives us a set of lookup values but it's not data to train the model,  however that changes with ML libraries like huggingface
from processor import preprocessing
from vectorize import vectorizing
import json 
import pickle
import sklearn 
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from sklearn.calibration import CalibratedClassifierCV

sample=[]
target=[]
with open('dataset.json','r',encoding='utf8') as file:
    train_data=json.load(file)
for intent in train_data['intents']:
    for value in intent['samples'] :
        clean_sample=preprocessing(value) #we preprocess the value and take it as raw text. the preprocessing() function will return a string for each value.
        sample.append(clean_sample) #now we encapsulate the strings into one list 'sample'.
        #tfidf later on input is a list directly made of strings not a list made of lists. One of the unnamed tasks i noticed is that i have to put in mind what each function takes as input and what's the type it returns
        target.append(intent['intent']) #the target needs to be inside the second loop(same number of entries to X and y) bc each X needs to be associated to its own label otherwise we'd have Null values in y

X_train,X_test,y_train,y_test=train_test_split(sample,target,train_size=0.8,random_state=42)
dict=vectorizing(X_train,X_test) #les données de training et test transformée en matrice
X_train_matrix=dict['key1']
X_test_matrix=dict['key2']

#modele régression logistique
#log_reg=LogisticRegression(max_iter=900)
#log_reg.fit(X_train_matrix,y_train) #y n'a pas besoin d'etre transformée , elle peut etre en string et après le modèle la transforme 
#y_pred=log_reg.predict(X_test_matrix)

#precision=precision_score(y_test,y_pred,average=None)
#print(f"Précision pour régression logistique: {precision}")
#accuracy=accuracy_score(y_test,y_pred)
#print(f"accuracy: {accuracy}")
#print(confusion_matrix(y_test,y_pred))

#modele Linear Support Vector Classifier
classifier = SVC(kernel="linear")
calibrated_classifier=CalibratedClassifierCV(classifier)
calibrated_classifier.fit(X_train_matrix, y_train)
y_pred=calibrated_classifier.predict(X_test_matrix)
precision=precision_score(y_test,y_pred,average=None)
print(f"Précision pour svm: {precision}")
accuracy=accuracy_score(y_test,y_pred)
print(f"accuracy: {accuracy}")
print(confusion_matrix(y_test,y_pred))
if(hasattr(calibrated_classifier, "predict_proba") == True):
    print('true')
else:
    print('false')

#modele multinomial naive bayes
#modele=MultinomialNB()
#modele.fit(X_train_matrix,y_train)
#y_pred=modele.predict(X_test_matrix)
#precision=precision_score(y_test,y_pred,average=None)
#print(f"Précision pour multinomial NB: {precision}")
#accuracy=accuracy_score(y_test,y_pred)
#print(f"accuracy: {accuracy}")
#print(confusion_matrix(y_test,y_pred))

#apres comparaison entre les 'confusion matrix' et les 'metrics' des trois modèles, je choisis le SVM . 

with open('model.pkl','wb') as f :
   pickle.dump(calibrated_classifier,f) #we pickle the model to not build a new one each time , we just unpickle it out of the disk! 