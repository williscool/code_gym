var assert = require('assert');
var rectangularLoveIntersectionBaby = require('../../interview_questions/rectangular_love.js');

describe('Rectangular Insection Question Question', function() {
  it('works with overlap', function() {
    var a = {x: 1, width: 6, y:1, height: 5};
    var b = {x: 5, width: 5, y:4, height: 3};

    assert.deepEqual( rectangularLoveIntersectionBaby(a,b), {
      x: 5, width: 2, y:4, height: 2
    });
  });
});
