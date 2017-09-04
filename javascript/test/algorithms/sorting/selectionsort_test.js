var assert = require('assert');
var selectionsort = require('../../../algorithms/sorting/selectionsort.js');
var dsalgo = require('../../../utilities.js').default;

describe('Selection Sort', function() {

  describe('should work with arrays', function() {
    it('that are empty', function() {
      assert.deepEqual(selectionsort([]), []);
    });

    it('with no duplicates', function() {
      assert.deepEqual(selectionsort([9, 2, 8, 6, 1, 3]), [1, 2, 3, 6, 8, 9]);
      assert.deepEqual(selectionsort([5, 2, 2, 6, 1, 3]), [1, 2, 2, 3, 5, 6]);
      assert.deepEqual(selectionsort([5, 2, 4, 6, 1, 3]), [1, 2, 3, 4, 5, 6]);
    });

    it('that have duplicates', function() {
      assert.deepEqual(selectionsort([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]), [1, 1, 2, 3, 4, 4, 5, 5, 6, 9]);
    });

    it('that have negative values', function() {
      assert.deepEqual(selectionsort([0, 0, 0, 0, 0, -1]), [-1, 0, 0, 0, 0, 0]);
    });

    it('that are random and non-sorted', function() {
      var array = dsalgo.utils.makeRandomArray({
        precision: 0
      });

      selectionsort(array);
      for (var i = 1; i < array.length; i++) {
        assert((array[i - 1] <= array[i]) === true);
      }
    });
  });

});
