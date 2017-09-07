import assert from 'assert';
import dsalgo from '../../../utilities';
import heapsort from '../../../algorithms/sorting/heapsort';

describe('heap Sort', () => {
  describe('should work with arrays', () => {
    it('that are empty', () => {
      assert.deepEqual(heapsort([]), []);
    });

    it('with no duplicates', () => {
      assert.deepEqual(heapsort([9, 2, 8, 6, 1, 3]), [1, 2, 3, 6, 8, 9]);
      assert.deepEqual(heapsort([5, 2, 2, 6, 1, 3]), [1, 2, 2, 3, 5, 6]);
      assert.deepEqual(heapsort([5, 2, 4, 6, 1, 3]), [1, 2, 3, 4, 5, 6]);
    });

    it('that have duplicates', () => {
      assert.deepEqual(heapsort([3, 1, 4, 1, 5, 9, 2, 6, 5, 4]), [1, 1, 2, 3, 4, 4, 5, 5, 6, 9]);
    });

    it('that have negative values', () => {
      assert.deepEqual(heapsort([0, 0, 0, 0, 0, -1]), [-1, 0, 0, 0, 0, 0]);
    });

    it('that are random and non-sorted', () => {
      let array = dsalgo.utils.makeRandomArray({
        precision: 0,
      });

      array = heapsort(array);
      for (let i = 1; i < array.length; i += 1) {
        assert((array[i - 1] <= array[i]) === true);
      }
    });
  });
});
