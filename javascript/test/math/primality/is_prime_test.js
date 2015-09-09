var assert = require('assert');
var isPrimeFns = require('../../../math/primality/is_prime.js');

Object.keys(isPrimeFns).forEach(function(key) {
  var isPrime = isPrimeFns[key];
  describe(key + " isPrime", function() {
    it("should calculate if a number is prime", function() {
      assert.equal(isPrime(0), false);
      assert.equal(isPrime(1), false); // because math https://primes.utm.edu/notes/faq/one.html 
      assert.equal(isPrime(2), true);
      assert.equal(isPrime(3), true);
      assert.equal(isPrime(4), false);
      assert.equal(isPrime(5), true);
      assert.equal(isPrime(6), false);
      assert.equal(isPrime(7), true);
      assert.equal(isPrime(8), false);
      // https://github.com/mgechev/javascript-algorithms/blob/master/test/primes/is-prime.spec.js
      assert.equal(isPrime(104743), true);
      assert.equal(isPrime(104744), false);
    });
  });
});
