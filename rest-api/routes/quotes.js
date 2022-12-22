const express = require("express");
const controller = require("../controllers/quotes-controller");
const router = express.Router();

router.get("/", controller.getRandomQuote);

module.exports = router;
