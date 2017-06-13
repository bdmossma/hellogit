
// This module acts like a mock database for
// storing data.

var usersMap = new Map();

// @returns Users as String
function getUsers() {
	return JSON.stringify([...usersMap]);
}

function logUsers() {
	console.info("Users:");
	var users = getUsers();
	console.info(users);
}

// @returns True|False
function userExists(email) {
	return usersMap.has(email);
}

// @returns [result, resultMsg]
function signUpUser(email, firstName, lastName, phone, password) {
	var resultMsg = "OK";

	if(userExists(email)) {
		resultMsg = "User already signed up.";
		console.error("Failed to sign up user with email " + email + ". " + resultMsg);
		return [false, resultMsg];
	}

	usersMap.set(email, { "firstName" : firstName, "lastName" : lastName, "phone" : phone, "password" : password, "loggedIn" : false});
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
signUpUser("otis.milo@email.com", "Otis", "Milo", "111-111-1111", "password");
signUpUser("daisy.duke@email.com", "Daisy", "Duke", "222-222-2222", "password");
logUsers();

// decide what to export from this module
// for use in other modules
module.exports.logUsers = logUsers;
module.exports.getUsers = getUsers;
module.exports.userExists = userExists;
module.exports.signUpUser = signUpUser;
module.exports.deleteUser = deleteUser;
module.exports.logInUser = logInUser;
module.exports.logOutUser = logOutUser;
