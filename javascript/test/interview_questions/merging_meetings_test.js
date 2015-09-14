var assert = require('assert');
var MergingMeetings = require('../../interview_questions/merging_meetings.js');

describe('Merging Meetings Question', function() {
  it('works', function() {
    assert.deepEqual ( MergingMeetings([[0,1],[3,5],[4,8],[10,12],[9,10]]) , [[0,1],[3,8],[9,12]]);
    assert.deepEqual ( MergingMeetings(  [ [1, 10], [2, 6], [3, 5], [7, 9] ]) , [[1,10]]);
  });
});
