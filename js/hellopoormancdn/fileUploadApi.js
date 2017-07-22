
var express = require("express");
var router = express.Router();

var multer  = require("multer");
// Initialize multer with the tmp directory where it can
// buffer files while uploading them.
var fileUpload = multer( { dest: "/tmp" } );

var fs = require("fs");

//------------------------------------------------------------------------------
// This API does something else
//------------------------------------------------------------------------------
// API URL: https://[Base URL]/dosomethingelse
//------------------------------------------------------------------------------
// API: For the server side, use an Open Source package to do the
// heavy lifting of parsing multipart/form-data and do the file
// uploading for us.
// Example URL: http://localhost:8080/apis/uploadFile

// This is the "name" attribute for the upload file in fileUploader.html and
// is encoded in the multipart/form-data when the file
// is uploaded.
var uploadType = fileUpload.single("fileBrowser");

router.post('/apis/uploadFile', uploadType, function (httpRequest, httpResponse, next) {
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
        console.log("Uploaded " + fileName + " to: " + destPath);
        httpResponse.sendFile(__dirname + "/www/html/uploadCompleted.html");
    });
    readStream.on("error", function(err) {
        console.log("Failed to upload " + fileName);
        httpResponse.sendFile(__dirname + "/www/html/uploadFailed.html");
    });
});


module.exports = router
