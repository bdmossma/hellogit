// import the ExpressJS framework
var express = require('express');
// create an ExpressJS application
var app = express();


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
deleteallusers_api = require('./apis/public/deleteallusers_api')
app.use(deleteallusers_api)
users_api = require('./apis/public/users_api')
app.use(users_api)

// import the "API Gateway" API that controls access to
// all of the private APIs
apigw_api = require('./apis/public/apigw_api')
app.use(apigw_api)


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