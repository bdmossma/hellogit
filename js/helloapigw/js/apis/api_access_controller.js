
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
                    console.log("API Access Control => JWT bearer token is authenticated. We can trust its claims.");
                    var authorized_apis_in_token = decoded_token.apis;
                    var requested_api = request.url;

                    // TODO: Make sure this is correct.
                    //if everything is good, save to request for use in other routes
                    request.decoded = decoded_token;

                    //debug
                    console.log('API Access Control => Authorized APIs in the authenticated JWT bearer token: ' + JSON.stringify(authorized_apis_in_token));
                    console.log("API Access Control => User is trying to access API: " + requested_api);

                    // Now that the JWT bearer token is authenticated.  We can trust its claims.
                    // The next step is authorization.
                    // Let's check if the requested API (URL) is among the authorized
                    // APIS listed in the bearer token.
                    if(authorized_apis_in_token.indexOf(requested_api) > -1) {
                        console.log("User is authorized for API: " + requested_api);
                        // Next that we know access to this API is authorized, let's allow
                        // handling of the request...
                        // Let's exit the middleware and proceed with checking the
                        // HTTP request against all the API routes / handlers
                        // that are registered.
                        next();
                    } else {
                        // WARNING: User is NOT authorized to access the API they are requested.
                        // Do NOT allow the user to access the API!!!
                        // Return HTTP code 403 Forbidden.
                        console.log("User not authorized for API: " + requested_api);
                        return response.status(403).send({ success: false, message: "User not authorized for API: " + requested_api});
                    }
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