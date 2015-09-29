var assert = require('assert');
var recursiveStringPermutaions = require('../../interview_questions/generating_all_permutations_of_a_given_string.js');

describe('Recursive String Permuations Words Question', function() {
  it('works', function() {
    assert.deepEqual ( recursiveStringPermutaions("", "cat") , [ 'cat', 'cta', 'act', 'atc', 'tca', 'tac' ] );
  });
});
