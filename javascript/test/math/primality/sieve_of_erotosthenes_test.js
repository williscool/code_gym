var assert = require('assert');
var Sieve = require('../../../math/primality/sieve_of_erotosthenes.js');

// lightly inspired by : https://github.com/mgechev/javascript-algorithms/blob/master/test/primes/sieve-of-eratosthenes.spec.js
describe("Sieve of Eratosthenes",function(){
  describe("should calculate the primes", function(){
    it("under 16", function(){
      assert.deepEqual(Sieve(16), [2,3,5,7,11,13]);
    });
    // https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Example
    it("under 30", function(){
      assert.deepEqual(Sieve(30) , [2,3,5,7,11,13,17,19,23,29]);
    });
  });
});
