// https://en.wikipedia.org/wiki/Primality_test#Simple_methods

// inspired by: http://www.thatjsdude.com/interview/js1.html#isPrime
function naiveTrialDivision(n) {
  //
  // why 0 isnt prime
  // http://mathforum.org/library/drmath/view/57036.html
  //
  // why 1 isn't prime
  // https://www.youtube.com/watch?v=IQofiPqhJ_s
  //
  // also negative numbers either are or arent depending on context. I'm saying they arent
  //
  // https://primes.utm.edu/notes/faq/negative_primes.html
  // http://math.stackexchange.com/questions/1002459/do-we-have-negative-prime-numbers
  // http://www.quora.com/Why-dont-we-have-negative-prime-numbers

  if (n < 2) return false;
  
  var divisor = 2;

  while(n > divisor){
    if(n % divisor == 0) {
      return false;
    } else {
      divisor = divisor + 1;
    }
  }

  return true;
};

// inspried by http://www.thatjsdude.com/interview/js1.html#primeExtra
// https://github.com/mgechev/javascript-algorithms/blob/master/src/primes/is-prime.js
// https://en.wikipedia.org/wiki/Primality_test#Pseudocode
//
// basically the improvements to this test boil down to the intuition that if you can't evenly divide the number we are testing by 2. 
// clearly you only need to look at the numbers lower than half of its value. 
//
// If you can't evenly divide it by 3 you only need to test numbers under 1/3 of its value... and so on and so forth
//
// from the wikipedia article:
// The algorithm can be improved further by observing that all primes are of the form 6k ± 1, with the exception of 2 and 3. 
// This is because all integers can be expressed as (6k + i) for some integer k and for i = -1, 0, 1, 2, 3, or 4; 2 divides (6k + 0), (6k + 2), (6k + 4); and 3 divides (6k + 3). 
// So a more efficient method is to test if n is divisible by 2 or 3, then to check through all the numbers of form 6k ± 1 <= sqrt(n).
//
function optimizedTrialDivision (n) {
  
  if (n < 2) return false;

  if (n <= 3) return true;

  if( (n % 2 == 0) || (n % 3 == 0) ) return false;

  // divisor * divisor <= n
  var divisor = 5;
  var limit = Math.floor(Math.sqrt(n));

  while(divisor <= limit){
    if( (n % divisor == 0) || ( n % (divisor + 2) == 0) ) return false;
    divisor += 6;
  }
  
  return true;
}

// more versions 
// https://www.topcoder.com/community/data-science/data-science-tutorials/primality-testing-non-deterministic-algorithms/
// https://en.wikipedia.org/wiki/Primality_test#Probabilistic_tests
// https://en.wikipedia.org/wiki/Primality_test#Fast_deterministic_tests

module.exports = {
  naive_trial_division: naiveTrialDivision,
  optimized_trial_division: optimizedTrialDivision 
};
