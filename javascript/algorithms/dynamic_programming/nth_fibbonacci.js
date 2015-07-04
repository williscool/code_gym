// https://en.wikipedia.org/wiki/Dynamic_programming#Fibonacci_sequence
function naive(n){
  if (n === 0) return 0;
  if (n === 1) return 1;
  return naive(n - 2) + naive(n - 1);
}

// want to do both iterative and recursive versions
// and of course memoized and not

module.exports = {
  naive: naive //,
//  memoized: Memoized 
};
