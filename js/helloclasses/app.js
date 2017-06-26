
// This example app demonstrates javascript classes
// by using JSON instead of using
// ES6 javascript.  This is helpful as support for ES6 in
// front-end javascript (vs back-end nodejs) in browsers and
// hybrid mobile app frameworks limited.
// Obviously, this example is simulating classes, it is
// not demonstrating real classes, so inheritance and
// polymorphism are NOT supported.

var Cat = require("./cat").Cat;
var Dog = require("./dog").Dog;

var dog = Dog;
dog.name = "Bingo";
console.log("Renamed dog to: " + dog.name);
dog.talk();

let cat = Cat;
cat.talk();
