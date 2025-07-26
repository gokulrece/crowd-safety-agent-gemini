const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { callGeminiForRecommendation } = require("../services/geminiService");

// # admin.initializeApp();

exports.processAlert = functions.firestore
  .document("alerts/{alertId}")
  .onCreate(async (snap, context) => {
    const alertData = snap.data();

    try {
      const recommendation = await callGeminiForRecommendation(alertData);

      await admin.firestore().collection("recommendations").add({
        alertId: context.params.alertId,
        recommendation,
        generatedAt: new Date().toISOString(),
      });

      console.log("✅ Recommendation stored for alert:", context.params.alertId);
    } catch (error) {
      console.error("❌ Error processing alert:", error);
    }
  });
