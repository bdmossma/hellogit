
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
// https://[Base URL]/apis/users
//------------------------------------------------------------------------------
router.get("/apis/users",
    function(httpRequest, httpResponse) {
        var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
        console.info("Client " + clientIp + " is trying to list users...");

        var [result, resultMsg] = db.getUsers();
            var resultResp = { "message": "usersResp", "result": result, "resultMsg" : resultMsg };
            console.info(resultResp);
            return httpResponse.send(resultResp);
	}
);

module.exports = router
