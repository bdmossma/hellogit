
// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// API Access Control:
// Here we configure the ExpressJS app to use an API access controller for
// verifying JWT tokens.
var api_access_controller = require('./../api_access_controller')
router.use(api_access_controller);

// Let's create a goodbye API for this web application
// Usage:
// GET http://localhost:8080/apis/private/goodbye
// with 'x-access-token' set to JWT token received when authenticating
// at http://localhost:8080/apis/public/apigw
router.get('/apis/private/goodbye', function(request, response) {
	response.send('Goodbye!');
});

module.exports = router