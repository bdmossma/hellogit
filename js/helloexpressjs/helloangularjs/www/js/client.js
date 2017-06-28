


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
		return '<button ng-click="remove(\'' + this.name + '\')">' + this.name + '</button>';
	}
	buildOperatorHtml(options) {
		var operatorHtml = '<select name="Operators">';
		options.forEach(
			function (option) {
		    	operatorHtml += '<option value=">">' + option + '</option>';
	    	}
		);
		operatorHtml += '</select>';
		return operatorHtml;
	}
	buildArgumentHtml(units, attributes) {
		var argumentHtml = '<input ';
		argumentHtml += this.attributesHtml([["style","width:50px;"]]);// default behavior
		argumentHtml += this.attributesHtml(attributes);// add custom behavior
		argumentHtml += '" required>';
		argumentHtml += '<label> ' + units + ' </label>';
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
		var html = '<form id="' + this.name + '" name="' + this.name + '" style="background-color:D3D3D3;height:30px;float:left">';
		html += this.operandHtml();
		html += this.operatorHtml();
		html += this.argumentHtml();
		html += '</form>';
		return html;
	}
}
// angular js example for validating input without submitting
//<form name="myForm">
//<input name="myInput" type="number" ng-model="myInput" min="0.00" step=".01" required><label> degrees</label>
//</form>
//<p>The input's valid state is:</p>
//<h1>{{myForm.myInput.$valid}}</h1>


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
		argumentHtml += super.buildArgumentHtml("degrees", [["value",this.degrees], ["placeholder","0"],["min","-180"], ["max","180"]]);
		argumentHtml += super.buildArgumentHtml("minutes", [["value",this.minutes], ["placeholder","0"],["min","0"], ["max","60"]]);
		argumentHtml += super.buildArgumentHtml("seconds", [["value",this.seconds], ["placeholder","0"],["min","0"], ["max","60"]]);
		return argumentHtml;
	}
}

var app = angular.module('myApp', []);
app.controller('myController', function($scope, $compile) {
    $scope.test = "Hello AngularJS";

	$scope.add = function(html) {
		var compiledHtml = $compile(html)($scope);//dynamically modify the html
		angular.element(document.getElementById("playground")).append(compiledHtml);
	}

	$scope.remove = function(name) {
		angular.element(document.getElementById(name)).remove();
	}

	var lat = new Latitude("180", "30", "60");// input value wins
	$scope.add(lat.html());

	var lat2 = new Latitude();// inpnut placeholder wins
    $scope.add(lat2.html());
});
