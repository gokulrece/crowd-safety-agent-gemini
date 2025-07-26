const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// 1. Import the trigger function
const { processAlert } = require("./triggers/alertProcessor");

// 2. Export the Firestore trigger (runs automatically on alert creation)
exports.processAlert = functions
  .region("us-east1")
  .firestore
  .document("alerts/{alertId}")
  .onCreate(processAlert);

// 3. Existing HTTP-triggered function to create alerts manually
exports.generateAlert = functions
  .region("us-east1")
  .https
  .onRequest((req, res) => {
    const alert = {
      location: req.body.location || "Zone A",
      riskLevel: req.body.riskLevel || "High",
      timestamp: new Date().toISOString(),
    };

    admin.firestore().collection("alerts").add(alert)
      .then(docRef => res.status(200).send(`Alert created with ID: ${docRef.id}`))
      .catch(error => res.status(500).send("Error adding alert: " + error));
  });
