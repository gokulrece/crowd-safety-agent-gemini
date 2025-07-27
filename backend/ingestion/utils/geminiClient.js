// ingestion/utils/geminiClient.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getGeminiInsightFromImage = async (base64Image) => {
  try {
    const prompt = "What's happening in this crowd scene? Highlight any safety risks or concerns.";

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg", // change if needed
        },
      },
      prompt, // ✅ This is the human-crafted prompt for Gemini
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Gemini Error:", error.message || error);
    throw error;
  }
};
