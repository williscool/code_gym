// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

module.exports = function(limit) {

  var primes = [];
  // 1. Create a list of consecutive integers from 2 through n: (2, 3, 4, ..., n).
  // false === not prime
  // true === prime
 
  // 0 and 1 are not prime
  var sieve = [false,false];

  var k = 2;

  for(var i = 2; i <= limit; i++) {
     sieve[i] = true;
  }

  // 2. Initially, let p equal 2, the first prime number. 
  // 3. Starting from p, enumerate its multiples by counting to n in increments of p, and mark them in the list (these will be 2p, 3p, 4p, ... ; the p itself should not be marked).

  for(var p = 2; p * p <= limit; p++) {
    // 4. a Find the first number greater than p in the list that is not marked. If there was no such number, stop. 
    if(sieve[p] !== true) continue;

    // 4. b Otherwise, let p now equal this new number (which is the next prime), and repeat from step 3.
    //
    // m for multiple starting with the second multiple
    for(var m = 2 ; m <= limit ; m++) {
      sieve[m * p] = false;
    }

  }

  for(var i = 0; i <= limit ; i++) {
    if(sieve[i] === true) primes.push(i);
  }

  return primes;
};
