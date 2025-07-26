// ingestion/utils/firebaseClient.js
const axios = require("axios");

const FIREBASE_FUNCTION_URL = "https://us-east1-crowdsafetyagent.cloudfunctions.net/generateAlert";

async function sendAlertToFirebase({ location, riskLevel, recommendation }) {
  try {
    const res = await axios.post(FIREBASE_FUNCTION_URL, {
      location,
      riskLevel,
      recommendation,
    });
    console.log(`✅ Alert Sent: ${res.data}`);
  } catch (err) {
    console.error("❌ Error sending alert:", err.message);
  }
}

module.exports = { sendAlertToFirebase };
