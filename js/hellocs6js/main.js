
"use strict";

var Animal = require("./animal.js").Animal;
var Cat = require("./cat.js").Cat;
var Dog = require("./dog.js").Dog;
var Bird = require("./bird.js").Bird;


// Do some work on the Animal base class
let animal = new Animal("Lassie");
console.log("Created animal named: " + animal.name);

animal.name = "Bingo";
console.log("Renamed animal to: " + animal.name);

// Do some work on the derived classes
let cat = new Cat("Garfield");
cat.talk();

let dog = new Dog("Jock");
dog.talk();

// Do some work on a bad derived class
// that forgot to implement an interface declared
// in the base class.
// This should throw an error.
let bird = new Bird("Polly");
bird.talk();
