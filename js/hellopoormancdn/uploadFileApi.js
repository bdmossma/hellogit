
var express = require("express");
var router = express.Router();

var multer  = require("multer");
// Initialize multer with the tmp directory where it can
// buffer files while uploading them.
var fileUpload = multer( { dest: "/tmp" } );

var fs = require("fs");


//------------------------------------------------------------------------------
// API: For the server side, use an Open Source package to do the
// heavy lifting of parsing multipart/form-data and do the file
// uploading for us.
// Example URL: http://[Base URL]/apis/upload

var uploadType = fileUpload.single("uploadedFile");

router.post('/apis/upload', uploadType, function (httpRequest, httpResponse, next) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	var file = httpRequest.file;
	var filename = file.originalname;
	console.log("Client " + clientIp + " is uploading " + filename + "...");

    // This is a temporary filepath where the file is buffered
    // while it is being uploaded.
    var tmpPath = file.path;

    // This is the final resting place of the file
    // after is uploaded.
    var destPath = __dirname + "/www/uploads/" + filename;

    // Use the "fs" package to work with read and write
    // streams and the filesystem.
    var readStream = fs.createReadStream(tmpPath);
    var writeStream = fs.createWriteStream(destPath);
    readStream.pipe(writeStream);

    readStream.on("end", function() {
		httpResponse.send("Uploaded");
		console.log(filename + " uploaded");
    });
    readStream.on("error", function(err) {
		httpResponse.send("Upload failed: " + err);
		console.log("error uploading " + filename + ": " + err);
    });
	writeStream.on("error", function(err) {
		httpResponse.send("Upload failed: " + err);
		console.log("error uploading " + filename + ": " + err);
    });

	//writeStream.on("finish", function() {
	//	fileUploadStatus[filename] = "Uploaded";
	//	httpResponse.send(fileUploadStatus);
	//	console.log(fileUploadStatus);
    //});

});

module.exports = router
