import assert from 'assert';
import radixsort from '../../../algorithms/sorting/radixsort';
import dsalgo from '../../../utilities';

describe('Radix Sort', () => {
  describe('should work with arrays', () => {
    it('that are empty', () => {
      assert.deepEqual(radixsort([]), []);
    });

    it('with no duplicates', () => {
      assert.deepEqual(radixsort([9, 2, 8, 6, 1, 3]), [1, 2, 3, 6, 8, 9]);
      assert.deepEqual(radixsort([5, 2, 2, 6, 1, 3]), [1, 2, 2, 3, 5, 6]);
      assert.deepEqual(radixsort([5, 2, 4, 6, 1, 3]), [1, 2, 3, 4, 5, 6]);
    });

    it('that have duplicates', () => {
      assert.deepEqual(radixsort([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]), [1, 1, 2, 3, 4, 4, 5, 5, 6, 9]);
    });

    // this sort in this version only works with positive numbers
    // you could drop a numbers sign sort them in a seperate array and reverse it
    // it in the end if you needed to support negative numbers

    it('that are random and non-sorted', () => {
      let array = dsalgo.utils.makeRandomArray({
        precision: 0,
      });

      array = radixsort(array);

      for (let i = 1; i < array.length; i += 1) {
        assert((array[i - 1] <= array[i]) === true);
      }
    });
  });
});
