// https://en.wikipedia.org/wiki/Dynamic_programming#Fibonacci_sequence
var dsalgo = require('../../utilities.js').dsalgo;

function naiveRecursive(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return naiveRecursive(n - 2) + naiveRecursive(n - 1);
}

function memoizedRecursive(n) {
  var cache = [0, 1];

  if (!dsalgo.utils.isDefined(cache[n])) {
    cache[n] = memoizedRecursive(n - 2) + memoizedRecursive(n - 1);
  }

  return cache[n];
}

function iterative(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  var sequence = [0, 1];

  for (var i = 2; i <= n; i++) {
    sequence[i] = sequence[i - 2] + sequence[i - 1];
  }

  return sequence[n];
}

// somewhat inspired by
// https://github.com/mgechev/javascript-algorithms/blob/master/src/others/fibonacci.js
// http://stackoverflow.com/questions/13440020/big-o-for-various-fibonacci-implementations
function iterativeConstantSpace(n) {
  var n1 = 0;
  var n2 = 1;
  var temp;


  for (var i = 1; i <= n; i++) {
    temp = n1 + n2;
    n1 = n2;
    n2 = temp;
  }

  return n1;
}

// Great explantion of log(n) fib http://otfried.org/courses/cs300/notes/dynamic-programming.pdf

module.exports = {
  naive_recursive: naiveRecursive,
  iterative: iterative,
  iterative_constant_space: iterativeConstantSpace,
  memoized_recursive: memoizedRecursive
};
