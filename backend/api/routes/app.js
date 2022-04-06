const express = require("express");
const path = require("path");

const build_path = path.resolve(__dirname, "./../../build");

const router = express.Router();

router.use(express.static(build_path));

const allowed_routes = ["/", "/ccalc", "/spotify", "/spotify/*", "/instagram"];

router.get(allowed_routes, async (req, res) => {
  try {
    res.sendFile(path.join(build_path, "index.html"));
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
