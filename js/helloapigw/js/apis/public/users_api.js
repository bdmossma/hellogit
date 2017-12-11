
// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// import our mongoose "user" model which is just an object oriented representation
// of a user in our mongodb database
var User   = require('./../../models/user');


// Let's make an API for querying all of the users
// currently in our database.
// HTTP Method & URL: GET http://localhost:8080/apis/public/users
router.get('/apis/public/users', function(request, response) {
	// use a wide open filter, get ALL the users
	User.find({}, function(error, users) {
		response.json(users);
	});
});


module.exports = router