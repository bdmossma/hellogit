
//------------------------------------------------------------------------------
// APIs for login, signup, and users are modular APIs residing in the same tier (deployed to
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
    console.info("Client " + clientIp + " is trying to sign up...");

    connectToDatabase(httpRequest.params.firstName,
        httpRequest.params.lastName,
        httpRequest.params.phone,
        httpRequest.params.email,
        httpRequest.params.password,
        function(result) {
            var resultResp = { "message": "signUpResp", "result": result };
            console.info(resultResp);
            return httpResponse.send(resultResp);
        },
        function(error) {
            var errorResp = { "message": "signUpResp", "error": error };
            console.error(errorResp);
            return httpResponse.send(errorResp);
        }
    );
});

// STEP 1: Connect to Database
function connectToDatabase(firstName, lastName, phone, email, password, onResult, onError) {
    mongoClient.connect(mongoInfo.url,
        function(error, db) {
            console.info("-----Connecting to Database------------------------------------------------------------------");
            if(error) {
                onError("Database offline.");
            } else {
                console.info("Connected to database.");
                queryUserAccount(db, firstName, lastName, phone, email, password, onResult, onError);
            }
        }
    );
}

// STEP 2: Query User Account in Database
function queryUserAccount(db, firstName, lastName, phone, email, password, onResult, onError) {
    var queryFilter = { "recordType": "User Account", "email": email };
    var queryResultSize = 1;
    db.collection(mongoInfo.collection).findOne(queryFilter,
        function(error, userAccount) {
            console.info("-----Querying if User Account already exists in Database----------------------------------------------------------");
            if(error) {
                onError("Failed to query database.");
            } else {
                if(!userAccount) { // if user account does not already exist, create it
                    createUserAccount(db, firstName, lastName, phone, email, password, onResult, onError);
                } else {
                    onError("A user account already exists for email: " + email);
                }
            }
        }
    );
}

// STEP 3: Create User Account
function createUserAccount(db, firstName, lastName, phone, email, password, onResult, onError) {
    var newUserAccount = { "recordType": "User Account", "firstName": firstName, "lastName": lastName, "phone": phone, "email": email, "password": password };
    db.collection(mongoInfo.collection).insertOne(newUserAccount,
        function(error, result) {
            console.info("-----Creating User Account in Database-------------------------------------------------------------------");
            if(error) {
                onError("Failed to create new user account.");
            } else {
                onResult(true);
            }
        }
    );
}

module.exports = router
