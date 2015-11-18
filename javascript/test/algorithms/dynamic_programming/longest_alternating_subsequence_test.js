var assert = require('assert');
var LASfns = require('../../../algorithms/dynamic_programming/longest_alternating_subsequence.js');

Object.keys(LASfns).forEach(function(key) {
  it(key +  " Longest Alternating Subsequence Length", function() {
    var LAS = LASfns[key];
    assert.deepEqual(LAS([1, 7, 4, 9, 2, 5]), 6 );
    assert.deepEqual(LAS([1, 17, 5, 10, 13, 15, 10, 5, 16, 8]), 7 );
    assert.deepEqual(LAS([10,20,30]), 2 );
    assert.deepEqual(LAS([1, 2, 3, 4, 5, 6, 7, 8, 9]), 2 );
    assert.deepEqual(LAS([70, 55, 13, 2, 99, 2, 80, 80, 80, 80, 100, 19, 7, 5, 5, 5, 1000, 32, 32]), 8 );
    assert.deepEqual(LAS([374, 40, 854, 203, 203, 156, 362, 279, 812, 955, 600, 947, 978, 46, 100, 953, 670, 862, 568, 188, 
                          67, 669, 810, 704, 52, 861, 49, 640, 370, 908, 
                          477, 245, 413, 109, 659, 401, 483, 308, 609, 120, 
                          249, 22, 176, 279, 23, 22, 617, 462, 459, 244]), 36 );
  });
});
