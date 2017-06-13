
//------------------------------------------------------------------------------
// APIs for login, signup, and users are modular APIs residing in the same tier (deployed to
// same machine in the network) with app.js which can simply
// import and host them.
//------------------------------------------------------------------------------
var express = require("express");
var router = express.Router();
var db = require("./db");

//------------------------------------------------------------------------------
// This API does user signup.
//------------------------------------------------------------------------------
// API URL:
// https://[Base URL]/apis/signup/:email/:firstName/:lastName/:password
//------------------------------------------------------------------------------
router.get("/apis/signup/:email/:firstName/:lastName/:password",
	function(httpRequest, httpResponse) {
	    // Regarding Security: Yes, we are actually putting the password in the URL as
	    // this is just a fun little HTTP (plaintext) example.  Of course, in production,
	    // we would use Basic Authentication over HTTPS.
	    var clientIp = httpRequest.headers['x-forwarded-for'] || httpRequest.connection.remoteAddress;
	    console.info("Client " + clientIp + " is trying to sign up...");

	    var signedUp = db.signUpUser(httpRequest.params.email, httpRequest.params.firstName, httpRequest.params.lastName, httpRequest.params.password);
	    if(signedUp) {
	            var resultResp = { "message": "signUpResp", "result": result };
	            console.info(resultResp);
				return httpResponse.send(resultResp);
	    } else {
	            var errorResp = { "message": "signUpResp", "error": "An account already exists for this email." };
	            console.error(errorResp);
				return httpResponse.send(errorResp);
	    }
	}
);

module.exports = router
