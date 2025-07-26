const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your actual Gemini API key (use env file or config later)
const API_KEY = "AIzaSyAiUafvPHuHkFOMM_kT496N_k0brZxnCi8";
const genAI = new GoogleGenerativeAI(API_KEY);

async function callGeminiForRecommendation(alert) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are a public safety agent. Analyze the following alert and recommend safety actions.

Alert:
- Location: ${alert.location}
- Risk Level: ${alert.riskLevel}
- Timestamp: ${alert.timestamp}

Respond with a short summary and recommended safety action.
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
}

module.exports = {
  callGeminiForRecommendation,
};
