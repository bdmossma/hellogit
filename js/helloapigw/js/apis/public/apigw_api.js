// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// import package for creating, signing and verifying tokens
var jwt = require('jsonwebtoken');

// import our mongoose "user" model which is just an object oriented representation
// of a user in our mongodb database
var User   = require('./../../models/user');

// import our project configurtion file
var config = require('./../../config');
// configure the secret that is shared between the api gateway
// and apis and is used for authorizing user access
// to each private api
var secret = config.secret;
// NOTE: This secret works like a private symmetric key.  The API Gateway uses it to
// digitally sign each JWT (token) that it issues to a client; and APIs use it to verify the
// digital signature of each JWT presented by a client.

// plug in middlewares to parse HTTP body as urlencoded and JSON
// and put it in request.body JSON object
// for APIs on this router
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


// Let's make an "API Gateway" API for authenticating users and issuing
// JWT-based bearer tokens.
// HTTP Method & URL: POST http://localhost:8080/apis/public/apigw
// Headers: Content-Type = application/json
// Body: {"name":"name", "password": "password"}
router.post('/apis/public/apigw', function(request, response) {
    
    if(!request.body.name || !request.body.password) {
        return response.json({ success: false, message: 'Invalid request. Missing user info.' });
    }

    // find the user
    User.findOne({name: request.body.name}, function(error, user) {
        if (error) throw error;
        if (!user) {
            response.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != request.body.password) {
                response.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password matches
                // create a token

                // Let's create a custom token payload containing which APIs this user
                // is authorized to access.  We get that list of APIs from
                // our user database.
                var token_payload = {
                    apis: user.apis
                }

                console.log("Created token payload: " + JSON.stringify(token_payload));//debug

                var token = jwt.sign(token_payload, secret, {
                    // for security reasons, let's make the token expire in 24 hours
                    expiresIn: '24h'
                });

                response.json({
                    success: true,
                    message: 'Authenticated. You must re-authenticate after 24 hrs.',
                    token: token
                });
            }		

        }

    });
});
    

module.exports = router
