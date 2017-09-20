// http://en.wikipedia.org/wiki/Combination
// "In mathematics, a combination is a way of selecting items from a collection, such that (unlike permutations) the order of selection does not matter."
//
// https://www.khanacademy.org/math/precalculus/prob_comb/combinations/v/combination-formula
var permutations = require('./permutations.js').without_repetition;
var factorial = require('../factorial.js').default.count_up_iterative;

// NOTE: http://math.stackexchange.com/questions/551920/what-is-zero-choose-one/551926#551926
function withoutRep(n, k) {
  if (n === 0 && k === 0) return 1;
  if (k === 0) return 0;
  return permutations(n, k) / factorial(k);
}

/// combo with_repetition how do they work? https://www.youtube.com/watch?v=ZcSSI6VY1kM
function withRep(n, k) {
  if (n === 0 && k === 0) return 1;
  return withoutRep(n + k - 1, k);
}

module.exports = {
  without_repetition: withoutRep,
  with_repetition: withRep
};
