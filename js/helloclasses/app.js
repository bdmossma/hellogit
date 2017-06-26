
// This example app demonstrates javascript classes
// by using JSON instead of using
// ES6 javascript.  This is helpful as support for ES6 in
// front-end javascript (vs back-end nodejs) in browsers and
// hybrid mobile app frameworks limited.
// Obviously, this example is simulating classes, it is
// not demonstrating real classes, so inheritance and
// polymorphism are NOT supported.

var cat = require("./cat").Cat;
var dog = require("./dog").Dog;

// Note that cat and dog cannot be instantiated. They are already instantiated
// and they are singletons. After all, they're not really classes, rather they are
// objects right away -- they were instantiated as JSON objects as soon as we
// defined them in the cat.js and dog.js modules.
dog.name = "Bingo";
console.log("Renamed dog to: " + dog.name);
dog.talk();

cat.talk();
