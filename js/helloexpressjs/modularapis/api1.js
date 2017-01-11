
//------------------------------------------------------------------------------
// APIs 1 & 2 are modular APIs residing in the same tier (deployed to
// same machine in the network) with localapp.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();

//------------------------------------------------------------------------------
// API 1 is our own API which simply responds with a JSON message.
// Unlike API 2, it does not use any other APIs that reside
// out in the cloud.
//------------------------------------------------------------------------------
// URL: http://localhost:8080/apis/api1
//------------------------------------------------------------------------------
router.get("/apis/api1", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting a JSON message from API 1...");

    var jsonResponse = {"hello": "api1"};
    httpResponse.send(jsonResponse);
});

module.exports = router
