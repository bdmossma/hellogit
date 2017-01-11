
//------------------------------------------------------------------------------
// APIs 1 & 2 are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();

// The open source package "request" makes using
// other APIs simple.
var request = require("request");

//------------------------------------------------------------------------------
// Under the hood, API 2 uses another existing API that resides
// out in the cloud and combines it with its own ideas to
// to create a new API.
//------------------------------------------------------------------------------
// URL: http://localhost:8080/apis/api2
//------------------------------------------------------------------------------
router.get("/apis/api2", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting something from API 2...");

    //------------------------------------------------------------------------------
    // Let's trying using Google's YouTube API.
    // Please Note: We are intentionally using the error response part of the
    // API since it is not usage-limited.
    //------------------------------------------------------------------------------
    request("https://www.googleapis.com/youtube/v3/search", function (error, response, body) {
        if (!error && response.statusCode != 200) {
            json = JSON.parse(body);
            // combine Google API's json response with our own
            // creative ideas aand pass it along
            json.message = "Hello API Aggregation!!! :) :) :)";
            httpResponse.send(json);
        }
    });
});

module.exports = router
