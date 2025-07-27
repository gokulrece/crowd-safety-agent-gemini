// ingestion/utils/snapshotHelper.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");

exports.fetchSnapshotFromStream = async (streamUrl, counterId) => {
  try {
    const response = await axios.get(streamUrl, { responseType: "arraybuffer" });

    const filePath = path.join(__dirname, "..", "images", `${counterId}.png`);
    fs.writeFileSync(filePath, response.data);
    console.log(`📷 Snapshot saved for ${counterId}`);
    return filePath;
  } catch (error) {
    console.error(`❌ Failed to fetch snapshot from ${streamUrl}:`, error.message);
    return null;
  }
};
