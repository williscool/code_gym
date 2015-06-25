// http://en.wikipedia.org/wiki/Permutation
// https://github.com/josdejong/mathjs/blob/master/lib/function/probability/permutations.js
//
// https://www.khanacademy.org/math/precalculus/prob_comb/combinatorics_precalc/v/permutation-formula
//
var factorial = require('../factorial.js');
var dsalgo = require('../../utilities.js').dsalgo;

// TODO: this function should throw an error is k is higher than n
// https://github.com/josdejong/mathjs/blob/master/lib/function/probability/combinations.js#L47
module.exports = function(n, k) {
  
  if(!dsalgo.utils.isDefined(k)) return factorial(n);

  if(k === 0) return 0;

  var result = n;
  var iteration = 1;

  for(var i = k - 1; i > 0; i-- ){
    result = result * (n - iteration); 
    iteration++;
  }
  
  return result;
}
