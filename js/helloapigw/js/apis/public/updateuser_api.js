
// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// import our mongoose "user" model which is just an object oriented representation
// of a user in our mongodb database
var User = require('./../../models/user');

// update an existing user
// Usage:
//  POST http://localhost:8080/apis/public/updateuser
//       with "x-www-form-urlencoded" set to
//       {name:"name", password: "password", apis: ["hello", "goodbye"]}
router.post('/apis/public/updateuser', function(request, response) {
    user_info = request.headers['x-www-form-urlencoded'];
    user_info_valid = user_info.name & user_info.password & user_info.apis;
    if(user_info_valid) {
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
        response.json({ success: false, message: "Invalid user info." });
        console.log('Invalid user info.');  
    }
});

module.exports = router