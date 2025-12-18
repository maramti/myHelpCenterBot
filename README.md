# NLP-Based Customer Help Center Chatbot

This project is a **NLP-based chatbot** designed to handle customer queries about an online clothing order. It integrates a machine learning model for intent classification, extracts relevant entities, and provides rule-based answer. The system architecture includes a **frontend** built in React, a **backend Node.js server**, and a **Python service with FastAPI** for NLP processing. **MongoDB** is used to store processed logs.

Frontend (React) <-> Node.js Backend <-> Python NLP Service (FastAPI)
                            ||
                          mongodb
## Technologies Used

- **Frontend:** React.js for building the user interface
- **Backend:** Node.js is the bridge connecting the frontend and the Python NLP service. It handles http requests from the user, communicates with the NLP backend, stores logs in MongoDB, and returns the processed response to the user
- **NLP Service:** Python with FastAPI exposing a trained machine learning model.
- **Database:** MongoDB to store processed logs including user utterances, detected intents, entities, confidence, and timestamps.
- **Machine Learning:** Support Vector Machine (SVM) classifier with confidence score
- **Others:** Axios for HTTP requests from the frontend to the backend and from backend to python service, CORS enabled for cross-origin requests.

---

## Features

1. **Intent Classification:**  
   - Uses a trained SVM model to predict user intent based on the text input.
   - Predicts confidence for the classification.

2. **Entity Extraction:**  
   - Extracts entities such as regex / list based ones:
     - `order_number`
     - `date`
     - `price`
     - `size`
     - `location` (`house`, `home`)
     - `country` (`Tunisia`, `France`, `USA`)

3. **Conversation Logging:**  
   - All processed queries are logged in MongoDB with details including:
     - `utterance`
     - `intent`
     - `confidence`
     - `entities`
     - `timestamp`

4. **Interactive Frontend:**  
   - Users can type questions and receive answers.
   - Responses include detected intent, entities, and confidence score.
   - Simple chat interface with a chatbot image floating.

5. **Machine Learning Pipeline:**  
   - **Preprocessing:**
   - **Vectorization:** 
   - **Training:** 
   - **Persistence:** (pickle python module)

---

## How It Works ? :

1. **User Interaction:**  
   - User types a message in the React frontend.
   - Frontend sends a POST via axios request to `Node.js` backend at `/api/request`.

2. **Backend Processing:**  
   - Node.js server receives the request.
   - Sends the user input to the Python NLP service via Axios.
   - Receives predicted intent, entities, confidence, and timestamp.

3. **Logging:**  
   - Backend logs the processed query into MongoDB database named mynlpDB , collection : processedlogs (repeated utterances are not logged=>basic error handling)

4. **Response:**  
   - Backend returns the processed log to the frontend.

5. **NLP Service (Python/FastAPI):**  
   - Preprocesses the text.
   - Extracts entities using `extract_entity.py`.
   - Converts text to feature vector using the pickled vectorizer.
   - Predicts intent and confidence using the trained SVM model.

---

**Proposed Enhancements:**
-Contextual understanding
-able to handle conversation 
-have a real database of products 