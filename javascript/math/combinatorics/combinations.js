// http://en.wikipedia.org/wiki/Combination
// "In mathematics, a combination is a way of selecting items from a collection, such that (unlike permutations) the order of selection does not matter."
//
// https://www.khanacademy.org/math/precalculus/prob_comb/combinations/v/combination-formula
var permutations = require('./permutations.js').without_repetition;
var factorial = require('../factorial.js');

// NOTE: http://math.stackexchange.com/questions/551920/what-is-zero-choose-one/551926#551926
module.exports = function(n, k) {
  if(n === 0 && k === 0) return 1;
  if(k === 0) return 0;
  return permutations(n,k) / factorial(k);
}
