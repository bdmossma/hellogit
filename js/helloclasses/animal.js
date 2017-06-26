
"use strict";

// This class showcases class inheritance
 class Animal {
    constructor(name) {
        // ES6 classes have Pythonic privacy:
        // [1] Note that the leading underscore is naming covention only and is not
        // enforced by the language. These could be accessed from outside of the
        // class, and the underscore merely suggests to the client to
        // please do not do that.
        // [2] Getter and setter methods are typically not used.
        this.name = name;
    }
    talk() {
      // ES6 interfaces are Pythonic:
      // [1] There are no pure virtual methods like in C++ nor
      // an "interface" keyword as in Java.
      // [2] In ES6, just like in Python, interfaces are simiulated by making the base class
      // methods simply throw an exception if they are invoked, i.e. haven't
      // been overridden in the derived class.
    	throw { name: "NotImplementedError", message: "Derived classes must implement this method." };
    }
};

exports.Animal = Animal
