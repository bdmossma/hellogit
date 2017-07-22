
var express = require("express");
var router = express.Router();

var fs = require("fs");

//------------------------------------------------------------------------------
// API simply responds with a JSON containing all files uploaded so far
//------------------------------------------------------------------------------
// URL: http://[Base URL]/apis/delete/[file]
//------------------------------------------------------------------------------
router.get("/apis/delete/:file", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	var filepath = __dirname + "/www/uploads/" + httpRequest.params.file;
	fs.unlinkSync(filepath);
    httpResponse.send("Deleted file");
    console.log("Client " + clientIp + " is deleted file " + httpRequest.params.file);
});


module.exports = router
