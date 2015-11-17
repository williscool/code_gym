var assert = require('assert');
var eDistFns = require('../../../algorithms/dynamic_programming/edit_distance.js');

Object.keys(eDistFns).forEach(function(key) {
  it(key +  " Longest Common Subsequence", function() {
    var editDistance = eDistFns[key];
    assert.deepEqual(editDistance ("sunday","saturday"), 3 );
  });
});
