const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const hmtFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(hmtFilePath);
});

app.get("/restaurants", function (req, res) {
  const hmtFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(hmtFilePath);
});
app.get("/recommend", function (req, res) {
  const hmtFilePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(hmtFilePath);
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  console.info(JSON.parse(fileData));
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  const hmtFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(hmtFilePath);
});
app.get("/about", function (req, res) {
  const hmtFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(hmtFilePath);
});

app.listen(3000);
console.log("Server is up...");
