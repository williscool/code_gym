// https://en.wikipedia.org/wiki/Primality_test#Simple_methods
// aka trial division

// inspired by: http://www.thatjsdude.com/interview/js1.html#isPrime
function Naive(n) {
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

module.exports =  {
  naive: Naive 
};
