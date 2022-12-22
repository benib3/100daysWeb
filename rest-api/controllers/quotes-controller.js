const Quote = require("../models/quotes-model");

async function getRandomQuote(req, res, next) {
  const randomQuote = await Quote.getRandomQuote();
  console.log(randomQuote);
  res.json({
    quote: randomQuote,
  });
}

module.exports = { getRandomQuote: getRandomQuote };
