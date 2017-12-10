
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
// PATCH http://localhost:8080/apis/public/deleteallusers
router.patch('/apis/public/deleteallusers', function(request, response) {
    // use a wide filter, remove all users
    User.remove({}, function(error) {
        if(error) {
            response.json({ success: false, message: "Failed to delete all users." });
            console.log('Failed to delete all users.')
        }
        response.json({ success: false, message: "Deleted all users." });
        console.log('Deleted all users.')
    });
});

module.exports = router