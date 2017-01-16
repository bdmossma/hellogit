# Hello MongoDB!
This is a hello world for writing NodeJS applications that use MongoDB
deployed on the local machine.

We do NOT need any install step for MongoDB since it is already
deployed in the cloud.  We will be using the very awesome
[MongoDB Cloud Service](https://cloud.mongodb.com).

### URL for MongoDB Server:
`var username = "mongodbclouduser";
var password = "revelinginthe$un";
var url = "mongodb://" + username + ":" + password +
    "@cluster0-shard-00-00-r75mr.mongodb.net:27017,cluster0-shard-00-01-r75mr.mongodb.net:27017,cluster0-shard-00-02-r75mr.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
`

#### Install MongoDB client for NodeJS
`npm install mongodb    # or add it under dependencies in your project's package.json file`
