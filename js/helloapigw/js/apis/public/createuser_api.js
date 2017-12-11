
// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// import our mongoose "user" model which is just an object oriented representation
// of a user in our mongodb database
var User = require('./../../models/user');

// plug in middlewares to parse HTTP body as urlencoded and JSON
// and put it in request.body JSON object
// for APIs on this router
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Let's make an API for creating a new user.
// HTTP Method & URL: POST http://localhost:8080/apis/public/createuser
// Headers: Content-Type = application/json
// Body: {"name":"name", "password": "password", "apis": ["/apis/private/hello"]}
router.post('/apis/public/createuser', function(request, response) {
    if(!request.body.name || !request.body.password || !request.body.apis) {
        return response.json({ success: false, message: "Invalid request. Missing user info."});
    }

    console.log("request.body: " + JSON.stringify(request.body));//debug
    var new_user = new User({ 
        name: request.body.name, 
        password: request.body.password,
        apis: request.body.apis
    });
    new_user.save(function(error) {
        if (error)  {
            response.json( { success: false, message: "Failed to create new user." } );
            console.log('Failed to create new user.');
        }
        response.json( { success: true, message: "Created new user." } );
        console.log('Created new user.');
    });
});

module.exports = router