import dsalgo from '../../utilities';
/**
 * https://en.wikipedia.org/wiki/Dynamic_programming#Fibonacci_sequence
 *
 * https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * Obviously calculates the nth fibbonaci number
 *
 * Every persons favorite intro to dynamic programming algorithm
 *
 * Bruh this is one of the easiest algorithms ever I swear...
 *
 * The first number is 0... the second number is 1
 *
 * And every other number after that... is the addition of the previous 2 numbers.
 *
 * DONT TRY TO COMPLICATE IT MORE THAT. I SWEAR ITS NOT MORE COMPLICATED... IT LITTERALLY THAT EASY
 *
 * dont be like. nah their's gotta be more to this... no, no their isn't
 *
 * thats literally all there is.
 *
 * What is more interesting is optimizing the calculations... this module explores that
 *
 * Explantion of dp in general and the log(n) fib http://otfried.org/courses/cs300/notes/dynamic-programming.pdf
 *
 * Great video explanation : https://www.youtube.com/watch?v=P8Xa2BitN3I
 *
 * @module nthFibbonaacci
 */

/**
 * The worse time and space complexity version of the fibbonacci algorithm
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(n) [cuz stack frames]
 *
 * https://www.quora.com/What-is-the-space-complexity-of-a-recursive-Fibonacci-function
 *
 * @param {number} n fib number to calculate
 * @returns {number} nth fibonacci number
 */
function naiveRecursive(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return naiveRecursive(n - 1) + naiveRecursive(n - 2);
}

const cache = [0, 1];
/**
 * Here save exponetial time in the recusive solution by caching the result to subproblems
 *
 * Still using O(n) extra space
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * @param {number} n fib number to calculate
 * @returns {number} nth fibonacci number
 */
function memoizedRecursive(n) {
  if (!dsalgo.utils.isDefined(cache[n])) {
    cache[n] = memoizedRecursive(n - 1) + memoizedRecursive(n - 2);
  }

  return cache[n];
}

/**
 * In interative fib
 *
 * We observe that we can replace the recursion with a simple loop
 * that fills the array in order, instead of relying on recursion
 *
 * @param {number} n fib number to calculate
 * @returns {number} nth fibonacci number
 */
function iterative(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  const sequence = [0, 1];

  for (let i = 2; i <= n; i += 1) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }

  return sequence[n];
}

/**
 * Unless we need to calculate a list of all fib up to n
 *
 * We can significantly reduce the space requirements of our algorithm by maintaining only the two newest fib number
 *
 * somewhat inspired by:
 *
 * https://github.com/mgechev/javascript-algorithms/blob/master/src/others/fibonacci.js
 * http://stackoverflow.com/questions/13440020/big-o-for-various-fibonacci-implementations
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number} n fib number to calculate
 * @returns {number} nth fibonacci number
 */
function iterativeConstantSpace(n) {
  let n1 = 0;
  let n2 = 1;
  let next;


  for (let i = 1; i <= n; i += 1) {
    next = n1 + n2;
    n1 = n2;
    n2 = next;
  }

  return n1;
}

export default {
  naive_recursive: naiveRecursive,
  memoized_recursive: memoizedRecursive,
  iterative,
  iterative_constant_space: iterativeConstantSpace,
};
