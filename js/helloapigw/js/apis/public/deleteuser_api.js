
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


// Let's make an API for deleting a single user
// that we specify by name.
// HTTP Method & URL: PATCH http://localhost:8080/apis/public/deleteuser
// Headers: Content-Type = application/json
// Body: {"name":"name"}
router.patch('/apis/public/deleteuser', function(request, response) {
    if(!request.body.name) {
        return response.json({ success: false, message: "Invalid request. Missing username."});
    }

    console.log("request.body: " + JSON.stringify(request.body));//debug
    User.findOneAndRemove({name: request.body.name}, function(error) {
        if(error) {
            response.json({ success: false, message: "Failed to delete user." });
            console.log('Failed to delete user.')
        } else {
            response.json({ success: true, message: "Deleted user." });
            console.log('Deleted user.');
        }
    });
});

module.exports = router