
"use strict";

var Animal = require("./animal.js").Animal;

// This class showcases class inheritance
class Bird extends Animal {
	// For kicks and giggles, let's say that we forgot to
	// implement the "talk" interface declared in
	// the "Animal" base class.
	//talk() {
	//	console.log(this.name + " says Chirp!");
	//}
}

exports.Bird = Bird
