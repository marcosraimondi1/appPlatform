const express = require("express");
const { scrapFollows } = require("../helper/Instagram/scrapFollows.js");

const router = express.Router();

router.get("/instagram", async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) return res.status(404).json({ error: "not found" });

    const toSend = await scrapFollows(username);

    return res.json(toSend);
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    const toSend = {
      status: "error",
      error: error
    };

    res.status(500).json(toSend);
  }
});

module.exports = router;
