
var express = require("express");
var router = express.Router();

var multer  = require("multer");
// Initialize multer with the tmp directory where it can
// buffer files while uploading them.
var fileUpload = multer( { dest: "/tmp" } );

var fs = require("fs");


var fileList = [];

//------------------------------------------------------------------------------
// API: For the server side, use an Open Source package to do the
// heavy lifting of parsing multipart/form-data and do the file
// uploading for us.
// Example URL: http://localhost:8080/apis/upload

// This is the "name" attribute for the upload file in fileUploader.html and
// is encoded in the multipart/form-data when the file
// is uploaded.
var uploadType = fileUpload.single("myFile");

router.post('/apis/upload', uploadType, function (httpRequest, httpResponse, next) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    var fileName = httpRequest.file.originalname;
    console.log("Client " + clientIp + " is uploading file: " + fileName);

    // This is a temporary filepath where the file is buffered
    // while it is being uploaded.
    var tmpPath = httpRequest.file.path;

    // This is the final resting place of the file
    // after is uploaded.
    var destPath = __dirname + "/www/uploads/" + fileName;

    // Use the "fs" package to work with read and write
    // streams and the filesystem.
    var readStream = fs.createReadStream(tmpPath);
    var writeStream = fs.createWriteStream(destPath);
    readStream.pipe(writeStream);
    readStream.on("end", function() {
		httpResponse.send("Uploaded");
        console.log("Uploaded " + fileName + " to: " + destPath);
		fileList.push(fileName);
    });
    readStream.on("error", function(err) {
		httpResponse.send("Upload failed");
		console.log("Failed to upload file " + fileName + " to: " + destPath);
    });
});


//------------------------------------------------------------------------------
// API simply responds with a JSON containing all files uploaded so far
//------------------------------------------------------------------------------
// URL: http://localhost:8080/apis/files
//------------------------------------------------------------------------------
router.get("/apis/files", function(httpRequest, httpResponse) {
    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
    console.log("Client " + clientIp + " is getting file list...");
    httpResponse.send(fileList);
});


module.exports = router
