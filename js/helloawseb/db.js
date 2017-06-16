
var crypto = require("crypto");

// This module acts like a mock database for
// storing data.

var usersMap = new Map();

// @returns [result, resultMsg]
function getUsers() {
	var resultMsg = "OK";
	if(usersMap.size == 0) {
		resultMsg = "No users signed up";
		console.error(resultMsg);
		return [false, resultMsg]
	}
	return [true, JSON.stringify([...usersMap])];
}

function logUsers() {
	console.info("Users:");
	var [result, resultMsg] = getUsers();
	console.info(resultMsg);
}

// @returns True|False
function userExists(email) {
	return usersMap.has(email);
}

// @returns [result, resultMsg]
function signUpUser(email, firstName, lastName, password) {
	var resultMsg = "OK";

	if(userExists(email)) {
		resultMsg = "User already signed up.";
		console.error("Failed to sign up user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	usersMap.set(email, { "firstName" : firstName, "lastName" : lastName, "password" : password, "loggedIn" : false});
	console.info("Signed up user with email " + email);
	return [true, resultMsg];
}

// @returns [result, resultMsg]
function deleteUser(email, password) {
	var resultMsg = "OK";

	if(!userExists(email)) {
		resultMsg = "User is not signed up";
		console.error("Failed to delete user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	if(password != usersMap.get(email).password) {
		resultMsg = "Incorrect password";
		console.error("Failed to delete user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	usersMap.delete(email);
	console.info("Deleted user with email " + email);
	return [true, resultMsg];
}

/*
// @returns authToken
function genAuthToken() {
	crypto.randomBytes(48, function(error, buffer) {
		var authToken = buffer.toString('hex')
	    return authToken;
	});
}

// @returns [error, authTokenExp]
function genAuthTokenExp() {
	var currentTime = Math.floor(Date.now()/1000);// in seconds
	var authTokenExp = currentTime + 60*5;//have to log in again after 5 minutes
	return authTokenExp;
}

function checkIfAuthTokensExpired() {
	console.info("Checking if any auth tokens expired");
	var currentTime = Math.floor(Date.now()/1000);// in seconds
	usersMap.forEach(function(value, key) {
		if(key.loggedIn === true) {
			console.log("currentTime: " + currentTime);
			console.log("authTokenExp: " + value.authTokenExp);
			if(currentTime > value.authTokenExp) {
				key.loggedIn = false;
				key.authToken = "none";
				key.authTokenExp = "none";
			}
		}
	});
}
*/

// @returns [result, resultMsg]
function logInUser(email, password) {
	var resultMsg = "OK";

    if(!userExists(email)) {
		resultMsg = "User is not signed up";
		console.error("Failed to log in user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	if(password != usersMap.get(email).password) {
		resultMsg = "Incorrect password";
		console.error("Failed to log in user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	usersMap.get(email).loggedIn = true;
	console.info("Logged in user with email " + email);
	return [true, resultMsg];
}

// @returns [result, resultMsg]
function logOutUser(email, password) {
	var resultMsg = "OK";

	if(!userExists(email)) {
		resultMsg = "User is not signed up";
		console.error("Failed to log out user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	if(password != usersMap.get(email).password) {
		resultMsg = "Incorrect password";
		console.error("Failed to log out user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	usersMap.get(email).loggedIn = false;
	console.info("Logged out user with email " + email);
	return [true, resultMsg];
}

// for kicks and giggles, let's start out with a few users
signUpUser("otis.milo@email.com", "Otis", "Milo", "password");
signUpUser("daisy.duke@email.com", "Daisy", "Duke", "password");
logUsers();
//setInterval(checkIfAuthTokensExpired, 5000);// check ever 5 seconds

// decide what to export from this module
// for use in other modules
module.exports.logUsers = logUsers;
module.exports.getUsers = getUsers;
module.exports.userExists = userExists;
module.exports.signUpUser = signUpUser;
module.exports.deleteUser = deleteUser;
module.exports.logInUser = logInUser;
module.exports.logOutUser = logOutUser;
