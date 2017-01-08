var express = require("express")
var app = express()

// API 1: Download a text file
// Example URL: http://localhost:8080/apis/textFile
app.get("/apis/textFile", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting a text file...");
    httpResponse.sendFile(__dirname + "/www/downloads/textFile.txt");
});

// API 2: Download a .zip
// Example URL: http://localhost:8080/apis/zipFile
app.get("/apis/zipFile", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting a zip file...");
    httpResponse.sendFile(__dirname + "/www/downloads/zipFile.zip");
});

// API 3: Download an image
// Example URL: http://localhost:8080/apis/imageFile
app.get("/apis/imageFile", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting an image file...");
    httpResponse.sendFile(__dirname + "/www/downloads/imageFile.jpg");
});

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
