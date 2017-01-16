
//------------------------------------------------------------------------------
// APIs for login and signup are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var app = express();

//------------------------------------------------------------------------------
// Let's import modular APIs for login and signup from separate JavaScript files.
// (We can omit the ".js" extension)
//------------------------------------------------------------------------------
var loginApi = require("./login_api");
var signupApi = require("./signup_api");

app.use(loginApi);
app.use(signupApi);

app.listen(8080);

console.log("ExpressJS App running on Port 8080");
