
var Cat = {
	name: "Cat",
    sound: "meow",
    talk: function () {
        console.log(this.name + " says " + this.sound);
    }
}

exports.Cat = Cat
