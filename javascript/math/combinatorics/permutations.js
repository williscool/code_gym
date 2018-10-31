import FactorialTypes from '../factorial';
import dsalgo from '../../utilities';

/**
 * Compute the number of ways of obtaining an ordered subset of `k` elements from a set of `n` elements.
 *
 * http://en.wikipedia.org/wiki/Permutation
 *
 * https://www.mathsisfun.com/combinatorics/combinations-permutations.html
 *
 * https://github.com/josdejong/mathjs/blob/master/lib/function/probability/permutations.js
 *
 * https://www.khanacademy.org/math/precalculus/prob_comb/combinatorics_precalc/v/permutation-formula
 *
 * https://betterexplained.com/articles/easy-permutations-and-combinations/
 *
 * @module Permutations
 */
const factorial = FactorialTypes.count_up_iterative;

/**
 * Permutations with repetition
 *
 * (often refered to as with replacement which I think is a poor choice of words and horribly confusing in this context)
 *
 * These are the easiest to calculate.
 *
 * When a thing has n different types ... we have n choices each time!
 *
 * We are doing that k times... thus n ^ k
 *
 * @param {number} n number of elements
 * @param {number} k # of subset of n elements to choose
 * @returns {number} number of possible permutations
 */
function withRep(n, k) {
  return n ** k;
}

/**
 * In permutations without repetition, we have to reduce the number of available choices each time.
 *
 * If we are not taking a subset k each time we can simply return `factorial(n)`
 *
 * If we a taking k... we want to remove the factorial of the remaining items we do so mathematically like so
 *
 * n!/(n - k)!
 *
 * @param {number} n number of elements
 * @param {number} k # of subset of n elements to choose
 * @returns {number} number of possible permutations
 */
function withoutRep(n, k) {
  if (!dsalgo.utils.isDefined(k)) return factorial(n);

  if (k > n) {
    throw new TypeError('second argument k must be an integer less than or equal to n');
  }

  return Math.floor(factorial(n) / factorial(n - k));
}

/**
 * There are several performance enhancements and improvements you'll see to the calculation
 *
 * of permutations without replacementmet in the wild
 *
 * discussed in this thread https://github.com/josdejong/mathjs/issues/134#issuecomment-3329019
 *
 * in the context of combinations but the optimized code for permutations with the same notions are used in math.js as well
 *
 * Simply put instead of calculating n and n - k's factorial's seperately
 *
 * then divide the former by the later
 *
 * calculate them at the same time
 *
 * with a for loop that runs from (n - k) + 1 to n while multiplying the result.
 *
 * @param {number} n number of elements
 * @param {number} k # of subset of n elements to choose
 * @returns {number} number of possible permutations
 */
function withoutRepOptimized(n, k) {
  if (!dsalgo.utils.isDefined(k)) return factorial(n);

  if (k > n) {
    throw new TypeError('second argument k must be an integer less than or equal to n');
  }

  let result = 1;

  for (let i = (n - k) + 1; i <= n; i += 1) {
    result *= i;
  }

  return result;
}

export default {
  with_repetition: withRep,
  without_repetition: withoutRep,
  without_repetition_optimized: withoutRepOptimized,
};
