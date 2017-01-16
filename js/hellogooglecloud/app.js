var http = require("http");

var jsonResponse = { "hello": "gcloud" };

// To access the HTTP server, load this URL in your browser:
// http://localhost:8080
var app = http.createServer(function(httpRequest, httpResponse){
    httpResponse.setHeader("Content-Type", "application/json");
    httpResponse.end(JSON.stringify(jsonResponse));
});

app.listen(8080);

console.log("NodeJS App running on Port 8080");
