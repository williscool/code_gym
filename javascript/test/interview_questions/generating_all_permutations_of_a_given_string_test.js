var assert = require('assert');
var stringPermutationsFns = require('../../interview_questions/generating_all_permutations_of_a_given_string.js');

Object.keys(stringPermutationsFns).forEach(function(key) {
  var stringPermutations = stringPermutationsFns[key];
  it(key + ' String Permuations Words Question', function() {
    assert.deepEqual ( stringPermutations("cat") , [ 'cat', 'cta', 'act', 'atc', 'tca', 'tac' ] );
  });
});
