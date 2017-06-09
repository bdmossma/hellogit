
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
// URL: https://[PROJECT_ID][appspot.com]/apis/users
// where PROJECT_ID=astral-sorter-155816
// ==> https://astral-sorter-155816.appspot.com/apis/users
//------------------------------------------------------------------------------
router.get("/apis/users",
    function(httpRequest, httpResponse) {
        var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
        console.info("Client " + clientIp + " is trying to login...");

        connectToDatabase(
            function(result) {
                var resultResp = { "message": "usersResp", "result": result };
                console.info(resultResp);
                return httpResponse.send(resultResp);
            },
            function(error) {
                var errorResp = { "message": "usersResp", "error": error };
                console.error(errorResp);
                return httpResponse.send(errorResp);
            }
        );
    }
);

// STEP 1: Connect to Database
function connectToDatabase(onResult, onError) {
    mongoClient.connect(mongoInfo.url,
        function(error, db) {
            console.info("-----Connecting to Database------------------------------------------------------------------");
            if(error) {
                onError("Database offline.");
            } else {
                console.log("Connected to database.");
                queryUsers(db, onResult, onError);
            }
        }
    );
}

// STEP 2: Query All Users in Database
function queryUsers(db, onResult, onError) {
    var queryFilter = { "recordType": "User Account" };
    db.collection(mongoInfo.collection).find(queryFilter).toArray(
        function(error, users) {
            console.info("-----Querying Database---------------------------------------------------------------------");
            if(error) {
                onError("Failed to query Users in the database.");
            } else {
                if(!users) {
                    onError("No users exist.");
                } else {
                    onResult(users);
                }
            }
        }
    );
}

module.exports = router
