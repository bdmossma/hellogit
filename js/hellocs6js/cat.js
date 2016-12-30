
"use strict";

var Animal = require("./animal.js").Animal;

// This class showcases class inheritance
class Cat extends Animal {
	talk() {
		console.log(this.name + " says Meow!");
	}
}

exports.Cat = Cat
