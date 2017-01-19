

// database collection for this example
var collection = "ExampleCollection";

// MongoDB URL & Credentials
var username = "mongodbclouduser";
var password = "revelinginthe$un";
var url = "mongodb://" + username + ":" + password +
    "@cluster0-shard-00-00-r75mr.mongodb.net:27017,cluster0-shard-00-01-r75mr.mongodb.net:27017,cluster0-shard-00-02-r75mr.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

module.exports.collection = collection;
module.exports.username = username;
module.exports.password = password;
module.exports.url = url;
