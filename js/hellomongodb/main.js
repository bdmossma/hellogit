
// Please Note: Must run MongoDB before running this script, else this
// script will fail to connect to MongoDB.
// If MongoDB is already installed on your host machine, you can
// simply run "mongod" from the command line.

// This is a mongodb hello world example using the native mongodb client
// for nodejs. This example will demonstrate how to:
//     1. connect to the mongodb server; and
//     2. perform CRUD operations (Create, Read, Update, Delete)
var mongoClient = require("mongodb").MongoClient;

// connect to mongodb server
var url = "mongodb://localhost:27017";
var connection = mongoClient.connect(url, function(error, db) {
    if(error)
        console.log("ERROR! Failed to connect to mongodb at " + url);
    else
        console.log("Connected to mongodb at " + url);

    // CREATE: single record
    var myCollection = "ExampleCollection";
    var jockRecord = { recordType: "User Account", name: "Jock", email: "jock@email.com", phone: "111-111-1111" };
    db.collection(myCollection).insertOne(jockRecord, function(error, result) {
        if(error)
            console.log("ERROR! Failed to create " + JSON.stringify(jockRecord) + " in collection " + myCollection);
        else
            console.log("Created " + JSON.stringify(jockRecord) + " in collection " + myCollection);
    });

    // CREATE: multiple records
    var aprilRecord = { recordType: "User Account", name: "April", email: "april@email.com", phone: "222-222-2222" };
    var tomRecord = { recordType: "User Account", name: "Tom", email: "tom@email.com", phone: "333-333-3333" };
    db.collection(myCollection).insertMany([aprilRecord, tomRecord], function(error, result) {
        if(error)
            console.log("ERROR! Failed to create " + JSON.stringify(aprilRecord) + " and " + JSON.stringify(tomRecord) + " in collection " + myCollection);
        else
            console.log("Created [" + JSON.stringify(aprilRecord) + ", " + JSON.stringify(tomRecord) + "] in collection " + myCollection);
    });

    // UPDATE: single record
    var newJockRecord = { recordType: "User Account", name: "Jock", email: "jock@email.com", phone: "111-111-1111", country: "United States" };
    db.collection(myCollection).updateOne(jockRecord, {$set: newJockRecord}, function(error, result) {
        if(error)
            console.log("ERROR! Failed to update " + JSON.stringify(jockRecord) + " in collection " + myCollection);
        else
            console.log("Updated " + JSON.stringify(jockRecord) + " to " + JSON.stringify(newJockRecord) + " in collection " + myCollection);
    });

    // DELETE: 1 or more records
    var filter = { recordType: "User Account" };
    var options = { single: false };// if single is true, deletes only first record found
    db.collection(myCollection).deleteMany(filter, options, function(error, result) {
        if(error)
            console.log("ERROR! Failed to delete records matching filter " + JSON.stringify(filter) + " in collection " + myCollection);
        else
            console.log("Deleted records matching filter " + JSON.stringify(filter) + " in collection " + myCollection);
    });

    // READ: 1 or more records
    // First, let's add some records into the database, so we can find them...
    db.collection(myCollection).insertMany([aprilRecord, tomRecord], function(error, result) {
        if(error)
            console.log("ERROR! Failed to create " + JSON.stringify(aprilRecord) + " and " + JSON.stringify(tomRecord) + " in collection " + myCollection);
        else
            console.log("Created [" + JSON.stringify(aprilRecord) + ", " + JSON.stringify(tomRecord) + "] in collection " + myCollection);
    });
    // Next, let's try to find the records that we added... (notice that we can limit the size of query result)
    var queryResultSize = 5;
    db.collection(myCollection).find(filter).limit(queryResultSize).toArray(function(error, records) {
        if(error) {
            console.log("ERROR! Failed to find records matching filter " + JSON.stringify(filter) + " in collection " + myCollection);
        }
        else {
            console.log("Found records matching filter " + JSON.stringify(filter) + " in collection " + myCollection + ":");
            console.log(records);
        }
    });

    db.close();
});
