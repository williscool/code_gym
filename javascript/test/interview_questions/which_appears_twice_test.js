var assert = require('assert');
var whichAppearsTwice = require('../../interview_questions/which_appears_twice.js');

describe('Which Appears Twice Question', function() {
  it('works', function() {
     assert.equal(whichAppearsTwice([1,2,3,4,5,6,7,8,9,9]), 9);
  });
});
