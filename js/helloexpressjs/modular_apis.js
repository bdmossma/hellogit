var express = require("express");
var app = express();
var modular_api_1 = require("./modular_api_1");
var modular_api_2 = require("./modular_api_2");

app.use(modular_api_1);
app.use(modular_api_2);

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
