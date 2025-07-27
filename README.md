# Autonomous Crowd Safety Agent

This project uses Gemini and Firebase to monitor and manage safety at large public events.

**Introduction**

Our project is AI-driven system designed to improve safety at large public events by analyzing real time CCTV feeds. Using Google Gemini API, it detects crowd density from images/video snapshots, generates intelligent safety recommendations (like “Evacuate Zone A”), and pushes alerts to a live Firebase-powered dashboard. The system includes mobile-responsive UI, Firestore integration and automated alert generation for proactive crowd management.

**Problem Addressed**

Each year, overcrowding at concerts, religious events and rallies leads to stampedes, injuries, and fatalities.
Lack of real-time crowd intelligence → delayed responses, chaos.
Existing systems are manual, siloed, and reactive.
A smarter, proactive approach is urgently needed.

**Proposed Solution : Autonomous Crowd Safety Agent Powered by Agentic AI**

Multimodal AI agent that monitors CCTV, audio, IoT, and social media feeds in real-time.
Detects anomalies: stampedes, aggression, panic sounds, overcrowding.
Instantly alerts authorities and suggests dynamic evacuation routes.
Provides live updates to attendees via WhatsApp chatbot and dashboard.

**Technology Stack**

<img width="600" height="250" alt="image" src="https://github.com/user-attachments/assets/91a1e70d-5883-4205-96c5-6b45fbfbbb5b" />


**HLD Architecture**

<img width="600" height="250" alt="image" src="https://github.com/user-attachments/assets/6f6ecfc7-11aa-4803-a240-bc42ab02da18" />

**Implementation Procedure**

Maintain the project folder structure as you cloned the project.

Have the Gemini prompt in utils/geminiClient.js.

Open Command Prompt in the directory: C:\<your project path>\ingestion

Then run: node processImage.js

You can verify the web app–based dashboard with the provided URL. 
https://crowdsafetyagent.web.app/
  
<img width="600" height="320" alt="image" src="https://github.com/user-attachments/assets/b3acce98-38ed-42f2-83c8-4d492a49f219" />

Notifications are also sent through the public announcement speaker.

<img width="600" height="270" alt="image" src="https://github.com/user-attachments/assets/b41ebc40-4946-4438-92a5-a51a33a836c5" />






