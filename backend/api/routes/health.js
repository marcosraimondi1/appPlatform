require("dotenv").config();
const express = require("express");
const { version } = require("../../package.json");
const router = express.Router();

router.get("/health", async (req, res) => {
  const health = `Application running on ${process.env.NODE_ENV}\nCurrently on version ${version}`;
  res.send(health);
});

module.exports = router;
