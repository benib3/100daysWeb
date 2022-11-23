const express = require("express");

const path = require("path");
const app = express();

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");
//setting template engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

//invalid inputs for routes
app.use(function (req, res) {
  res.status(404).render("404");
});

//error page for server side crash
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
console.log("Server is up...");
