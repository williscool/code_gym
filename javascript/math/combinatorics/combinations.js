import FactorialTypes from '../factorial';
import PermutationTypes from './permutations';
/**
 * "In mathematics, a combination is a way of selecting items from a collection,
 * such that (unlike permutations) the order of selection does not matter."
 *
 * http://en.wikipedia.org/wiki/Combination
 *
 * https://www.mathsisfun.com/combinatorics/combinations-permutations.html
 *
 * https://www.khanacademy.org/math/precalculus/prob_comb/combinations/v/combination-formula
 *
 * Important Note:
 *
 * Combinations are defined if and only if
 *
 * 0 <= k <= n
 *
 * otherwise its 0
 *
 * http://math.stackexchange.com/questions/551920/what-is-zero-choose-one/551926#551926
 * @module Combinations
 */

const factorial = FactorialTypes.count_up_iterative;
const permutations = PermutationTypes.without_repetition;

/**
 * In combinations with replacement we adjust our permutations formula to reduce it by how many ways the objects could be in order
 * (because we aren't interested in their order any more)
 *
 * if and only if
 *
 * 0 <= k <= n
 *
 * otherwise its 0
 *
 * also specialy case for 0 choose 0 ... there is always 1 way to do nothing lol
 *
 * https://math.stackexchange.com/a/2020891/237639
 *
 * @param {number} n number of elements
 * @param {number} k # of subset of n elements to choose
 * @returns {number} number of possible combinations
 */
function withoutRep(n, k) {
  if (k < 0 || k > n) return 0;
  if (n === 0 && k === 0) return 1;
  return permutations(n, k) / factorial(k);
}

/**
 * combo with_repetition how do they work? https://www.youtube.com/watch?v=ZcSSI6VY1kM
 *
 * another solid explaination
 *
 * https://math.stackexchange.com/questions/208377/combination-with-repetitions
 *
 * TODO: figure out why n - 1 thats the part I dont get. I get that you can use all numbers on each choice but why minus one?
 *
 * @param {number} n number of elements
 * @param {number} k # of subset of n elements to choose
 * @returns {number} number of possible combinations
 */
function withRep(n, k) {
  if (k < 0 || k > n) return 0;
  if (n === 0 && k === 0) return 1;
  return withoutRep(k + (n - 1), k);
}

export default {
  without_repetition: withoutRep,
  with_repetition: withRep,
};
