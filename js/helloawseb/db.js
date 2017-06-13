
// This module acts like a mock database for
// storing data.

var usersMap = new Map();

function getUsers() {
	return JSON.stringify([...usersMap]);
}

function logUsers() {
	console.info("Users:");
	var users = getUsers();
	console.info(users);
}

function userExists(email) {
	return usersMap.has(email);
}

function signUpUser(email, firstName, lastName, phone, password) {
	var status = "OK";

	if(userExists(email)) {
		status = "User already signed up.";
		console.error("Failed to sign up user with email " + email + ". " + status);
		return [false, status];
	}

	usersMap.set(email, { "firstName" : firstName, "lastName" : lastName, "phone" : phone, "password" : password, "loggedIn" : false});
	console.info("Signed up user with email " + email);
	return [true, status];
}

function removeUser(email) {
	var status = "OK";

	if(!userExists(email)) {
		usersMap.delete(email);
		status = "User is not signed up";
		console.error("Failed to remove user with email " + email + ". " + status);
		return [false, status];
	}

	return [true, status];
}

function logInUser(email, password) {
	var status = "OK";

    if(!userExists(email)) {
		status = "User is not signed up";
		console.error("Failed to log in user with email " + email + ". " + status);
		return [false, status];
	}

	if(password != usersMap.get(email).password) {
		status = "Incorrect password";
		console.error("Failed to log in user with email " + email + ". " + status);
		return [false, status];
	}

	usersMap.get(email).loggedIn = true;
	console.info("Logged in user with email " + email);
	return [true, status];
}

function logOutUser(email, password) {
	var status = "OK";

	if(!userExists(email)) {
		status = "User is not signed up";
		console.error("Failed to log out user with email " + email + ". " + status);
		return [false, status];
	}

	if(password != usersMap.get(email).password) {
		status = "Incorrect password";
		console.error("Failed to log out user with email " + email + ". " + status);
		return [false, status];
	}

	usersMap.get(email).loggedIn = false;
	console.info("Logged out user with email " + email);
	return [true, status];
}

// for kicks and giggles, let's start out with a few users
signUpUser("otis.milo@email.com", "Otis", "Milo", "111-111-1111", "password");
signUpUser("daisy.duke@email.com", "Daisy", "Duke", "222-222-2222", "password");
logUsers();

module.exports.logUsers = logUsers;
module.exports.getUsers = getUsers;
module.exports.userExists = userExists;
module.exports.signUpUser = signUpUser;
module.exports.logInUser = logInUser;
module.exports.logOutUser = logOutUser;
