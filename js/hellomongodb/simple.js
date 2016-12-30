
var MongoClient = require('mongodb').MongoClient;
 
var myCollection;
var db = MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err)
        throw err;
    console.log("connected to the mongoDB !");
    myCollection = db.collection('test_collection');
});

myCollection.insert({name: "doduck", description: "learn more than everyone"}, function(err, result) {
    if(err)
        throw err;
 
    console.log("entry saved");
});

var cursor = myCollection.find({"name" : "doduck", "company.officialName" : "doduck LTD" });
cursor.each(function(err, doc) {
    if(err)
        throw err;
    if(doc==null)
        return;
 
    console.log("document find:");
    console.log(doc.name);
    console.log(doc.company.employed);
});