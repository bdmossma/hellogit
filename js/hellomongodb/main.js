
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

    // READ: multiple records
    // Let's try to find the records that we added in the previous step...
    var filter = { recordType: "User Account" };
    var queryResultSize = 5;    // Notice that we can limit the size of query result
    db.collection(myCollection).find(filter).limit(queryResultSize).toArray(function(error, records) {
        if(error) {
            console.log("ERROR! Failed to find records matching filter " + JSON.stringify(filter) + " in collection " + myCollection);
        }
        else {
            console.log("Found records matching filter " + JSON.stringify(filter) + " in collection " + myCollection + ":");
            console.log(records);
        }
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
    var options = { single: false };// if single is true, deletes only first record found
    db.collection(myCollection).deleteMany(filter, options, function(error, result) {
        if(error)
            console.log("ERROR! Failed to delete records matching filter " + JSON.stringify(filter) + " in collection " + myCollection);
        else
            console.log("Deleted records matching filter " + JSON.stringify(filter) + " in collection " + myCollection);
    });

    // Bonus Example: Avoiding duplicate records in your database collection.
    // Please Note this uses many of the previous steps together
    // in one example.  Please make sure you understand the previous
    // steps before proceeding to this example.

    // First, let's demonstrate accidentally adding duplicate records into our database collection...
    db.collection(myCollection).insertOne(jockRecord, function(error, result) {
        if(error)
            console.log("ERROR! Failed to create " + JSON.stringify(jockRecord) + " in collection " + myCollection);
        else
            console.log("Created " + JSON.stringify(jockRecord) + " in collection " + myCollection);
    });
    // Try adding Jock record again, however this time it will return error
    // as Jock record is already present in the database collection
    db.collection(myCollection).insertOne(jockRecord, function(error, result) {
        if(error){
            console.log("ERROR! Failed to create " + JSON.stringify(jockRecord) + " in collection " + myCollection);
            console.log(error);// we expect this second insert to return error
        }
        else {
            console.log("Created " + JSON.stringify(jockRecord) + " in collection " + myCollection);
        }
    });
    // If we query for all Jock records, we will find only one Jock record and no duplicates.
    var jockFilter = { recordType: "User Account", name: "Jock" };
    db.collection(myCollection).find(filter).toArray(function(error, records) {
        if(error) {
            console.log("ERROR! Failed to find records matching filter " + JSON.stringify(jockFilter) + " in collection " + myCollection);
        }
        else {
            console.log("Found records matching filter " + JSON.stringify(jockFilter) + " in collection " + myCollection + ":");
            console.log(records);
        }
    });

    db.close();
});
