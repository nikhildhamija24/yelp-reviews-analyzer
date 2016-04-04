var express = require('express');
var router = express.Router();
var YelpHandler = require("../serverscripts/YelpHandler");

/**
 * finds the restaurants with name starting with given searchTerm.
 * POST parameter required - searchTerm.
 * returns the JSON of all the restaurants found matching given name.
 */
router.post("/restaurants", function (req, res, next) {
	var searchTerm = req.body.searchTerm,
		location = req.body.location,
		promise = YelpHandler.searchRestaurant(searchTerm, location);
	promise.done(function (body) {
		res.send(body);
	}, function (error) {
		res.send(500, error);
	});
});


/**
 * finds the reviews of the restaurant specified by given restaurant ID.
 * POST parameter required - restaurantId
 * returns the JSON of reviews of the restaurant
 */
router.post("/restaurantinfo", function (req, res, next) {
	var restaurantID = req.body.restaurantId;
	var promise = YelpHandler.getRestaurantInfo(restaurantID);
	promise.done(function (body) {
		res.send(body);
	}, function (error) {
		res.send(500, error);
	});
});

module.exports = router;
