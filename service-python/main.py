import uvicorn
import asyncio
from fastapi import FastAPI 
import pickle
from processor import preprocessing
from extract_entity import extract_entity
from datetime import datetime,timezone
app=FastAPI()

model=pickle.load(open('model.pkl','rb'))
vectorizer=pickle.load(open('vectorizer.pkl','rb')) #we unpickle our vectorizer and model that we trained in train.py
    
@app.post('/api/request')
def callformodel(input:dict):
    user_input=input.get("text")
    entities=extract_entity(user_input)
    clean_input=preprocessing(user_input)
    vector=vectorizer.transform([clean_input]) #on ne doit pas oublier que transform prend une liste 
    stats=model.predict_proba(vector)
    intent=model.classes_[stats.argmax()] #probas is an array that contains the probability scores for all classes 
    #argmax finds the position of the highest score 
    confidence = float(stats.max())
    processed_log = {
        "utterance": user_input,
        "intent": intent,
        "confidence": confidence,
        "entities": entities, 
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

    return processed_log
