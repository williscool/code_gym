// technically this is the same as doing a power set of the characters of a string
// minus the empty one
//
// http://introcs.cs.princeton.edu/java/23recursion/Combinations.java.html

var dsalgo = require('../utilities.js').dsalgo;

function recursiveStringCombinations(prefix, string, k){

  var combinations = [prefix];

  for(var i = 0; i < string.length; i++) {
    combinations = combinations.concat( recursiveStringCombinations( prefix + string[i], string.slice(i+1) , k));
  }
  
  return combinations;
}

function recStringKCombs(string, prefix, k){

  var combinations = [];

  if(k === 0){
    combinations = combinations.concat([prefix]);
    return combinations; 
  } else {
    for(var i = 0; i < string.length; i++) {
      combinations = combinations.concat( recStringKCombs( string.slice(i+1), prefix + string[i] , k - 1));
    }
  }

  return combinations;
}

module.exports = {
  recursive: function (str, k) { 

    if(dsalgo.utils.isDefined(k)) {
      return recStringKCombs(str, "", k) ;
    }

    return recursiveStringCombinations("", str) ;
  }
};
