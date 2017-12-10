
// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// import our mongoose "user" model which is just an object oriented representation
// of a user in our mongodb database
var User = require('./../../models/user');

// create a new user
// Usage:
//   POST http://localhost:8080/apis/public/deleteuser
//       with "x-www-form-urlencoded" set to {name:"name"}
router.post('/apis/public/deleteuser', function(request, response) {
    user_info = request.headers['x-www-form-urlencoded'];
    if(user_info.name) {
        User.findOneAndRemove({name: user_info.name}, function(error) {
            if(error) {
                response.json({ success: false, message: "Failed to delete user." });
                console.log('Failed to delete user.')
            }
            response.json({ success: false, message: "Deleted user." });
            console.log('Deleted user.')
        });
    } else {
        response.json({ success: false, message: "Invalid username." });
        console.log('Invalid username.')
    }
});

module.exports = router