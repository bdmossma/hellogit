var express = require("express");
var app = express();
var api1 = require("./api1");
var api2 = require("./api2");

app.use(api1);
app.use(api2);

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
