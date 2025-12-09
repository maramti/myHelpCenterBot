#Here we are using TfidfVectorizer() from scikit learn to perform tf-idf and apply on our courpus using fit_transform.
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
def vectorizing(liste): 
    tfidf=TfidfVectorizer() #returns a python object 
    result=tfidf.fit(liste)
    f=open('vectorizer.pkl','wb')  
    pickle.dump(tfidf,f)#the object is getting pickled
    f.close()
    return tfidf


