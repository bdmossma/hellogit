
//------------------------------------------------------------------------------
// Modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();

//------------------------------------------------------------------------------
// This API does something.
//------------------------------------------------------------------------------
// API URL:
// https://[Base URL]/apis/download/[file]
//------------------------------------------------------------------------------
router.get("/apis/download/:file", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is downloading file " + httpRequest.params.file);
    httpResponse.sendFile(__dirname + "/www/uploads/" + httpRequest.params.file);
});

module.exports = router
