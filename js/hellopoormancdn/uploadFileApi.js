
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
		httpResponse.redirect(301, "https://cdn.gorealcloud.com");//redirect back to page from which form was submitted
        console.log("Uploaded " + fileName + " to: " + destPath);
    });
    readStream.on("error", function(err) {
		httpResponse.redirect(301, "https://cdn.gorealcloud.com");//redirect back to page from which form was submitted
		console.log("Failed to upload file " + fileName + " to: " + destPath);
    });
});

module.exports = router
