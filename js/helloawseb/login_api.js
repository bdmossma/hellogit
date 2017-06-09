
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
// This API does user login.
//------------------------------------------------------------------------------
// URL: https://[PROJECT_ID][appspot.com]/apis/login
// where PROJECT_ID=astral-sorter-155816
// ==> https://astral-sorter-155816.appspot.com/apis/login
//------------------------------------------------------------------------------
router.get("/apis/login/:email/:password",
    function(httpRequest, httpResponse) {
        // Regarding Security: Yes, we are actually putting the password in the URL as
        // this is just a fun little HTTP (plaintext) example.  Of course, in the real world,
        // we would use HTTPS and authenticate users securely.
        var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
        console.info("Client " + clientIp + " is trying to login...");

        connectToDatabase(httpRequest.params.email,
            httpRequest.params.password,
            function(result) {
                var resultResp = { "message": "loginResp", "result": result };
                console.info(resultResp);
                return httpResponse.send(resultResp);
            },
            function(error) {
                var errorResp = { "message": "loginResp", "error": error };
                console.error(errorResp);
                return httpResponse.send(errorResp);
            }
        );
    }
);

// STEP 1: Connect to Database
function connectToDatabase(email, password, onResult, onError) {
    mongoClient.connect(mongoInfo.url,
        function(error, db) {
            console.info("-----Connecting to Database------------------------------------------------------------------");
            if(error) {
                onError("Database offline.");
            } else {
                console.log("Connected to database.");
                queryUserAccount(db, email, password, onResult, onError);
            }
        }
    );
}

// STEP 2: Query User Account in Database
function queryUserAccount(db, email, password, onResult, onError) {
    var queryFilter = { "recordType": "User Account", "email": email };
    var queryResultSize = 1;
    db.collection(mongoInfo.collection).findOne(queryFilter,
        function(error, userAccount) {
            console.info("-----Querying Database---------------------------------------------------------------------");
            if(error) {
                onError("No user account exists for email: " + email);
            } else {
                if(!userAccount) {
                    onError("No user account exists for email: " + email);
                } else {
                    console.info("User account exists for email: " + email);
                    loginUser(userAccount, password, onResult, onError);
                }
            }
        }
    );
}

// STEP 3: Login User
function loginUser(userAccount, password, onResult, onError) {
    if( userAccount.password == password ) {
        console.info("Submitted password matches password in user account.");
        console.info("User logged in.");
        // TODO: We are not using login token as this is a silly example
        // and we aren't going to require the client to
        // use it anyway.
        onResult(true);
    } else {
        onError("Password is incorrect.");
    }
}

module.exports = router
