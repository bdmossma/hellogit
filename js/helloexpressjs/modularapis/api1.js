var express = require("express")
var router = express.Router()

var jsonResponse = {"hello": "api1"};

// API 2: Respond with a JSON message
// URL: http://localhost:8080/apis/modular_api_1
router.get("/apis/api1", function(httpRequest, httpResponse) {
	var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	console.log("Client " + clientIp + " is getting a JSON message from modular api1...");
	httpResponse.send(jsonResponse);
});

module.exports = router
