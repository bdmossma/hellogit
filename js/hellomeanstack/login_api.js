
//------------------------------------------------------------------------------
// APIs for login and signup are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;// native mongodb client
var mongoInfo = require("./mongodb_info");

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
        login(httpRequest.params.email, httpRequest.params.password, function(error, token) {
            if(error) {
                errorResp.error = error;
                return httpResponse.send(errorResp);
            } else {
                nominalResp.token = token;
                return httpResponse.send(nominalResp);
            }
        });
    } else {
        console.error("Client " + clientIp + " request is missing required parameters.");
    }
});

function login(email, password, callback) {
    mongoClient.connect(mongoInfo.url, function(error, db) {
        console.log("-----Connecting to MongoDB------------------------------------------------------------------");
        if(error) {
            callback("Server Error: Failed to connect to database!", null);
        } else {
            console.log("Connected to database.");
            var queryFilter = { "recordType": "User Account", "email": email };
            var queryResultSize = 1;
            db.collection(mongoInfo.collection).findOne(queryFilter, function(error, userAccount) {
                console.log("-----Querying MongoDB---------------------------------------------------------------------");
                if(error) {
                    var errorMsg = "Client Error: No user account exists for email: " + email;
                    console.error(errorMsg);
                    callback(errorMsg, null);
                }
                else {
                    if(!userAccount) {
                        var errorMsg = "Client Error: No user account exists for email: " + email;
                        console.error(errorMsg);
                        callback(errorMsg, null);
                    } else {
                        if( userAccount.password == password ) {
                            console.info("User Account password is: " + userAccount.password);
                            // TODO: The token is hard-coded since this is just a silly example
                            // and we aren't going to require the client to
                            // use it anyway.
                            var token = 1;
                            callback(null, token);
                        } else {
                            var errorMsg = "Client Error: Password is incorrect.";
                            console.error(errorMsg);
                            callback(errorMsg, null);
                        }
                    }
                }
            });
        }
    });
}

module.exports = router
