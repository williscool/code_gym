import assert from 'assert';
import Sieve from '../../../math/primality/sieve_of_erotosthenes';

// lightly inspired by : https://github.com/mgechev/javascript-algorithms/blob/master/test/primes/sieve-of-eratosthenes.spec.js
describe('Sieve of Eratosthenes', () => {
  describe('should calculate the primes', () => {
    it('under 16', () => {
      assert.deepEqual(Sieve(16), [2, 3, 5, 7, 11, 13]);
    });
    // https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Example
    it('under 30', () => {
      assert.deepEqual(Sieve(30), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });
  });
});
