
// This module acts like a mock database for
// storing data.

var usersMap = new Map();

function getUsers() {
	var users = [];
	for (var [key, value] of usersMap.entries()) {
		users.push({ key : value });
	}
	return users;
}

function logUsers() {
	console.log("Users:");
	var users = getUsers();
	console.log(users);
}

function userExists(email) {
	return usersMap.has(email);
}

function signUpUser(email, password) {
	usersMap.set(email, { "password" : password, "loggedIn" : false});
}

function removeUser(email) {
	usersMap.delete(email);
}

function logInUser(email, password) {
    if(!userExists(email)) {
		return false;
	}

	if(password != usersMap.get(email).password) {
		return false;
	}

	usersMap.get(email).loggedIn = true;
	return true;
}

function logOutUser(email) {
	if(!userExists(email)) {
		return false;
	}

	if(password != usersMap.get(email).password) {
		return false;
	}

	usersMap.get(email).loggedIn = false;
	return true;
}

signUpUser("otis.milo@email.com", "bla");
signUpUser("daisy.duke@email.com", "bla");
logUsers();

module.exports.logUsers = logUsers;
module.exports.getUsers = getUsers;
module.exports.userExists = userExists;
module.exports.signUpUser = signUpUser;
module.exports.logInUser = logInUser;
module.exports.logOutUser = logOutUser;
