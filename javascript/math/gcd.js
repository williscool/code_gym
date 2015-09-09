// https://en.wikipedia.org/wiki/Euclidean_algorithm
// inspired by: http://introcs.cs.princeton.edu/java/23recursion/Euclid.java.html

function gcd(p, q) {

  // if(!(p > q)) return Error("p must be greater than q");

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()
  // dear God javascript why? Just why why why?
  // long story short javascript does not have a modulo operator just a remainder
  // alas division by 0 is NaN so we have this hack
  // if(p == 0) return q;
  if (q === 0) return p;
  return gcd(q, p % q);
}

module.exports = gcd;
