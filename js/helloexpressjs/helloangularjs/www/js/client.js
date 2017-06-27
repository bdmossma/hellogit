



// SimpleExpression <operand><operator><argument>
// This class roughly implements a template
// design pattern and is the base class in a class family
// that is intended to be subclassed and extended
// when creating new expressions.
class SimpleExpression {
	constructor(name) {
		this.name = name;
	}

	attributesHtml(attributes) {
		var attributesHtml = "";
		for(var [key, value] of attributes) {
			attributesHtml += key + '="' + value + '" ';
		}
		return attributesHtml;
	}

    // These are HTML builder methods that can be used as HTML helpers
	// by the template methods below (or by any derived class template methods
    // overriding those template methods)
	buildOperandHtml() {
		return '<button ng-click="removeItem(\'' + this.name + '\')">' + this.name + '</button>';
	}
	buildOperatorHtml(options) {
		var operatorHtml = '<select name="Operators">';
		for (var option in options) {
		    operatorHtml += '<option value=">">' + option + '</option>';
	    }
		operatorHtml += '</select>';
		return operatorHtml;
	}
	buildArgumentHtml(units, attributes) {
		var argumentHtml = '<input ' + this.attributesHtml(attributes) + '" style="width:75px" required>';
		argumentHtml += '<label> ' + units + '</label>';
		return argumentHtml;
	}

	// These 3 template methods together form a template for constructing
	// the simple expression
	operandHtml() {
		return this.buildOperandHtml();// default behavior
	}
	operatorHtml() {
		return this.buildOperatorHtml([">", "<", "==", ">=", "=<"]);//default behavior
	}
	argumentHtml() {
		// no default behavior
		throw { name: "NotImplementedError", message: "Derived classes must implement this method." };
	}

    // return the simple expression as html containing nested
	// widgets for operand, operator, and argument.
	// This is the heart of the template
	// design pattern.
	html() {
		var html = '<form id="' + this.name + '" name="' + this.name + '">';
		html += this.operandHtml();
		html += this.operatorHtml();
		html += this.argumentHtml();
		html += '</form>';
		return html;
	}
}
/*// angular js example for validating input without submitting
<form name="myForm">
<input name="myInput" type="number" ng-model="myInput" min="0.00" step=".01" required><label> degrees</label>
</form>

<p>The input's valid state is:</p>
<h1>{{myForm.myInput.$valid}}</h1>
*/

class Latitude extends SimpleExpression {
	constructor(degrees="", minutes="", seconds="") {
		super("Latitude");
		this.set(degrees, minutes, seconds);
	}

	set(degrees, minutes, seconds) {
		this.degrees = degrees;
		this.minutes = minutes;
		this.seconds = seconds;
	}

	argumentHtml() {
		var argumentHtml = "";
		argumentHtml += super.buildArgumentHtml("degrees", [["value",this.degrees], ["placeholder","degrees"],["min","-180"], ["max","180"]]);
		argumentHtml += super.buildArgumentHtml("minutes", [["value",this.minutes], ["placeholder","minutes"],["min","0"], ["max","60"]]);
		argumentHtml += super.buildArgumentHtml("seconds", [["value",this.seconds], ["placeholder","seconds"],["min","0"], ["max","60"]]);
		return argumentHtml;
	}
}


var lat = new Latitude("180", "30", "60");// input value wins
console.log(lat.html());

var lat2 = new Latitude();// inpnut placeholder wins
console.log(lat2.html());



window.onload = function() {

	sendJsonRequest();

	// invoked send method every 1 seconds
    setInterval(sendJsonRequest, 1000);
}

// This is AJAX. This method sends a JSON request to
// an API that is hosted in the server-side
// application.
function sendJsonRequest() {
    httpRequest = new XMLHttpRequest();
    //The base URL (http://localhost:8080) is not required.
    var url = "/apis/json";
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var jsonResponse = JSON.parse(httpRequest.responseText);
            // Append the JSON response to an element
            // in the HTML document
            var element = document.getElementById("playground");
            element.innerHTML = element.innerHTML + "<br/>" + "jsonResponse: " + JSON.stringify(jsonResponse);
        }
    }
    httpRequest.send();
}
