
//------------------------------------------------------------------------------
// APIs for login and signup are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var app = express();

//------------------------------------------------------------------------------
// Import CORS package so that ExpressJS can respond with CORS headers
// to clients that are deployed out in the cloud for cross origin
// resource sharing.
// Per the wikipedia article:
// CORS allows restricted resources on a web page to be requested from another
// domain outside the domain from which the first resource was served.
// A web page may freely embed cross-origin images, stylesheets, scripts,
// iframes, and videos.
//------------------------------------------------------------------------------
var cors = require("cors");
app.use(cors());


//------------------------------------------------------------------------------
// Let's import modular APIs from separate JavaScript files.
// (We can omit the ".js" extension)
//------------------------------------------------------------------------------
var api1 = require("./api1");
var api2 = require("./api2");


// plug the APIs into the ExpressJS framework
app.use(api1);
app.use(api2);

app.listen(process.env.PORT || 8080);

console.log("ExpressJS App running on Port " + JSON.stringify(process.env.PORT || 8080));
