
// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// Let's create a goodbye API for this web application
// Usage:
//   GET http://localhost:8080/apis/private/goodbye
//       with 'x-access-token' set to JWT token received when authenticating
//       at http://localhost:8080/apis/public/apigw
router.get('/apis/private/goodbye', function(request, response) {
	response.send('Goodbye!');
});

module.exports = router