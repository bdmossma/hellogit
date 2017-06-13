
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
// https://[Base URL]/apis/deleteuser/:email/:password
//------------------------------------------------------------------------------
router.get("/apis/deleteuser/:email/:password",
    function(httpRequest, httpResponse) {
        var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
        console.info("Client " + clientIp + " is trying to delete a user...");

		var [result, resultMsg] = db.deleteUser(httpRequest.params.email, httpRequest.params.password);
		return httpResponse.send({ "message": "deleteUserResp","result": result, "resultMsg": resultMsg });
	}
);

module.exports = router
