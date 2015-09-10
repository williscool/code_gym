// http://en.wikipedia.org/wiki/Permutation
// https://github.com/josdejong/mathjs/blob/master/lib/function/probability/permutations.js
//
// https://www.khanacademy.org/math/precalculus/prob_comb/combinatorics_precalc/v/permutation-formula
//
var factorial = require('../factorial.js').count_up_iterative;
var dsalgo = require('../../utilities.js').dsalgo;

// TODO: this function should throw an error is k is higher than n
// https://github.com/josdejong/mathjs/blob/master/lib/function/probability/combinations.js#L47
function withoutRep(n, k) {

  if (!dsalgo.utils.isDefined(k)) return factorial(n);

  if (k === 0) return 0;

  var result = n;
  var iteration = 1;

  for (var i = k - 1; i > 0; i--) {
    result = result * (n - iteration);
    iteration++;
  }

  return result;
}

// https://www.mathsisfun.com/combinatorics/combinations-permutations.html
// with repetition (often refeered to as with replacement which I think is a poor choice of words and horribly confusing in this context)
function withRep(n, k) {
  return Math.pow(n, k);
}

module.exports = {
  without_repetition: withoutRep,
  with_repetition: withRep
};
