
var Dog = {
	name: "Dog",
    sound: "bark",
    talk: function () {
        console.log(this.name + " says " + this.sound);
    }
}

exports.Dog = Dog
