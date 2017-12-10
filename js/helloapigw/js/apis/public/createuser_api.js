
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
//   POST http://localhost:8080/apis/public/createuser
//       with "x-www-form-urlencoded" set to
//       {name:"name", password: "password", apis: ["hello", "goodbye"]}
router.post('/apis/public/createuser', function(request, response) {
    user_info = request.headers['x-www-form-urlencoded'];
    console.log(user_info);
    if(true) {
        var new_user = new User({ 
            name: user_info.name, 
            password: user_info.password,
            apis: user_info.apis
        });
        new_user.save(function(error) {
            if (error)  {
                response.json( { success: false, message: "Failed to create new user." } );
                console.log('Failed to create new user.');
            }
            response.json( { success: true, message: "Created new user." } );
            console.log('Created new user.');
        });
    } else {
        response.json( { success: false, message: "Invalid user info." } );
        console.log('Invalid user info.');
    }
});

module.exports = router