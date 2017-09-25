/**
 * In mathematics, the sieve of Eratosthenes is a simple, ancient algorithm for finding all prime numbers up to any given limit.
 *
 * Its basically a fancy trial division that finds all primes up to the input
 *
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 *
 * @param {any} limit
 * @returns {array}
 * @module SieveOfEratosthenes
 */
export default function SieveOfEratosthenes(limit) {
  const primes = [];
  // 1. Create a list of consecutive integers from 2 through n: (2, 3, 4, ..., n).

  // false === not prime
  // true === prime

  // 0 and 1 are not prime
  const sieve = [false, false];

  let i;

  for (i = 2; i <= limit; i += 1) {
    sieve[i] = true;
  }

  // 2. Initially, let p equal 2, the first prime number.
  // 3. Starting from p, enumerate its multiples by counting to n in increments of p,
  // and mark them in the list (these will be 2p, 3p, 4p, ... ; the p itself should not be marked as false).

  for (let p = 2; p * p <= limit; p += 1) {
    // 4. a Find the next mutltiple of p greater than p in the list that is not marked as false.
    if (sieve[p] === true) {
      // 4. b let p now equal this new number (which is the next prime), and repeat from step 3.
      //
      // m for multiples of p starting with the second multiple (the first is actually prime)
      for (let m = 2; m <= limit; m += 1) {
        sieve[m * p] = false;
      }
    }
  }

  // 5. iterate over the list of integers to find which numbers were prime
  for (i = 0; i <= limit; i += 1) {
    if (sieve[i] === true) primes.push(i);
  }

  return primes;
}
