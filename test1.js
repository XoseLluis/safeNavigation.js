//	deploytonenyures.blogspot.com

if (typeof module !== 'undefined' && module.exports){
	safeNavitation = require("./safeNavigation");
	var safeSet = safeNavitation.safeSet;
	var safeGet = safeNavitation.safeGet;
	var safeInvoke = safeNavitation.safeInvoke;
	var nameSpace = safeNavitation.nameSpace;
}
//if running on the browser rather than node, safeGet, safeSet and nameSpace would have been defined at the global scope

function testSet(){
	var p = {};
	
	/*
	//this code is ugly...
	p.country = p.country || {};
	p.country.capital = p.country.capital || {};
	p.country.capital.name = "Uviéu";
	*/
	
	safeSet(p, "country.capital.name", "Uviéu");
	console.log("the capital of my country is: " + p.country.capital.name);

	safeSet(p, "country.capital.name", "Berlín");
	console.log("the capital of my country is: " + p.country.capital.name);
	
	safeSet.addToPrototype();
	
	var p2 = {};
	p2.safeSet("country.capital.name", "Uviéu");
	console.log("the capital of my country is: " + p2.country.capital.name);
}

function testGet(){
	var person = {
		name: "xuan",
		country: {
			name: "Asturies",
			capital: {
				name: "Uviéu",
				population: 1100000
			}
		}
	};

	/*
	//this code is ugly...
	if (person.country && person.country.capital && person.country.capital.name)
		console.log(person.country.capital.name);
	else
		console.log("undefined");
	*/
	
	console.log("the capital of my country is: " + safeGet(person, "country.capital.name"));
	console.log("the population of my country is: " + safeGet(person, "country.population"));

	safeGet.addToPrototype();

	console.log("the capital of my country is: " + person.safeGet("country.capital.name"));
	console.log("the population of my country is: " + person.safeGet("country.population"));
}

function testNameSpace(){
	//creates the namespace
	nameSpace("org.deployToNenyures.base");
	org.deployToNenyures.base.version = "0.0.1";
	console.log(org.deployToNenyures.base.version);
	
	//namespace already exists, so does nothing
	nameSpace("org.deployToNenyures.base");
	console.log(org.deployToNenyures.base.version);
}

function testInvoke(){
	var person = {
		name: "xuan",
		country: {
			name: "Asturies",
			capital: {
				name: "Uviéu",
				population: 1100000
			},
			sayInfo: function(extra){
				return "country: " + this.name + " - " + this.capital.name + " - " + extra;
			}
		},
		sayHi: function(){
			return "hi, I'm " + this.name;
		}
	};
	//I can't just use a safeGet and then invoke... I need a safeInvoke method
	//safeGet(person, sayBye)();
	console.log(safeInvoke(person, "sayBye"));
	console.log(safeInvoke(person, "country.sayInfo", "additionalInfo"));
	console.log(safeInvoke(person, "country.sayCities"));
}

console.log("- testing Get");
testGet();

console.log("--------------------");

console.log("- testing Set");
testSet();

console.log("--------------------");

console.log("- testing Invoke");
testInvoke();

console.log("--------------------");

console.log("- testing nameSpace");

testNameSpace();
