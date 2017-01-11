
//------------------------------------------------------------------------------
// APIs 1 & 2 are modular APIs residing in the same tier (deployed to
// same machine in the network) with localapp.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var app = express();
var api1 = require("./api1");
var api2 = require("./api2");

app.use(api1);
app.use(api2);

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
