# Hello MongoDB!
This is a hello world for writing NodeJS applications that use MongoDB
deployed on the local machine.

## Install MongoDB
#### For Linux (Ubuntu 16.04 LTS):
sudo apt-get install mongodb
-   Create a database directory: `mkdir -p /data/db`
    -   PLEASE NOTE: Any databases you create will go here.  The default MongoDB configuration expects this directory to be present.
-   In Linuz terminal, run MongoDB using the following command: `mongod`
    -   PLEASE NOTE: `mongod` stands for MongoDB daemon.

#### For Windows (7, 10):
Download and install MongoDB from https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.1-signed.msi/download
-   Create a database directory: `mkdir -p /C/data/db`
    -   PLEASE NOTE: Any databases you create will go here.  The default MongoDB configuration expects this directory to be present.
-   Add `C:\Program Files\MongoDB\Server\3.4\bin` to your Path environment variable
-   In Git Bash terminal, run MongoDB using the following command: `mongod`

#### Install MongoDB package for NodeJS
`npm install mongodb    # or add it under dependencies in your project's package.json file`
