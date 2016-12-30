var http = require("http");

var jsonResponse = { "hello": "nodejs" };

var app = http.createServer(function(httpRequest, httpResponse){
	httpResponse.setHeader("Content-Type", "application/json");
	httpResponse.end(JSON.stringify(jsonResponse));
});

app.listen(8080);

console.log("NodeJS App running on Port 8080");