require("dotenv").config();
console.log("✅ Using credentials from:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

const fs = require("fs");
const path = require("path");
const player = require("play-sound")();

const { sendAlertToFirebase } = require("./utils/firebaseClient");
const { getGeminiInsightFromImage } = require("./utils/geminiClient");
const { synthesizeAndSaveAudio } = require("./utils/textToSpeech");

const imageFolder = path.join(__dirname, "images");
const counterImages = fs.readdirSync(imageFolder).filter(file => file.endsWith(".png"));

async function analyzeAllCounters() {
  const results = [];

  for (const fileName of counterImages) {
    const counterId = fileName.replace(".png", "");
    const imagePath = path.join(imageFolder, fileName);
    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

    console.log(`🔍 Processing ${counterId}...`);
    const insight = await getGeminiInsightFromImage(base64Image);

    let riskLevel = "Low";
    if (/crowd(ed|ing|density|high|large)/i.test(insight)) riskLevel = "High";
    else if (/moderate|some people|medium/i.test(insight)) riskLevel = "Medium";

    results.push({ counterId, riskLevel, insight });
  }

  for (const counter of results) {
    const alternate = results.find(
      c => c.counterId !== counter.counterId && c.riskLevel === "Low"
    );

    const recommendation = counter.riskLevel === "High"
      ? `Area crowded. Suggest visiting ${alternate ? alternate.counterId : "another counter later"}.`
      : `Use the counter for easier access.`;

    const fullMessage = `${recommendation} Gemini Insight: ${counter.insight}`;

    // 1. Send alert to Firebase
    await sendAlertToFirebase({
      location: counter.counterId,
      riskLevel: counter.riskLevel,
      recommendation: fullMessage,
    });

    // 2. Generate audio
    const announcementText = `Attention: ${counter.counterId} is experiencing a ${counter.riskLevel} crowd. ${recommendation}`;
    const audioFileName = `${counter.counterId}.mp3`;

    await synthesizeAndSaveAudio(announcementText, audioFileName);

    // 3. Play audio immediately and repeat every 60 seconds
    const audioPath = path.join(__dirname, "audio", audioFileName);

    const playAudio = () => {
      player.play(audioPath, (err) => {
        if (err) console.error(`🔇 Could not play audio for ${counter.counterId}:`, err.message);
        else console.log(`🔊 Playing ${audioFileName}`);
      });
    };

    playAudio(); // play once
    setInterval(playAudio, 60000); // repeat every 60 seconds
  }
}

analyzeAllCounters().catch((err) => {
  console.error("❌ Error during analysis:", err);
});
