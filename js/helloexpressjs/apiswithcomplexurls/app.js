var express = require("express")
var app = express()

// API 1: API with URL params
// Example URL: http://localhost:8080/apis/users/1/books/1
app.get("/apis/users/:userId/books/:bookId", function(httpRequest, httpResponse) {
var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is using API with URL params...");
    httpResponse.send(httpRequest.params);// sends {"userId":"1","bookId":"1"} to browser

    if( "userId" && "bookId" in httpRequest.params) {
        console.log("These URL params could be used to query data from a database for example.");
        console.log("userId: " + httpRequest.params.userId);
        console.log("bookId: " + httpRequest.params.bookId);
    }
});

// API 2: API with URL query string
// Example URL: http://localhost:8080/apis/books?userId=1&bookId=1
// Please Note: The URL query string need not be part of the route
// as it is a standard syntax that ExpressJS parses automatically
// into an array of name-value pairs.
app.get("/apis/books", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is using API with URL query string...");
    httpResponse.send(httpRequest.query);// sends {"userId":"1","bookId":"1"} to browser

    if( "userId" && "bookId" in httpRequest.query) {
        console.log("These URL query string variables could be used to query data from a database for example.");
        console.log("userId: " + httpRequest.query.userId);
        console.log("bookId: " + httpRequest.query.bookId);
    }
});

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
