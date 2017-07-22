
var express = require("express");
var router = express.Router();

var fs = require("fs");

//------------------------------------------------------------------------------
// API simply responds with a JSON containing all files uploaded so far
//------------------------------------------------------------------------------
// URL: https://[Base URL]/apis/files
//------------------------------------------------------------------------------
router.get("/apis/files", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	var fileList = [];
	var uploadsDir = __dirname + "/www/uploads/";
	fs.readdirSync(uploadsDir).forEach(file => {
        fileList.push(file);
    });
    httpResponse.send(fileList);
    console.log("Client " + clientIp + " listed files:\n" + JSON.stringify(fileList));
});


module.exports = router
