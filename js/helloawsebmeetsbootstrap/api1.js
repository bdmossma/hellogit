
//------------------------------------------------------------------------------
// Modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();

//------------------------------------------------------------------------------
// This API serves up the website root (index page)
//------------------------------------------------------------------------------
// API URL: https://[Base URL]/home
//------------------------------------------------------------------------------
router.get("/home",
    function(httpRequest, httpResponse) {
		var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	    console.log("Client " + clientIp + " is getting a simple HTML webpage...");
	    httpResponse.sendFile(__dirname + "/www/index.html");
    }
);

module.exports = router
