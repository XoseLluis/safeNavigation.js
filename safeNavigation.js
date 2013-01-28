//	deploytonenyures.blogspot.com

//safe navigation functionality inspired by groovy's ?. operator
//for safeGet and safeInvoke, it will return undefined if the any element in the chain to navigate to that property is missing
//safeSet is inspired by .Net's ElasticObject, it will create all the needed elements in the chain of properties if they're missing
//namespace function fits well here as it's just based on safeGet and safeSet

function isNode(){
	return typeof module !== 'undefined' && module.exports;
}


function safeGet(obj, propertiesStr){
	if (!obj || !propertiesStr)
		return undefined;
	
	var properties = propertiesStr.split(".");
	var curObj = obj;
	while(curObj && properties.length){
		var curProp = properties.shift();
		curObj = curObj[curProp];
	}
	return curObj;
}
safeGet.addToPrototype = function(){
	Object.prototype.safeGet = function(propertiesStr){
		return safeGet(this, propertiesStr);
	};
};

function safeInvoke(obj, methodStr){
	var _arguments = [].slice.call(arguments, 2);
	if (!obj || !methodStr)
		return undefined;
	var method = safeGet(obj, methodStr);
	if (!method)
		return undefined;
		
	var chainToThisArr = methodStr.split(".");
	chainToThisArr.pop();
	var _this = safeGet(obj, chainToThisArr.join("."));
	
	return method.apply(_this, _arguments);	

}
safeInvoke.addToPrototype = function(){
	Object.prototype.safeGet = function(propertiesStr){
		return safeGet(this, propertiesStr);
	};
};

function safeSet(obj, propertiesStr, value){
	if (!obj || !propertiesStr)
		return;
	
	var properties = propertiesStr.split(".");
	var curObj = obj;
	for (var i=0; i<properties.length-1; i++){
		if (!curObj[properties[i]]){
			curObj[properties[i]] = {};
		}
		curObj = curObj[properties[i]];
	}
	curObj[properties[i]] = value;
}
safeSet.addToPrototype = function(){
	Object.prototype.safeSet = function(propertiesStr, value){
		return safeSet(this, propertiesStr, value);
	};
};

var nameSpace = (function _nameSpaceFactory(){
	//we have all this extra "layer" to determine the correct root for the namespace
	//indeed, we should not be much concerned about node, as the namespacing is rarely used there
	var root;
	if (typeof window == "object"){
		root = window;
	}
	else if (isNode()){
			root = GLOBAL;
	}
	else
		console.log("we don't know the global object for this environment, namespace function won't work");
		
	return function _nameSpace(nameSpaceStr){
		if (!safeGet(root, nameSpaceStr))
			safeSet(root, nameSpaceStr, {});
	};
}());

if (isNode()){
	exports.nameSpace = nameSpace;
	exports.safeSet = safeSet;
	exports.safeGet = safeGet;
	exports.safeInvoke = safeInvoke;
}
