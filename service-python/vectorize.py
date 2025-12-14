#Here we are using TfidfVectorizer() from scikit learn to perform tf-idf and apply on our courpus using fit_transform.
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
def vectorizing(liste_train,liste_test): 
    tfidf=TfidfVectorizer() #returns a python object 
    result_train=tfidf.fit_transform(liste_train) #tf-idf input is a list of strings
    result_test=tfidf.transform(liste_test) #X_test doit etre "vecteurisé" aussi avec le meme tfidf pour qu'on ne crée pas un nouveau vocabulaire c'est pour cela on fait que transform et pas fit_transform
    f=open('vectorizer.pkl','wb')  
    pickle.dump(tfidf,f)#the object is getting pickled
    f.close()
    dict={'key1':result_train,'key2':result_test}
    return dict


