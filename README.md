myHelpCenterBot: NLP-Based Application [still developing, not finished yet..]

This project is an NLP-driven application built with Node.js and MongoDB. It processes user text (and optionally voice input), detects language, extracts keywords, identifies intents, and stores structured results for further analysis. The system integrates a knowledge base to manage raw and processed logs, supporting intelligent responses and insights for customer interactions.

Features : 

-Converts voice messages to text 

-Identifies user intent and extracts entities from text

-Stores processed logs, entities, and intents in MongoDB in structured form

-Builds a knowledge base of patterns, common issues, and suggested solutions

-Provides a REST API for submitting text, retrieving logs, and querying the knowledge base

-Supports multiple languages via NLP.js

Technologies Used

Node.js / Express.js – Backend server and API

MongoDB Atlas – Database for logs and knowledge base

NLP.js – Natural language processing, intent classification, and entity extraction

Voice-to-Text Libraries – For audio input processing

Workflow:

the customer submit their complaint or question to the bot and the bot processed the text and provide an answer. 

Database Storage – Processed logs, entities, and intents are stored in structured collections..

Knowledge Base – Patterns and solutions are stored and linked to processed logs for future reference.

API Access – REST endpoints provide access to NLP processing results and knowledge base queries.
