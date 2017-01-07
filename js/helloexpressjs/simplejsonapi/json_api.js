var express = require("express")
var app = express()

var jsonResponse = {"hello": "expressjs"};

// API 1: Respond with a JSON message
app.get("/apis/json", function(httpRequest, httpResponse) {
	var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	console.log("Client " + clientIp + " is getting a JSON message...");
	httpResponse.send(JSON.stringify(jsonResponse));
});

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
