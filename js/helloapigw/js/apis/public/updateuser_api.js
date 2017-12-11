
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


// Let's make an API for updating an existing user
// currently in our database.
// HTTP Method & URL: PATCH http://localhost:8080/apis/public/updateuser
// Headers: Content-Type = application/json
// Body: {"name":"name", "password": "password", "apis": ["/apis/private/hello"]}
router.patch('/apis/public/updateuser', function(request, response) {
    if(!request.body.name || !request.body.password || !request.body.apis) {
        return response.json({ success: false, message: "Invalid request. Missing user info."});
    }

    console.log("request.body: " + JSON.stringify(request.body));//debug
    User.findOneAndUpdate({name: request.body.name}, request.body, function(error, user) {
        if (error) {
            response.json({ success: false, message: "Failed to update user." });
            console.log('Failed to update user');
        } else {
            console.log("user = " + JSON.stringify(user));
            response.json({ success: true, message: "Updated user." });
            console.log('Updated user.');
        }
    });

});

module.exports = router