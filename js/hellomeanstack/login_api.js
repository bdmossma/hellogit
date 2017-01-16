
//------------------------------------------------------------------------------
// APIs for login and signup are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();
var db = require("db");

//------------------------------------------------------------------------------
// This API does user login.
//------------------------------------------------------------------------------
// URL: https://[PROJECT_ID][appspot.com]/apis/login
// where PROJECT_ID=astral-sorter-155816
// ==> https://astral-sorter-155816.appspot.com/apis/login
//------------------------------------------------------------------------------
router.get("/apis/login", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is trying to login...");

    if( "userId" && "bookId" in httpRequest.params) {
        console.log("These URL params could be used to query data from a database for example.");
        console.log("userId: " + httpRequest.params.userId);
        console.log("bookId: " + httpRequest.params.bookId);
    }

    var jsonResponse = {"hello": "api1"};
    httpResponse.send(jsonResponse);
});

module.exports = router
