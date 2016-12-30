
"use strict";

var Animal = require("./animal.js").Animal;

// This class showcases class inheritance
class Dog extends Animal {
	talk() {
		console.log(this.name + " says Bark!");
	}
}

exports.Dog = Dog
