/**
 * Created by pratiksanglikar on 01/04/16.
 */
var oauthSignature = require("oauth-signature");
var nonce = require("nonce")();
var request = require("request");
var queryString = require("querystring");
var _ = require("lodash");
var q = require("q");
var reviews = require("./sample-data");

const CONSUMER_KEY = "njQqjtgnBWWz2_cHfMQOwQ";
const OAUTH_TOKEN = "3oLFAlK7VPvyo-b4L-KfcjqLW9EtSzkA";
const CONSUMER_SECRET = "G0QPi27Yy4_IdKc0XNoINj0txs8";
const TOKEN_SECRET = "1ouzw3semVY9LJHdJWwIiXoqQuE";

/**
 * searches the restaurant matching searchTerm within given location
 * @param searchTerm
 * @param location
 * @returns {u.promise|promise|*}
 */
exports.searchRestaurant = function (searchTerm, location) {
	var deferred = q.defer();
	var httpMethod = "GET";
	var url = "http://api.yelp.com/v2/search";
	if (!searchTerm) {
		searchTerm = "restaurants"
	}
	if (!location) {
		location = "San+Jose";
	}
	var default_parameters = {
		term: searchTerm,
		limit: "10",
		location: location
	};
	var required_parameters = _getOAuthParams();
	var parameters = _.assign(default_parameters, required_parameters);
	var signature = oauthSignature.generate(httpMethod, url, parameters, CONSUMER_SECRET, TOKEN_SECRET, {encodeSignature: false});
	parameters.oauth_signature = signature;
	var paramURL = queryString.stringify(parameters);
	var apiURL = url + "?" + paramURL;
	request(apiURL, function (error, response, body) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(body);
		}
	});
	return deferred.promise;
};

/**
 * returns the JSON of the restaurants information including reviews about the restaurant.
 * @param restaurantName
 * @returns {u.promise|promise|*}
 */
exports.getRestaurantInfo = function (restaurantName) {
	var deferred = q.defer();
	var httpMethod = "GET";
	var url = "http://api.yelp.com/v2/business/";
	if (!restaurantName) {
		deferred.reject("Restaurant Name is required");
		return deferred.promise;
	}
	restaurantName = restaurantName.replace(" ", "-")
	url += restaurantName;
	var required_parameters = _getOAuthParams();
	var signature = oauthSignature.generate(httpMethod, url, required_parameters, CONSUMER_SECRET, TOKEN_SECRET, {encodeSignature: false});
	required_parameters.oauth_signature = signature;
	var paramURL = queryString.stringify(required_parameters);
	var apiURL = url + "?" + paramURL;
	request(apiURL, function (error, response, body) {
		if (error) {
			deferred.reject(error);
		} else {
			body = _addReviews(body);
			deferred.resolve(body);
		}
	});
	return deferred.promise;
};

/**
 * returns the OAuth authentication parameter required for Yelp API access.
 * @returns {{oauth_consumer_key: string, oauth_token: string, oauth_nonce: *, oauth_timestamp: string, oauth_signature_method: string, oauth_version: string}}
 * @private
 */
_getOAuthParams = function () {
	return {
		oauth_consumer_key: CONSUMER_KEY,
		oauth_token: OAUTH_TOKEN,
		oauth_nonce: nonce(),
		oauth_timestamp: nonce().toString().substr(0, 10),
		oauth_signature_method: "HMAC-SHA1",
		oauth_version: "1.0"
	};
}

/**
 * adds random reviews to searched restaurants.
 * @param body
 * @returns {body}
 * @private
 */
_addReviews = function (body) {
	body = JSON.parse(body);
	body.reviews = [];
	for (var i = 0; i < 10; i++) {
		var index = Math.floor(Math.random() * 51);
		var review = reviews.data[index];
		body.reviews.push({
			"excerpt": review
		});
	}
	return body;
}