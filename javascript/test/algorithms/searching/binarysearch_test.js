var assert = require('assert');
var BSearch = require('../../../algorithms/searching/binarysearch.js');
var quicksort = require('../../../algorithms/sorting/quicksort.js');
var dsalgo = require('../../../utilities.js').default;

Object.keys(BSearch).forEach(function(key) {

  var fn = BSearch[key];
  var binarysearch = fn;
  describe(key + ' Binary Search', function() {

    describe('should work with arrays', function() {
      it('that are empty', function() {
        assert.equal(binarysearch([], 1), false);
      });

      it('that have one element', function() {
        assert.equal(binarysearch([1], 1), 0);
      });

      it('with no duplicates', function() {
        assert.equal(binarysearch([1, 2, 3, 6, 8, 9], 9), 5);
        assert.equal(binarysearch([1, 2, 3, 4, 5, 6], 7), false);
      });

      it('that have duplicates', function() {
        assert.equal(binarysearch([1, 1, 2, 3, 4, 4, 5, 5, 6, 9], 1), 0);
      });

      it('that are random', function() {
        var array = dsalgo.utils.makeRandomArray({
          precision: 0
        });

        // of course our illustrious binary search only works on sorted lists.
        // so we must sort this list first;

        array = quicksort(array);
        // value at  1 / 4 of arr + 1
        var value = array[array.length >> 2 + 1];

        // we cant be sure there are no dupes since the array is random
        //  so we cant ask for a specfic index.
        //  but we can make sure that the answer we get is not false
        //
        assert(binarysearch(array, value) !== false);
      });

    });

  });
});
