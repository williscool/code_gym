// https://www.interviewcake.com/question/ruby/recursive-string-permutations
// http://stackoverflow.com/questions/4240080/generating-all-permutations-of-a-given-string/4240323#4240323
// http://www.ericleschinski.com/c/java_permutations_recursion/
//
// http://javabypatel.blogspot.in/2015/08/print-all-combinations-of-string-of-length-k.html

var dsalgo = require('../utilities.js').dsalgo;

function recursiveStringPermutations(prefix, string, stop){

  var len = string.length;

  if(len === stop) return [prefix];
  
  var permutations = [];
  
  for(var i = 0; i < len; i++) {
    permutations = permutations.concat( recursiveStringPermutations( prefix + string[i], string.slice(0 , i) + string.slice(i+1 , len) , stop));
  }
  
  return permutations;
}

module.exports = {
  recursive: function (str, len) { 
    var stop = 0;
    if(dsalgo.utils.isDefined(len)) stop = len - 1;
    return recursiveStringPermutations("", str, stop) ;
  }
};
