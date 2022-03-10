const archiver = require("archiver");
const fs = require("fs");

/**
 * FUNCTIONS __________________________________
 */
/**
 * Gets Saved Users Data
 * @param {string} username
 * @returns {object}
 */
function getUserData(username) {
  try {
    let data = fs.readFileSync(`data/${username}.txt`, "utf8");
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return null;
  }
}
exports.getUserData = getUserData;
function saveUserData(username, data) {
  fs.writeFileSync(`data/${username}.txt`, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error saving data: ", err);
      return;
    }
  });
}
exports.saveUserData = saveUserData;
/**
 * Create a zip file
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}
exports.zipDirectory = zipDirectory;
