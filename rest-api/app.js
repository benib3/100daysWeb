const express = require("express");
const quotesRouters = require("./routes/quotes");
const db = require("./data/db");

const app = express();

app.use("/quotes", quotesRouters);

app.use(function (error, req, res, next) {
  res.json(500).json({
    message: "Something wrong",
  });
});
db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("connecting to the db failed");
  });
