
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Please Note: This hello world shows how to write a NodeJS application that
// uses MongoDB deployed in the cloud.  MongoDB does NOT need to be installed on the
// local machine for this example.
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This mongodb hello world example uses the native mongodb client
// for nodejs. This example will demonstrate how to:
//     1. connect to the mongodb server; and
//     2. perform CRUD operations (Create, Read, Update, Delete)
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mongoClient = require("mongodb").MongoClient;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EXAMPLE: CONNECT to mongodb
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// we must connect to the mongodb server before we can do anything with it
var url = "mongodb://localhost:27017";
var connection = mongoClient.connect(url, function(error, db) {
    console.log("-----EXAMPLE: CONNECT to MongoDB------------------------------------------------------------------");
    if(error)
        console.log("ERROR! Failed to connect to mongodb at " + url);
    else
        console.log("Connected to mongodb at " + url);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // EXAMPLE: Login to mongodb
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var username = "mongodbclouduser";
    var password = "revelinginthe$un";
    db.authenticate(username, password, function(error, result) {
        console.log("-----EXAMPLE: Logging into MongoDB------------------------------------------------------------------");
        if(error)
            console.log("ERROR! Failed to login to mongodb at " + url);
        else
            console.log("Logged into mongodb at " + url);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // EXAMPLE: CREATE single record
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var myCollection = "ExampleCollection";
    var jockRecord = { recordType: "User Account", name: "Jock", email: "jock@email.com", phone: "111-111-1111" };
    db.collection(myCollection).insertOne(jockRecord, function(error, result) {
        console.log("\n\n-----EXAMPLE: CREATE (single)---------------------------------------------------------------------");
        if(error)
            console.log("ERROR! Failed to create " + JSON.stringify(jockRecord) + " in collection " + myCollection);
        else
            console.log("Created " + JSON.stringify(jockRecord) + " in collection " + myCollection);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // EXAMPLE: CREATE multiple records
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var aprilRecord = { recordType: "User Account", name: "April", email: "april@email.com", phone: "222-222-2222" };
    var tomRecord = { recordType: "User Account", name: "Tom", email: "tom@email.com", phone: "333-333-3333" };
    db.collection(myCollection).insertMany([aprilRecord, tomRecord], function(error, result) {
        console.log("\n\n-----EXAMPLE: CREATE (multiple)-------------------------------------------------------------------");
        if(error)
            console.log("ERROR! Failed to create " + JSON.stringify(aprilRecord) + " and " + JSON.stringify(tomRecord) + " in collection " + myCollection);
        else
            console.log("Created [" + JSON.stringify(aprilRecord) + ", " + JSON.stringify(tomRecord) + "] in collection " + myCollection);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // EXAMPLE: READ multiple records
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Let's try to find ALL the user account records that we added in the previous step...
    var readFilter = { recordType: "User Account" };
    var queryResultSize = 5;    // Notice that we can limit the size of query result
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // EXAMPLE: UPDATE single record
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // we will try to add a country field to Jock's user account only
    var newJockRecord = { recordType: "User Account", name: "Jock", email: "jock@email.com", phone: "111-111-1111", country: "United States" };
    db.collection(myCollection).updateOne(jockRecord, {$set: newJockRecord}, function(error, result) {
        console.log("\n\n-----EXAMPLE: UPDATE (single)---------------------------------------------------------------------");
        if(error)
            console.log("ERROR! Failed to update " + JSON.stringify(jockRecord) + " in collection " + myCollection);
        else
            console.log("Updated " + JSON.stringify(jockRecord) + " to " + JSON.stringify(newJockRecord) + " in collection " + myCollection);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // EXAMPLE: DELETE 1 or more records
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // we will try to delete all user account records
    var deleteFilter = { recordType: "User Account" };
    var options = { single: false };// if single is true, deletes only first record found
    db.collection(myCollection).deleteMany(deleteFilter, options, function(error, result) {
        console.log("\n\n-----EXAMPLE: DELETE (1 or more)------------------------------------------------------------------");
        if(error)
            console.log("ERROR! Failed to delete records matching filter " + JSON.stringify(deleteFilter) + " in collection " + myCollection);
        else
            console.log("Deleted records matching filter " + JSON.stringify(deleteFilter) + " in collection " + myCollection);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BONUS EXAMPLE: Avoiding duplicate records in your database collection.
    // Please Note this uses many of the previous steps together
    // in one example.  Please make sure you understand the previous
    // steps before proceeding to this example.
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // First, let's demonstrate accidentally adding duplicate records into our database collection...
    db.collection(myCollection).insertOne(jockRecord, function(error, result) {
        console.log("\n\n-----EXAMPLE: Avoiding Duplicates-----------------------------------------------------------------");
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

    // If we query for all Jock records, we should find only one Jock record and no duplicates.
    var jockFilter = { recordType: "User Account", name: "Jock" };
    db.collection(myCollection).find(jockFilter).toArray(function(error, records) {
        if(error) {
            console.log("ERROR! Failed to find records matching filter " + JSON.stringify(jockFilter) + " in collection " + myCollection);
        }
        else {
            console.log("Found records matching filter " + JSON.stringify(jockFilter) + " in collection " + myCollection + ":");
            console.log(records);// should print out a single Josk user account record
        }
    });

    db.close();
});
