import assert from 'assert';
import BSearch from '../../../algorithms/searching/binarysearch';
import quicksort from '../../../algorithms/sorting/quicksort';
import dsalgo from '../../../utilities';

Object.keys(BSearch).forEach((key) => {
  const fn = BSearch[key];
  const binarysearch = fn;
  describe(`${key} Binary Search`, () => {
    describe('should work with arrays', () => {
      it('that are empty', () => {
        assert.equal(binarysearch([], 1), false);
      });

      it('that have one element', () => {
        assert.equal(binarysearch([1], 1), 0);
      });

      it('with no duplicates', () => {
        assert.equal(binarysearch([1, 2, 3, 6, 8, 9], 9), 5);
        assert.equal(binarysearch([1, 2, 3, 4, 5, 6], 7), false);
      });

      it('that have duplicates', () => {
        assert.equal(binarysearch([1, 1, 2, 3, 4, 4, 5, 5, 6, 9], 1), 0);
      });

      it('that are random', () => {
        let array = dsalgo.utils.makeRandomArray({
          precision: 0,
        });

        // of course our illustrious binary search only works on sorted lists.
        // so we must sort this list first;

        array = quicksort(array);
        // value at  1 / 4 of arr + 1
        const value = array[array.length >> 2 + 1]; // eslint-disable-line no-bitwise

        // we cant be sure there are no dupes since the array is random
        //  so we cant ask for a specfic index.
        //  but we can make sure that the answer we get is not false
        //
        assert(binarysearch(array, value) !== false);
      });
    });
  });
});
