// https://www.interviewcake.com/question/ruby/recursive-string-permutations
// http://stackoverflow.com/questions/4240080/generating-all-permutations-of-a-given-string/4240323#4240323
// http://www.ericleschinski.com/c/java_permutations_recursion/

var dsalgo = require('../utilities.js').dsalgo;

function recursiveStringPermutations(prefix, string){
  var len = string.length;
  
  if(len === 0) return [prefix];
  
    var permutations = [];
  
  for(var i = 0; i < len; i++) {
    permutations = permutations.concat( recursiveStringPermutations( prefix + string[i], string.slice(0 , i) + string.slice(i+1 , len) ));
  }
  
  return permutations;
}

module.exports = {
  recursive: function (str, len) { return recursiveStringPermutations("", str, len) ;}
};
