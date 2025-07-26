// ingestion/processImage.js
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { getGeminiInsightFromImage } = require("./utils/geminiClient");
const axios = require("axios");

// 🔗 Your deployed Cloud Function endpoint
const GENERATE_ALERT_URL = "https://us-east1-crowdsafetyagent.cloudfunctions.net/generateAlert";

// 🖼️ Convert image to base64
function imageToBase64(filePath) {
  const bitmap = fs.readFileSync(filePath);
  return Buffer.from(bitmap).toString("base64");
}

async function analyzeAndSend(imagePath, location = "CCTV Area") {
  try {
    const base64 = imageToBase64(imagePath);
    const recommendation = await getGeminiInsightFromImage(base64);

    const alert = {
      location,
      riskLevel: "High", // or let Gemini suggest this in future
      recommendation,
    };

    const response = await axios.post(GENERATE_ALERT_URL, alert);
    console.log("✅ Alert Sent:", response.data);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// 🔁 Run the analysis for a sample image
const testImagePath = path.join(__dirname, "sample_crowd.png"); // <-- change this
analyzeAndSend(testImagePath);
