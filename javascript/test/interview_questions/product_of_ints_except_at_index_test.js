var assert = require('assert');
var ProductOfAllExceptAtIndex = require('../../interview_questions/product_of_ints_except_at_index.js');

Object.keys(ProductOfAllExceptAtIndex).forEach(function(key) {
  var fn = ProductOfAllExceptAtIndex[key];
  var productOfAllExceptAtIndex = fn;

  describe(key + ' Product Of All Except At Index Question', function() {
    it('should work with arrays', function() {
      assert.deepEqual( productOfAllExceptAtIndex([1,7,3,4]), [84,12,28,21]);
    });
  });
});
