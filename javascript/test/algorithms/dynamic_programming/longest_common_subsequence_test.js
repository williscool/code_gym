var assert = require('assert');
var LCSfns = require('../../../algorithms/dynamic_programming/longest_common_subsequence.js');

Object.keys(LCSfns).forEach(function(key) {
  it(key +  " Longest Common Subsequence", function() {
    var LCS = LCSfns[key];
    assert.deepEqual(LCS("AGGTAB","GXTXAYB").join(""), "GTAB" );
    assert.deepEqual(LCS("ggcaccacg","acggcggatacg").join(""), "ggccacg" );
    // LCS like LIS can have multiple correct answers of the same length
    // this answer is generatted if you start from the end of the sequence instead of the begining
    // princeton intro to java solution starts at end.
    // 
    // geeksforgeeks and mine start at the begining
    assert.deepEqual(LCS("ggcaccacg","acggcggatacg").join("").length, "ggcaacg".length );
  });
});
