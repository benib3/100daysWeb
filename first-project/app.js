const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const ejs = require("ejs");
const uUid = require("uuid");

//setting template engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);

  const storedRestaurants = JSON.parse(fileData);
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/restaurants/:resId", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const restaurantId = req.params.resId;
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
    if (restaurant.resId === restaurantId) {
      return res.render("restaurant-details", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.resId = uUid.v4();
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);

  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});
app.get("/about", function (req, res) {
  res.render("about");
});

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
