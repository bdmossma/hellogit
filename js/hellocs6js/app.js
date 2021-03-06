
"use strict";

var Animal = require("./animal").Animal;
var Cat = require("./cat").Cat;
var Dog = require("./dog").Dog;
var Bird = require("./bird").Bird;


// Do something with the Animal base class
let animal = new Animal("Lassie");
console.log("Created animal named: " + animal.name);

animal.name = "Bingo";
console.log("Renamed animal to: " + animal.name);

// Do something with the derived classes
let cat = new Cat("Garfield");
cat.talk();

let dog = new Dog("Jock");
dog.talk();

// Do something withi a bad derived class
// that forgot to implement an interface declared
// in the base class.
// This should throw an error.
let bird = new Bird("Polly");
bird.talk();
