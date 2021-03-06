
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
		var fileInfo = {name:"",size:0};
		fileInfo.name = file;
		fileInfo.size = fs.statSync(uploadsDir + file).size;
        fileList.push(fileInfo);
    });
    httpResponse.send(fileList);
    console.log("Client " + clientIp + " listed files:\n" + JSON.stringify(fileList));
});


module.exports = router
