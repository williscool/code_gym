var assert = require('assert');
var radixsort = require('../../../algorithms/sorting/radixsort.js');
var dsalgo = require('../../../utilities.js').dsalgo;

describe('Radix Sort', function() {

  describe('should work with arrays', function() {
    it('that are empty', function() {
      assert.deepEqual(radixsort([]), []);
    });

    it('with no duplicates', function() {
      assert.deepEqual(radixsort([9, 2, 8, 6, 1, 3]), [1, 2, 3, 6, 8, 9]);
      assert.deepEqual(radixsort([5, 2, 2, 6, 1, 3]), [1, 2, 2, 3, 5, 6]);
      assert.deepEqual(radixsort([5, 2, 4, 6, 1, 3]), [1, 2, 3, 4, 5, 6]);
    });

    it('that have duplicates', function() {
      assert.deepEqual(radixsort([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]), [1, 1, 2, 3, 4, 4, 5, 5, 6, 9]);
    });

    // this sort in this version only works with positive numbers
    // you could drop a numbers sign sort them in a seperate array and reverse it
    // it in the end if you needed to support negative numbers

    it('that are random and non-sorted', function() {
      var array = dsalgo.utils.makeRandomArray({
        precision: 0
      });

      array = radixsort(array);

      for (var i = 1; i < array.length; i++) {
        assert((array[i - 1] <= array[i]) === true);
      }
    });
  });

});
