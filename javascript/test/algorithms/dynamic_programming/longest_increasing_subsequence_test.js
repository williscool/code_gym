var assert = require('assert');
var LISfns = require('../../../algorithms/dynamic_programming/longest_increasing_subsequence.js');

Object.keys(LISfns).forEach(function(key) {
  it(key +  " Longest Increasing Subsequence", function() {
    var LIS = LISfns[key];
   
    // which specific combination of the longest_increasing_subsequence you return is arbitrary. they are all correct answers
    //
    // for instance the algorithm here varies slightly in that it always picks the last item in the case that
    // several consecutive numbers in our list have an increasing subsequence ending at their position that is equal
    //
    // my recusive and iterative dp ones always picks the first
    //
    // http://algorithms.tutorialhorizon.com/dynamic-programming-longest-increasing-subsequence/
    //
    // a propety of the n log k algorithm is you have to have it search for a minimum or maximum and the iteration I wrote always picks the lowest
    // because per the wikipedia talk page on the algo
    //
    // "If multiple increasing subsequences exist, the one that ends with the smallest value is preferred"

    assert.deepEqual(LIS([1, 2]).length, [1,2].length);
    assert.deepEqual(LIS([ 2, 1]).length, [1].length);
    assert.deepEqual(LIS([ 1, 12, 7, 0, 23, 11, 52, 31, 61, 69, 70, 2 ]).length, [1,12,23,52,61,69,70].length);
    assert.deepEqual(LIS([1,2,4,3]).length, [1,2,4].length);
   
     assert.deepEqual(LIS([ 1, 12, 7, 0, 23, 11, 52, 31, 61, 69, 70, 2 ]).length, [1,7,11,31,61,69,70].length );
    // TODO: make this work for sequences with dupes with the recursive solution
    // assert.deepEqual(LIS([2, 4, 1, 2, 3]), [1,2,3] );
  });
});
