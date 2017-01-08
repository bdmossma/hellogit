var express = require("express")
var router = express.Router()

var jsonResponse = {"hello": "api1"};

// API: Respond with a JSON message
// URL: http://localhost:8080/apis/api1
router.get("/apis/api1", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting a JSON message from modular api1...");
    httpResponse.send(jsonResponse);
});

module.exports = router
