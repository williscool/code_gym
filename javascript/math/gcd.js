
/**
 * https://en.wikipedia.org/wiki/Euclidean_algorithm
 *
 * The greatest common divisor (gcd) of two positive integers is the largest integer that divides evenly into both of them.
 *
 * inspired by: http://introcs.cs.princeton.edu/java/23recursion/Euclid.java.html
 *
 * https://en.wikipedia.org/wiki/Greatest_common_divisor#Using_Euclid.27s_algorithm
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()
 *
 * if(!(p > q)) return Error("p must be greater than q");
 *
 * @module GCD
 */

/**
 * Recursive Euclidean Disvision for GCD
 *
 * @param {number} p first input number
 * @param {number} q second input number
 * @returns {number} greatest common divisor of the 2 inputs
 */
function recursive(p, q) {
  if (q === 0) return p;
  return recursive(q, p % q);
}

/**
 * Iterative Euclidean Disvision for GCD
 *
 * @param {number} p first input number
 * @param {number} q second input number
 * @returns {number} greatest common divisor of the 2 inputs
 */
// the param reassigns are kinda the point of the algorithm
function iterative(p, q) {
  while (q !== 0) {
    const temp = q;
    q = p % q; // eslint-disable-line no-param-reassign
    p = temp; // eslint-disable-line no-param-reassign
  }

  return p;
}

export default {
  recursive,
  iterative,
};
