const express = require("express");
const path = require("path");

const file_path = path.resolve(__dirname, "./instructivo.pdf");

const router = express.Router();

router.get("/ccalc/information", async (req, res) => {
  try {
    res.download(file_path, (err) => {
      if (err) {
        console.log("failed to download file: ", file_path, "\nError: ", err);
        if (err.statusCode === 404) {
          return res.status(404).json({ error: "No such file or directory" });
        }
        return res.status(500).json({ error: err.message });
      }
    });
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    const toSend = {
      status: "error",
      error: error,
    };
    res.status(500).json(toSend);
  }
});

module.exports = router;
