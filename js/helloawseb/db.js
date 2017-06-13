
// This module acts like a mock database for
// storing data.

var usersMap = new Map();

function getUsers() {
	return JSON.stringify([...usersMap]);
}

function logUsers() {
	console.log("Users:");
	var users = getUsers();
	console.log(users);
}

function userExists(email) {
	return usersMap.has(email);
}

function signUpUser(email, firstName, lastName, phone, password) {
	if(!userExists(email)) {
		usersMap.set(email, { "firstName" : firstName, "lastName" : lastName, "phone" : phone, "password" : password, "loggedIn" : false});
		console.log("Signed up user with email " + email);
		return true;
	} else {
		console.log("User with email " + email + " already signed up. Unable to sign up again.");
		return false;
	}
}

function removeUser(email) {
	console.log("Removed user with email " + email);
	usersMap.delete(email);
}

function logInUser(email, password) {
    if(!userExists(email)) {
		console.log("Failed to log in user with email " + email + ". User is not signed up.");
		return false;
	}

	if(password != usersMap.get(email).password) {
		console.log("Failed to log in user with email " + email + ". Incorrect password.");
		return false;
	}

	usersMap.get(email).loggedIn = true;
	console.log("Logged in user with email " + email);
	return true;
}

function logOutUser(email) {
	if(!userExists(email)) {
		console.log("Failed to log out user with email " + email + ". User is not signed up.");
		return false;
	}

	usersMap.get(email).loggedIn = false;
	console.log("Logged out user with email " + email);
	return true;
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
