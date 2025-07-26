// ingestion/utils/geminiClient.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Using supported model for image processing
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getGeminiInsightFromImage = async (base64Image) => {
  try {
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/png", // or change to image/jpeg if needed
        },
      },
      "What's happening in this crowd scene? Highlight any safety risks or concerns.",
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Gemini Error:", error.message || error);
    throw error;
  }
};
