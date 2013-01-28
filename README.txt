SafeNavigate.js provides safe deep access to properties (read, write and invokation), expressed as strings:

safeGet(person, "address.country.capital");

safeGet and safeInvoke are inspired by groovy's ?. operator
they'll return undefined if the any element in the chain to that property is missing

safeSet is inspired by .Net's ElasticObject, it will create all the needed elements in the chain of properties if they're missing

I've also include here a namespace function (it seems to fit quite well here as it's just based on safeGet and safeSet)

some samples:

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
	
console.log("the capital of my country is: " + safeGet(person, "country.capital.name"));

console.log(safeInvoke(person, "sayBye")); //returns undefined
console.log(safeInvoke(person, "country.sayInfo", "parameter 1"));

safeSet(person, "country.capital.population", 200000); //updates the value
console.log("the capital's population is: " + p.country.capital.population);
safeSet(person, "country.capital.neighbourhoods", 15); //creates the new neighbourhoods property
console.log("the capital has these neighbourhoods: " + p.country.capital.neighbourhoods);
