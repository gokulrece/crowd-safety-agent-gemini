// utils/textToSpeech.js
const fs = require("fs");
const path = require("path");
const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient();

async function synthesizeAndSaveAudio(text, filename) {
  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  const audioDir = path.join(__dirname, "../audio");
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir);

  const filePath = path.join(audioDir, filename);
  fs.writeFileSync(filePath, response.audioContent, "binary");
  console.log(`🔊 Announcement saved: ${filePath}`);
}

module.exports = { synthesizeAndSaveAudio };
