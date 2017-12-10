
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

// create a new user
// Usage:
// PATCH http://localhost:8080/apis/public/deleteuser
// with {name:"name"} in the body
router.patch('/apis/public/deleteuser', function(request, response) {
    User.findOneAndRemove({name: user_info.name}, function(error) {
        if(error) {
            response.json({ success: false, message: "Failed to delete user." });
            console.log('Failed to delete user.')
        }
        response.json({ success: false, message: "Deleted user." });
        console.log('Deleted user.')
    });
});

module.exports = router