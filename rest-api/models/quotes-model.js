const db = require("../data/db");
class Quote {
  static async getRandomQuote() {
    const quotes = await db.getDb().collection("quotes").find().toArray();

    const randomIndexQuote = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndexQuote];
    return randomQuote.quote;
  }
}
module.exports = Quote;
