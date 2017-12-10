
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
// update an existing user
// Usage:
// POST http://localhost:8080/apis/public/updateuser
// with {name:"name", password: "password", apis: ["hello", "goodbye"]} in the body
router.post('/apis/public/updateuser', function(request, response) {
    if(request.body.name & request.body.password & request.body.apis) {
        User.findOne({name: request.body.name}, function(error, user) {
            if (error) {
                response.json({ success: false, message: "Failed to find user." });
                console.log('Failed to find user');
            }
            // currently we support updating the user password and
            // which apis the user can access
            user.password = request.body.password;
            user.apis = request.body.apis;
            response.json({ success: true, message: "Updated user." });
            console.log('Updated user.');
        });
    } else {
        response.json({ success: false, message: "Invalid request. Missing user info." });
        console.log('Invalid request. Missing user info.');  
    }
});

module.exports = router