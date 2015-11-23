var assert = require('assert');
var sofSFns = require('../../interview_questions/generating_all_substrings_of_a_string.js');

Object.keys(sofSFns).forEach(function(key) {
    var substringsOfString = sofSFns[key];
  it(key + ' All Substrings of a String', function() {
      // order doesn't matter and is generated differently by each so sort them
      assert.deepEqual ( substringsOfString("fun").sort() , [ 'f', 'fu', 'fun', 'u', 'un', 'n' ].sort() );
  });
});
