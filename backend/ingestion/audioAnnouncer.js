// ingestion/audioAnnouncer.js
const path = require("path");
const fs = require("fs");
const player = require("play-sound")();

const audioDir = path.join(__dirname, "audio");

function playAudio(filePath) {
  return new Promise((resolve, reject) => {
    player.play(filePath, function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function loopAudio() {
  const audioFiles = fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3"));

  if (audioFiles.length === 0) {
    console.log("🚫 No MP3 files found in audio directory.");
    return;
  }

  console.log("🔁 Starting 60-second announcement loop...");

  while (true) {
    for (const file of audioFiles) {
      const fullPath = path.join(audioDir, file);
      console.log(`🔊 Playing: ${file}`);
      await playAudio(fullPath);
    }

    console.log("⏳ Waiting 60 seconds...");
    await new Promise(resolve => setTimeout(resolve, 60 * 1000)); // wait 60 seconds
  }
}

loopAudio().catch(err => console.error("❌ Error in audio loop:", err));
