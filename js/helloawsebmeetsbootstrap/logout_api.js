
//------------------------------------------------------------------------------
// APIs for login, signup, and users are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();
var db = require("./db");

//------------------------------------------------------------------------------
// This API does user log out.
//------------------------------------------------------------------------------
// API URL:
// https://[Base URL]/apis/logout/:email/:password
//------------------------------------------------------------------------------
router.get("/apis/logout/:email/:password",
    function(httpRequest, httpResponse) {
        // Regarding Security: Yes, we are actually putting the password in the URL as
        // this is just a fun little HTTP (plaintext) example.  Of course, in the real world,
        // we would use HTTPS and authenticate users securely.
        var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
        console.info("Client " + clientIp + " is trying to log out...");

        var [result, resultMsg] = db.logOutUser(httpRequest.params.email, httpRequest.params.password);
		return httpResponse.send({ "message": "logOutResp","result": result, "resultMsg": resultMsg });
    }
);

module.exports = router
