
// This module acts like a mock database for
// storing data.

var usersMap = new Map();
addUser("otis.milo@email.com", "bla");
addUser("daisy.duke@email.com", "bla");

logUsers();

function logUsers() {
	console.log("Users:");
	usersMap.forEach(function(value, key) {
	  console.log(key + ": " + JSON.stringify(value));
	});
}

function users() {
	return JSON.stringify(usersMap);
}

function userExists(email) {
	return usersMap.has(email);
}

function addUser(email, password) {
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

module.exports.logUsers = logUsers;
module.exports.users = users;
module.exports.userExists = userExists;
module.exports.addUser = addUser;
module.exports.logInUser = logInUser;
module.exports.logOutUser = logOutUser;
