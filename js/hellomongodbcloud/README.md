# Hello MongoDB Cloud!
This is a hello world for writing NodeJS applications that use MongoDB
deployed in the cloud.

## Prerequisites
-   [hellomongodb](https://github.com/bdmossma/hellogit/tree/master/js/hellomongodb)

We do NOT need any install step for MongoDB since it is already
deployed in the cloud.  We will be using the very awesome
[MongoDB Cloud Service](https://cloud.mongodb.com) which does a lot of
the heavy lifting for us in terms of cloud deployment.

When you create your MongoDB Cloud account, you can select the
options ($, $$, or $$$) for your MongoDB cluster and the system will set it up for you and
give you a URL and username and password for connecting to
the MongoDB cluster.  At the time of writing this readme, the cost was
roughly $.07/hour for my MongoDB cluster during the time while it is
servicing clients.

Definitely visits your MongoDB Cloud dashboard and review the metrics
and settings for your MongoDB cluster.  In particular, you will want to
review the Security settings.  For example, you can very simply whitelist which
IPs are allowed to connect to your database or
even allow ALL IPs to connect.

### URL for MongoDB Server:
`var username = "mongodbclouduser";
var password = "revelinginthe$un";
var url = "mongodb://" + username + ":" + password +
    "@cluster0-shard-00-00-r75mr.mongodb.net:27017,cluster0-shard-00-01-r75mr.mongodb.net:27017,cluster0-shard-00-02-r75mr.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
`

#### Install MongoDB client for NodeJS
`npm install mongodb    # or add it under dependencies in your project's package.json file`
