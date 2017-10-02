/**
 * In mathematics, the factorial of a non-negative integer n, denoted by n!,
 * is the product of all positive integers less than or equal to n.
 *
 * this module calculates this for an input n in one of three ways
 *
 * https://en.wikipedia.org/wiki/Factorial
 *
 * @module Factorial
 */

/**
 * This implementation of factorial starts from n
 * and mulplies it by all integers less than n and greater than 0
 *
 * @param {number} n number to factorial
 * @returns {number} number factorialed
 */
function countDown(n) {
  if (n === 0) return 1;

  let result = n;

  for (let i = n - 1; i > 0; i -= 1) {
    result *= i;
  }

  return result;
}

/**
 * This implementation of factorial starts from 1
 * and mulplies it by all integers less than and equal to n
 *
 * https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/p/challenge-iterative-factorial
 *
 * @param {number} n number to factorial
 * @returns {number} number factorialed
 */
function countUp(n) {
  let result = 1;

  for (let i = 1; i <= n; i += 1) {
    result *= i;
  }

  return result;
}

/**
 * This is the recursive version of countdown factorial
 *
 * It starts with n and multiples it with value of a recursive call to n - 1
 *
 * With the value for the base case where n === 0 returning 1;
 *
 * @param {number} n number to factorial
 * @returns {number} number factorialed
 */
function recursive(n) {
  // base case:
  if (n === 0) {
    return 1;
  }

  // recursive case:
  return recursive(n - 1) * n;
}

export default {
  count_down_iterative: countDown,
  count_up_iterative: countUp,
  recursive,
};
