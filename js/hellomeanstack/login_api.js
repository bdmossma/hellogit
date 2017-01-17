
//------------------------------------------------------------------------------
// APIs for login and signup are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();
var db = require("./db");

//------------------------------------------------------------------------------
// This API does user login.
//------------------------------------------------------------------------------
// URL: https://[PROJECT_ID][appspot.com]/apis/login
// where PROJECT_ID=astral-sorter-155816
// ==> https://astral-sorter-155816.appspot.com/apis/login
//------------------------------------------------------------------------------
router.get("/apis/login/:email/:password", function(httpRequest, httpResponse) {
    // Regarding Security: Yes, we are actually putting the password in the URL as
    // this is just a fun little HTTP (plaintext) example.  Of course, in production,
    // we would use Basic Authentication over HTTPS.
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.info("Client " + clientIp + " is trying to login...");

    var nominalResp = { message: "loginResp", token: "" };
    var errorResp = { message: "loginResp", error: "" };

    // login request MUST contain email and password
    if( "email" && "password" in httpRequest.params) {
        console.log("Client presented required parameters. Attempting login...");
        db.login(httpRequest.params.email, httpRequest.params.password, function(error, token) {
            if(error) {
                errorResp.error = error;
                httpResponse.send(errorResp);
            } else {
                nominalResp.token = token;
                httpResponse.send(nominalResp);
            }
        });
    } else {
        console.error("Client " + clientIp + " request is missing required parameters.");
    }
});

module.exports = router
