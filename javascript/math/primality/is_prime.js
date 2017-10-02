/**
 * https://en.wikipedia.org/wiki/Primality_test#Simple_methods
 *
 * why 0 isnt prime
 * http://mathforum.org/library/drmath/view/57036.html
 *
 * why 1 isn't prime
 * https://www.youtube.com/watch?v=IQofiPqhJ_s
 *
 * also negative numbers either are or arent depending on context. I'm saying they arent
 *
 * https://primes.utm.edu/notes/faq/negative_primes.html
 * http://math.stackexchange.com/questions/1002459/do-we-have-negative-prime-numbers
 * http://www.quora.com/Why-dont-we-have-negative-prime-numbers
 *
 * @module isPrime
 */

/**
 * Dead simple. Literally check every number 2 and greater less than n
 *
 * and see if n is evenly divisble by them
 *
 * inspired by: http://www.thatjsdude.com/interview/js1.html#isPrime
 *
 * @param {number} n number to check if prime
 * @returns {boolean} is number prime?
 */
function naiveTrialDivision(n) {
  if (n < 2) return false;

  let divisor = 2;

  while (n > divisor) {
    if (n % divisor === 0) {
      return false;
    }
    divisor += 1;
  }

  return true;
}

/**
 * Basically the improvements to this test boil down to the intuition that
 *
 * if you can't evenly divide the number n we are testing by 2...
 *
 * clearly you only need to look at the numbers lower than half of n's value.
 *
 * If you can't evenly divide n by 3 you only need to test numbers under 1/3 of n's value... and so on and so forth
 *
 * from the wikipedia article:
 *
 * "The algorithm can be improved further by observing that all primes are of the form 6k ± 1, with the exception of 2 and 3.
 *
 * This is because all integers can be expressed as
 *
 * (6k + i) for some integer k and for i = -1, 0, 1, 2, 3, or 4; 2 divides (6k + 0), (6k + 2), (6k + 4); and 3 divides (6k + 3).
 *
 * So a more efficient method is to test if n is divisible by 2 or 3, then to check through all the numbers of form 6k ± 1 <= sqrt(n).""
 *
 * inspired by:
 * http://www.thatjsdude.com/interview/js1.html#primeExtra
 * https://github.com/mgechev/javascript-algorithms/blob/master/src/primes/is-prime.js
 * https://en.wikipedia.org/wiki/Primality_test#Pseudocode
 *
 * @param {number} n number to check if prime
 * @returns {boolean} is number prime?
 */
function optimizedTrialDivision(n) {
  if (n < 2) return false;

  if (n <= 3) return true;

  if ((n % 2 === 0) || (n % 3 === 0)) return false;

  // divisor * divisor <= n
  let divisor = 5;
  const limit = Math.floor(Math.sqrt(n));

  while (divisor <= limit) {
    if ((n % divisor === 0) || (n % (divisor + 2) === 0)) return false;
    divisor += 6;
  }

  return true;
}

// more versions
// https://www.topcoder.com/community/data-science/data-science-tutorials/primality-testing-non-deterministic-algorithms/
// https://en.wikipedia.org/wiki/Primality_test#Probabilistic_tests
// https://en.wikipedia.org/wiki/Primality_test#Fast_deterministic_tests

export default {
  naive_trial_division: naiveTrialDivision,
  optimized_trial_division: optimizedTrialDivision,
};
