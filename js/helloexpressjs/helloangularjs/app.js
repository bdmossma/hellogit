var express = require("express")
var app = express()

// API 1: Get a simple HTML webpage that
// gets a client js
// Example URL: http://localhost:8080/
app.get("/", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting a simple HTML webpage...");
    httpResponse.sendFile(__dirname + "/www/html/webpage.html");
});


// API 2: Get a client js that will run inside
// the browser.
// Example URL: http://localhost:8080/client.js
app.get("/client.js", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting a simple JavaScript...");
    httpResponse.sendFile(__dirname + "/www/js/client.js");
});

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
