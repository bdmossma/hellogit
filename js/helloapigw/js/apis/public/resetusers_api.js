
// import the Express JS framework
var express = require("express");
// import the api router so we can create a modular api
// and export it from this file to the main
// application
var router = express.Router();

// import our mongoose "user" model which is just an object oriented representation
// of a user in our mongodb database
var User   = require('./../../models/user');

// Let's create an API to reset users in the database.
// This will clear out all users in the database and create
// 1 bootstrap user.
// HTTP Method & URL: PATCH http://localhost:8080/apis/public/resetusers
router.patch('/apis/public/resetusers', function(request, response) {
	// delete all users from the database
	User.remove({}, function(error) {
        if(error) {
            response.json({ success: false, message: "Failed to delete all users." });
            console.log('Failed to delete all users.')
        } else {
			console.log('Deleted all users.')
		}
	});
	// create bootstrap user named "Superman"
    var bootstrap_user = new User({ 
        name: "Superman", 
        password: "password",
        apis: ["/apis/private/hello", "/apis/private/goodbye"]
	});
	// add bootstrap user to the database
    bootstrap_user.save(function(error) {
        if (error)  {
            response.json( { success: false, message: "Failed to create bootstrap user." } );
            console.log('Failed to create bootstrap user.');
        } else {
			response.json( { success: true, message: "Reset users." } );
			console.log('Reset users.');
		}
    });
});


module.exports = router