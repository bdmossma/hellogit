
//------------------------------------------------------------------------------
// Note how local appregate_api.js can rely upon other APIs that reside elsewhere
// in the cloud.  It can create its own APIs by combining other existing
// APIs in new and creative ways.
//------------------------------------------------------------------------------
var express = require("express");
var app = express();

//------------------------------------------------------------------------------
// Let's import the modular API called "aggregate_api" from a separate
// JavaScript file.  (We can omit the ".js" extension)
//------------------------------------------------------------------------------
var aggregate_api = require("./aggregate_api");

app.use(aggregate_api);

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
