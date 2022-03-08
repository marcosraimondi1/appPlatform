/**
 * ------ REQUIRES -----
 */

const express_config = require("./express_config.js");

/**
 * ------- CONFIG -------
 */

// EXPRESS
const app = express_config();

module.exports =  app;
