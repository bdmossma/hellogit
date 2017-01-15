
//------------------------------------------------------------------------------
// This API is a modular API residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host it.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();

// The open source package "request" makes using
// other APIs simple.
var request = require("request");

//------------------------------------------------------------------------------
// Under the hood, this API uses other existing APIs that reside
// out in the cloud and combines them with its own ideas to
// to create a new API.
//------------------------------------------------------------------------------
// URL: http://localhost:8080/apis/aggregate_api
//------------------------------------------------------------------------------
router.get("/apis/aggregate_api", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting JSON message from aggregate_api...");

    // Initialize the aggregate API response to empty
    var aggregateApiJson = {};

    //------------------------------------------------------------------------------
    // (STEP 1) This is the local API response: Let's add our own
    // spin to the aggregate API response.
    //------------------------------------------------------------------------------
    aggregateApiJson.localApiJson = { "Hello": "API Aggregation"};

    //------------------------------------------------------------------------------
    // (STEP 2) For remote API 1, let's trying using the free
    // Star Wars API at https://swapi.co
    //------------------------------------------------------------------------------
    request("http://www.swapi.co/api/people/1/", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.info("Accessed Remote API 1.");
            // add the json from remote api 1 to
            // the aggregate api
            aggregateApiJson.remoteApi1Json = JSON.parse(body);

            // Now that the aggregate response is built,
            // send it back to the client.
            httpResponse.send(aggregateApiJson);
        } else {
            console.error("Failed to access Remote API 1.");
        }
    });

});

module.exports = router
