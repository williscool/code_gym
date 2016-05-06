var assert = require('assert');
var findSmallestFns = require('../../interview_questions/find_smallest_num.js');

Object.keys(findSmallestFns).forEach(function(key) {

  var findSmallest = findSmallestFns[key];

  describe(key + ' Find Smallest Number is sorted rotated array Question', function() {
    
    it('works with an empty array', function() {
      assert.deepEqual ( findSmallest([]) , false);
    });

    it('works with a 2 element array', function() {
      assert.deepEqual ( findSmallest([2,1]) , 1);
    });

    it('works with a n element array', function() {
      assert.deepEqual ( findSmallest([3,4,5,6,1,2]) , 1);
    });

  });

});
