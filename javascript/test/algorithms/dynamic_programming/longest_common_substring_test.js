var assert = require('assert');
var LCSfns = require('../../../algorithms/dynamic_programming/longest_common_substring.js');

Object.keys(LCSfns).forEach(function(key) {
  it(key +  " length of Longest Common Substring", function() {
    var LCS = LCSfns[key];
    assert.deepEqual(LCS("abcdef","zcdemf"), 3 );
    assert.deepEqual(LCS("OldSite:GeeksforGeeks.org","NewSite:GeeksQuiz.com"), 10 );
  });
});
