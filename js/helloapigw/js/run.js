// import the ExpressJS framework
var express = require('express');
// create an ExpressJS application
var app = express();

// import body-parser
var bodyParser = require('body-parser');
// use body parser so we can parse info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import morgan logger
var morgan = require('morgan');
// configure app to use morgan logger for logging requests to the console
app.use(morgan('dev'));

// import the public APIs that are freely accessible to everyone
createuser_api = require('./apis/public/createuser_api')
app.use(createuser_api)
updateuser_api = require('./apis/public/updateuser_api')
app.use(updateuser_api)
deleteuser_api = require('./apis/public/deleteuser_api')
app.use(deleteuser_api)
users_api = require('./apis/public/users_api')
app.use(users_api)

// import the "API Gateway" API that controls access to
// all of the private APIs
apigw_api = require('./apis/public/apigw_api')
app.use(apigw_api)

// API Access Control:
// Here we configure the ExpressJS app to use an API access controller for
// verifying JWT tokens. This must be plugged in:
//     - AFTER public APIs; and
//     - BEFORE private APIs
var api_access_controller = require('./apis/api_access_controller')
app.use(api_access_controller);

// import the private APIs that are accessible only to authenticated
// users that are also authorized to access them
hello_api = require('./apis/private/hello_api')
app.use(hello_api)
goodbye_api = require('./apis/private/goodbye_api')
app.use(goodbye_api)


// start the expressjs application
var port = process.env.PORT || 8080;
app.listen(port);
console.log('ExpressJS app running at http://localhost:' + port);