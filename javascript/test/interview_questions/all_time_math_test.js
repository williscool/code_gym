var assert = require('assert');
var AllTimeMathObj = require('../../interview_questions/all_time_math.js');

describe('All Time Min Max Mean and Mode Question', function() {
  var allTimeMath = new AllTimeMathObj();
  [1,3,6,3,1,3].forEach(function(num){
    allTimeMath.insert(num);
  });
  it('Min', function() {
    assert.equal ( allTimeMath.get_min() , 1);
  });
  it('Max', function() {
    assert.equal ( allTimeMath.get_max() , 6);
  });
  it('Mean', function() {
    assert.equal ( allTimeMath.get_mean().toFixed(2) , "2.83");
  });
  it('Mode', function() {
    assert.equal ( allTimeMath.get_mode() , 3);
  });
});
