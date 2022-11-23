const express = require("express");
const router = express.Router();
const resData = require("../util/restaurant-data");
const uUid = require("uuid");
router.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

router.get("/restaurants/:resId", function (req, res) {
  const restaurantId = req.params.resId;
  const storedRestaurants = resData.getStoredRestaurants();
  for (const restaurant of storedRestaurants) {
    if (restaurant.resId === restaurantId) {
      return res.render("restaurant-details", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.resId = uUid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
