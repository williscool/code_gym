var assert = require('assert');
var LCSfns = require('../../../algorithms/dynamic_programming/longest_common_subsequence.js');

Object.keys(LCSfns).forEach(function(key) {
  it(key +  " Longest Common Subsequence", function() {
    var LCS = LCSfns[key];
    assert.deepEqual(LCS("AGGTAB","GXTXAYB").join(""), "GTAB" );
    // LCS like LIS can have multiple correct answers of the same length
    // this answer is generatted if you start from the end of the sequence instead of the begining
    // princeton intro to java and my recursive solution starts at beginning of the string (building the actual LCS) 
    // 
    // geeksforgeeks and mine start at the end of string (when building the actual LCS)
    assert.deepEqual(LCS("ggcaccacg","acggcggatacg").join("").length, "ggccacg".length );
    assert.deepEqual(LCS("ggcaccacg","acggcggatacg").join("").length, "ggcaacg".length );
  });
});
