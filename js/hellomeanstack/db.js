
//------------------------------------------------------------------------------
// This module provides a library for doing CRUD operations
// on a mongodb database.
//------------------------------------------------------------------------------
var mongoClient = require("mongodb").MongoClient;// native mongodb client

// database collection for this example
var myCollection = "ExampleCollection";

// MongoDB URL & Credentials
var mongoUsername = "mongodbclouduser";
var mongoPassword = "revelinginthe$un";
var mongoUrl = "mongodb://" + mongoUsername + ":" + mongoPassword +
    "@cluster0-shard-00-00-r75mr.mongodb.net:27017,cluster0-shard-00-01-r75mr.mongodb.net:27017,cluster0-shard-00-02-r75mr.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

function login(email, password, callback) {
    // we must connect to the mongodb server before we can do anything with it
    mongoClient.connect(mongoUrl, function(error, db) {
        console.log("-----Connecting to MongoDB------------------------------------------------------------------");
        if(error) {
            callback("Server Error: Failed to connect to database!", null);
        } else {
            console.log("Connected to database.");
            var queryFilter = { "recordType": "User Account", "email": email };
            var queryResultSize = 1;
            db.collection(myCollection).find(queryFilter).limit(queryResultSize).each(function(error, userAccount) {
                console.log("-----Querying MongoDB---------------------------------------------------------------------");
                if(error) {
                    callback("Client Error: No user account exists for email: " + email, null);
                }
                else {
                    if(!userAccount) {
                        callback("Client Error: No user account exists for email: " + email, null);
                    } else {
                        if( userAccount.password == password ) {
                            var token = 1;//hard-coded since this is just a silly example
                            callback(null, token);
                        } else {
                            callback("Client Error: Password is incorrect.", null);
                        }
                    }
                }
            });
        }
    });
}

function signup(firstName, lastName, phone, email, password, callback) {
    // we must connect to the mongodb server before we can do anything with it
    mongoClient.connect(mongoUrl, function(error, db) {
        console.log("-----Connecting to MongoDB------------------------------------------------------------------");
        if(error) {
            callback("Server Error: Failed to connect to database!", null);
        } else {
            console.log("Connected to database.");
            var queryFilter = { "recordType": "User Account", "email": email };
            var queryResultSize = 1;
            db.collection(myCollection).find(queryFilter).limit(queryResultSize).each(function(error, userAccount) {
                console.log("-----Querying MongoDB---------------------------------------------------------------------");
                if(error) {
                    callback("Server Error: Failed to query database.", null);
                } else {
                    if(!userAccount) {
                        // create user account
                        var newUserAccount = { "recordType": "User Account", "firstName": firstName, "lastName": lastName, "phone": phone, "email": email, "password": password };
                        db.collection(myCollection).insertOne(newUserAccount, function(error, result) {
                            console.log("-----Creating Record in Database-------------------------------------------------------------------");
                            if(error)
                                callback("Server Error: Failed to store new user account.", null);
                            else
                                callback(null, "Welcome to The Forest.");
                        });
                    } else {
                        callback("Client Error: A user account already exists for email: " + email, null);
                    }
                }
            });
        }
    });
}

// TODO: Add functions for CRUD operations, then build the high level
// functions like login and signup using these
// low level functions.
// Let's try to find ALL the user account records that we added in the previous step...
var readFilter = { recordType: "User Account" };
function read(readFilter, queryResultsSize) {
    db.collection(myCollection).find(readFilter).limit(queryResultSize).toArray(function(error, records) {
        console.log("\n\n-----EXAMPLE: READ (multiple)---------------------------------------------------------------------");
        if(error) {
            console.log("ERROR! Failed to find records matching filter " + JSON.stringify(readFilter) + " in collection " + myCollection);
        }
        else {
            console.log("Found records matching filter " + JSON.stringify(readFilter) + " in collection " + myCollection + ":");
            console.log(records);
        }
    });
}

module.exports.login = login;
module.exports.signup = signup;
