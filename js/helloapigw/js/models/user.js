
// import our mongodb database client
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// import the project configuration file
var config = require('./../config')

// connect to our mongodb database using the mongodb url imported
// from our project configuration file
mongoose.connect(config.database);

// set up a mongoose model
var User = mongoose.model('User', new Schema({ 
	name: String, 
	password: String, 
	apis: [{ type: String }]
}));

module.exports = User