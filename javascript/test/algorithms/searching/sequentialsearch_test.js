var assert = require('assert');
var seqsearch = require('../../../algorithms/searching/sequentialsearch.js');
var dsalgo = require('../../../utilities.js').dsalgo;

describe('Sequential Search', function() {

  describe('should work with arrays', function() {
    it('that are empty', function() {
      assert.equal(seqsearch([], 1), false);
    });

    it('with no duplicates', function() {
      assert.equal(seqsearch([9, 2, 8, 6, 1, 3], 9), 0);
      assert.equal(seqsearch([5, 2, 2, 6, 1, 3], 7), false);
    });

    it('that have duplicates', function() {
      assert.equal(seqsearch([3, 1, 4, 1, 5, 9, 2, 6, 5, 4], 1), 1);
    });

    it('that are random and non-sorted', function() {
      var array = dsalgo.utils.makeRandomArray({
        precision: 0
      });

      var value = array[Math.floor(array.length / 2)];

      // we cant be sure there are no dupes since the array is random
      //  so we cant ask for a specfic index. 
      //  but we can make sure that the answer we get is not false
      //
      assert(seqsearch(array, value) !== false);
    });

  });

});
