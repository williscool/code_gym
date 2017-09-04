var dsalgo = require('../../utilities.js').default;
// http://algorithms.tutorialhorizon.com/dynamic-programming-rod-cutting-problem/
// http://www.geeksforgeeks.org/dynamic-programming-set-13-cutting-a-rod/
//
// also beginning of Dynamic Programming chapter pg 360 in CLRS 3rd Edition
// which this comes from http://faculty.ycp.edu/~dbabcock/PastCourses/cs360/lectures/lecture12.html

// https://www.quora.com/How-does-one-obtain-the-recursive-formula-for-the-Rod-Cutting-Problem
function naiveRecursiveRodCutting(values, n)  {

  if (n === 0) return 0;

  var max = Number.NEGATIVE_INFINITY;

  for(var i = 0; i < n; i++) {
    max = Math.max(max, values[i] + naiveRecursiveRodCutting(values, n - i - 1));
  }

  return max;
}

// memoized version
function rRodCutting(values, n , memo)  {

  if (n === 0) return 0;
  if (dsalgo.utils.isDefined(memo[n])) return memo[n];

  var max = Number.NEGATIVE_INFINITY;

  for(var i = 0; i < n; i++) {
   memo[n] = Math.max(max, values[i] + rRodCutting(values, n - i - 1, memo));
  }

  return memo[n];
}

function iRodCutting(values) {
  // zero cut has zero value you
  var memo = [0];
  var n = values.length;

  var max;

  for(var i = 1; i <= n; i++) {
    max = Number.NEGATIVE_INFINITY;
    for(var j = 0; j < i; j++) {
       max = Math.max(max, values[j] + memo[i - j - 1]);
       memo[i] = max;
    }
  }

  return memo[n];
}

module.exports = {
  iterative: iRodCutting,
  recursive: function (values) {return naiveRecursiveRodCutting(values, values.length, []);},
  naive_recursive: function (values) {return naiveRecursiveRodCutting(values, values.length);}
};
