var assert = require('assert');
var LIS = require('../../../algorithms/dynamic_programming/longest_increasing_subsequence.js').iterative;

it("Longest Increasing Subsequence", function() {
  assert.deepEqual(LIS([ 1, 12, 7, 0, 23, 11, 52, 31, 61, 69, 70, 2 ]), [1,12,23,52,61,69,70]);
 
  // since the length is the thing and which one you return is arbitrary 
  //
  // for instance the algorithm here varies slightly in that it always picks the last item in the case that
  // several consecutive numbers in our list have an increasing subsequence ending at their position that is equal
  //
  // mine always picks the first
  //
  // http://algorithms.tutorialhorizon.com/dynamic-programming-longest-increasing-subsequence/
  assert.deepEqual(LIS([ 1, 12, 7, 0, 23, 11, 52, 31, 61, 69, 70, 2 ]).length, [1,7,11,31,61,69,70].length );
});