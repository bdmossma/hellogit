
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

    var nominalResp = { "message": "signupResp", "result": "" };
    var errorResp = { "message": "signupResp", "error": "" };

    if( "firstName" && "lastName" && "phone" && "email" && "password" in httpRequest.params) {
        console.log("Client presented required parameters. Attempting signup...");
        signup(httpRequest.params.firstName,
                httpRequest.params.lastName,
                httpRequest.params.phone,
                httpRequest.params.email,
                httpRequest.params.password, function(error, result) {
                    if(error) {
                        errorResp.error = error;
                        httpResponse.send(errorResp);
                    } else {
                        nominalResp.result = result;
                        httpResponse.send(nominalResp);
                    }
                });
    }

});

function signup(firstName, lastName, phone, email, password, callback) {
    mongoClient.connect(mongoInfo.url, function(error, db) {
        console.log("-----Connecting to MongoDB------------------------------------------------------------------");
        if(error) {
            return callback("Server Error: Failed to connect to database!", null);
        } else {
            console.log("Connected to database.");
            var queryFilter = { "recordType": "User Account", "email": email };
            var queryResultSize = 1;
            db.collection(mongoInfo.collection).findOne(queryFilter, function(error, userAccount) {
                console.log("-----Querying MongoDB---------------------------------------------------------------------");
                if(error) {
                    var errorMsg = "Server Error: Failed to query database."
                    console.error(errorMsg);
                    return callback(errorMsg, null);
                } else {
                    if(!userAccount) {
                        // create user account
                        var newUserAccount = { "recordType": "User Account", "firstName": firstName, "lastName": lastName, "phone": phone, "email": email, "password": password };
                        db.collection(mongoInfo.collection).insertOne(newUserAccount, function(error, result) {
                            console.log("-----Creating Record in Database-------------------------------------------------------------------");
                            if(error) {
                                var errorMsg = "Server Error: Failed to create new user account.";
                                console.error(errorMsg);
                                return callback(errorMsg, null);
                            } else {
                                var resultMsg = "You are now signed up.";
                                console.info(resultMsg);
                                return callback(null, resultMsg);
                            }
                        });
                    } else {
                        return callback("Client Error: A user account already exists for email: " + email, null);
                    }
                }
            });
        }
    });
}

module.exports = router
