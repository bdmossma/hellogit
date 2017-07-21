
//------------------------------------------------------------------------------
// Modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();

//------------------------------------------------------------------------------
// This API does something else
//------------------------------------------------------------------------------
// API URL: https://[Base URL]/dosomethingelse
//------------------------------------------------------------------------------
router.get("/apis/dosomethingelse",
    function(httpRequest, httpResponse) {
        var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
        console.info("Client " + clientIp + " is trying to do something else...");

		return httpResponse.send({ "message": "dosomethingelseResponse","result": true, "resultMsg": "hello" });
    }
);


module.exports = router
