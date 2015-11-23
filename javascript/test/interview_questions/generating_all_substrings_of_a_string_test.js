var assert = require('assert');
var substringsOfString = require('../../interview_questions/generating_all_substrings_of_a_string.js').recursive;

describe(' All Substrings of a String', function() {
  it('works', function() {
    // order doesn't matter and is generated differently so sort them
    assert.deepEqual ( substringsOfString("fun").sort() , [ 'f', 'fu', 'fun', 'u', 'un', 'n' ].sort() );
  });
});
