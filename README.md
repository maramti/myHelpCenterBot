myHelpCenterBot: NLP-Based Application [still developing, not finished yet..]

This project is an NLP-driven application built with Node.js,NLP(python),FastAPI and MongoDB. It processes user text (and optionally voice input), extracts keywords, identifies intents, and stores structured results as processed log in a database. The system function is to understand customer's question or problem and classify its context then provide an answer. 

=> Pipeline :

1 User Input – The user submits a text.

2 Preprocessing 

3 Vectorization 

5 Intent Classification 

6 Provide answer

=> Current Features

Text preprocessing (cleaning, normalization, tokenization)

TF-IDF vectorization of text data

Training and saving of an intent classification model 

Evaluation of model performance (precision, confusion matrix, accuracy)

API endpoint for predicting the intent of new text

=> Planned Features

Integration of a knowledge base

REST API for model predictions and knowledge base queries

Optional voice-to-text input for audio queries

Simple user interface (web or mobile) for submitting queries and receiving responses

Support for multiple languages

Technologies Used

Python 3.10+ – Core programming language

scikit-learn – TF-IDF, Logistic Regression, SVM, Naive Bayes

pickle – Saving and loading trained models and vectorizers

FastAPI – REST API for real-time predictions

MongoDB / JSON – Storage of text data, processed logs, and future knowledge base

Node.js
