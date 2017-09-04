import assert from 'assert';
import BubbleSort from '../../../algorithms/sorting/bubblesort';
import { dsalgo } from '../../../utilities';

/**
 * inspired by: https://github.com/addyosmani/bubblesort/blob/master/test/test.js
 * http://stackoverflow.com/questions/7440001/iterate-over-object-keys-in-node-js
 */
Object.keys(BubbleSort).forEach((key) => {
  const fn = BubbleSort[key];
  const bubblesort = fn;

  describe(`${key} Bubble Sort`, () => {
    it('should work with empty arrays', () => {
      assert.deepEqual(bubblesort([]), []);
    });

    it('should work with ascending arrays', () => {
      assert.deepEqual(
        bubblesort(
          [3, 1, 4, 1, 5, 9, 2, 6, 5, 4]),
        [1, 1, 2, 3, 4, 4, 5, 5, 6, 9]);
      assert.deepEqual(bubblesort([9, 2, 8, 6, 1, 3]), [1, 2, 3, 6, 8, 9]);
      assert.deepEqual(bubblesort([5, 2, 2, 6, 1, 3]), [1, 2, 2, 3, 5, 6]);
      assert.deepEqual(bubblesort([5, 2, 4, 6, 1, 3]), [1, 2, 3, 4, 5, 6]);
      assert.deepEqual(bubblesort([0, 0, 0, 0, 0, -1]), [-1, 0, 0, 0, 0, 0]);
    });

    it('should work with random non-sorted arrays', () => {
      const array = dsalgo.utils.makeRandomArray({
        precision: 0,
      });
      bubblesort(array);
      for (let i = 1; i < array.length; i += 1) {
        assert((array[i - 1] <= array[i]) === true);
      }
    });
  });
});
