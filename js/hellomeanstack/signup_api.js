
//------------------------------------------------------------------------------
// APIs for login and signup are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();
var db = require("db");

//------------------------------------------------------------------------------
// This API does user signup.
//------------------------------------------------------------------------------
// URL: https://[PROJECT_ID][appspot.com]/apis/signunp
// where PROJECT_ID=astral-sorter-155816
// ==> https://astral-sorter-155816.appspot.com/apis/signup
//------------------------------------------------------------------------------
router.get("/apis/signup/:firstName/:lastName/:phone/:email/:password", function(httpRequest, httpResponse) {
    // Regarding Security: Yes, we are actually putting the password in the URL as
    // this is just a fun little HTTP (plaintext) example.  Of course, in production,
    // we would use Basic Authentication over HTTPS.
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is trying to sign up...");

    var jsonResponse = {"hello": "api2"};

    if( "firstName" && "lastName" && "phone" && "email" && "password" in httpRequest.params) {
        console.log("Performing signup...");
        db.signup(httpRequest.params.firstName,
                    httpRequest.params.lastName,
                    httpRequest.params.phone,
                    httpRequest.params.email,
                    httpRequest.params.password,
                    function(error, status) {
                        httpResponse.send(jsonResponse);
                    });
    }

});

module.exports = router
