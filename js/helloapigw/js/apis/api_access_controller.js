
// import package for creating, signing and verifying tokens
var jwt = require('jsonwebtoken');

// import our project configurtion file
var config = require('./../config');
// configure the secret that is shared between the api gateway
// and apis and is used for authorizing user access
// to each private api
var secret = config.secret;
// NOTE: This secret works like a private symmetric key.  The API Gateway uses it to
// digitally sign each JWT (token) that it issues to a client; and APIs use it to verify the
// digital signature of each JWT presented by a client.

// ---------------------------------------------------------
// This API Access Controller must be called by the ExpressJS middleware before
// looking at any API routes.
// It is used to verify JWT tokens (authentication) including
// verifying claims in the token about which APIs
// the user can access (authorization).
// ---------------------------------------------------------
var api_access_controller = function(request, response, next) {
        // check header or url parameters or post parameters for token
        var encoded_token = request.body.token || request.params.token || request.headers['x-access-token'];
        if (encoded_token) {
            // uses secret to verify digital signature on token
            // and checks expiration
            jwt.verify(encoded_token, secret, function(error, decoded_token) {			
                if (error) {
                    return response.json({ success: false, message: 'Failed to authenticate token.' });		
                } else {
                    // TODO: Make sure this is correct.
                    //if everything is good, save to request for use in other routes
                    request.decoded = decoded_token;

                    //debug
                    console.log('token: ' + decoded_token)
                    
                    // TODO: check apis authorized for this user
                    // if they are not authorized for the api they are
                    // requesting, return code 403
                    //return response.status(403).send({ 
                    //    success: false, 
                    //    message: 'User not authorized for this api.'
                    //});

                    // this proceed with checking the HTTP request against the remaining routes in the list,
                    // which that list is basically any api routes added to the ExpressJS app
                    // after the token_handler
                    next();
                }
            });
        } else {
            // if there is no token, return an error
            return response.status(403).send({ 
                success: false, 
                message: 'No token provided.'
            });
            
        }
        
    }

module.exports = api_access_controller