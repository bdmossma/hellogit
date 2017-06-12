
//------------------------------------------------------------------------------
// APIs for login, signup, and users are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();
var db = require("./db");

//------------------------------------------------------------------------------
// This API does user login.
//------------------------------------------------------------------------------
// API URL:
// https://[Base URL]/users
//------------------------------------------------------------------------------
router.get("/apis/users",
    function(httpRequest, httpResponse) {
        var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
        console.info("Client " + clientIp + " is trying to login...");

        var users = db.getUsers()
    	if(users) {
            var resultResp = { "message": "usersResp", "result": users };
            console.info(resultResp);
            return httpResponse.send(resultResp);
	    } else {
            var errorResp = { "message": "usersResp", "error": "Failed to get users." };
            console.error(errorResp);
            return httpResponse.send(errorResp);
        }
	}
);

module.exports = router
