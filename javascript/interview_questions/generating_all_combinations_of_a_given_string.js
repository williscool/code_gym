// technically this is the same as doing a power set of the characters of a string
// minus the empty one
//
// http://introcs.cs.princeton.edu/java/23recursion/Combinations.java.html

var dsalgo = require('../utilities.js').dsalgo;

function recursiveStringCombinations(prefix, string){

  var combinations = [prefix];


  for(var i = 0; i < string.length; i++) {
    combinations = combinations.concat( recursiveStringCombinations( prefix + string[i], string.slice(i+1)));
  }
  
  return combinations;
}

module.exports = {
  recursive: function (str) { 
    return recursiveStringCombinations("", str) ;
  }
};
