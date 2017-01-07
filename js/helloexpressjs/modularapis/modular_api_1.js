var express = require("express")
var router = express.Router()

var jsonResponse = {"modular": "api_1"};

// API 2: Respond with a JSON message
// URL: http://localhost:8080/apis/modular_api_1
router.get("/apis/modular_api_1", function(httpRequest, httpResponse) {
	var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	console.log("Client " + clientIp + " is getting a JSON message from modular_api_1...");
	httpResponse.send(JSON.stringify(jsonResponse));
});

module.exports = router
