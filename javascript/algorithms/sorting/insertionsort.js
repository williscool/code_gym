/* eslint-disable no-param-reassign */
// I mean this is litterally a sorting function for an array
import dsalgo from '../../utilities';

const swap = dsalgo.utils.swap;

/**
 * Implements Insertion Sort
 *
 * Actually a fairly widely used algorithm for small arrays because its:
 *
 * Time Complexity: O(n^2)
 *
 * - Efficient for (quite) small data sets
 * - More efficient in practice than most other simple quadratic (i.e., O(n^2)) algorithms such as selection sort or bubble sort
 * - Stable; i.e., does not change the relative order of elements with equal keys
 * - In-place; i.e., only requires a constant amount O(1) of additional memory space
 * - Online; i.e., can sort a list as it receives it
 * - Performs well on list/araays that are already mostly sorted
 *
 * As a matter of fact fun fact v8 the javascript engine powering node.js uses it
 *
 * https://github.com/v8/v8/blob/6.3.4/src/js/array.js#L720
 * https://github.com/v8/v8/blob/6.3.4/src/js/array.js#L734
 *
 * http://en.wikipedia.org/wiki/Insertion_sort
 * @module InsertionSort
 */
export default {

  /**
   * The original version
   *
   * @param {array} list
   * @returns {array}
   */
  naive(list) {
    const len = list.length;
    let i;
    let j;

    // for each value in the list starting with the second
    for (i = 1; i < len; i += 1) {
      j = i;

      // while this value j is greater than zero AND value at list[j] is lower than left previous value
      //
      // j greater than zero makes sure to not go out of bounds to the left when looking to move the value back
      //
      // greater than previous value keeps the while going until we find a value that list[j] is greater than
      //
      while (j > 0 && list[j - 1] > list[j]) {
        list = swap(list, j, j - 1);
        // --j != j--
        // http://en.wikipedia.org/wiki/Increment_and_decrement_operators
        // https://www.youtube.com/watch?v=VbvNp6AjwM8
        //
        // comment above left for comedic purposes
        //
        // rip to the old call to --j cuz airbnb style.
        // ironically literally to avoid this very bug
        //
        // j = j - 1;
        j -= 1;
      }
    }

    return list;
  },
  /**
   * Optimized Version
   *
   * slight optimization by storing the value to swap into place
   * when we are finished moving the higher values in front of it
   *
   * @param {any} list
   * @returns {array}
   */
  optimized(list) {
    const len = list.length;
    let i;
    let j;
    let valueBeingSortedNow;

    for (i = 1; i < len; i += 1) {
      // store this val to swap into its new place only after we are done moving higher values in front of it
      valueBeingSortedNow = list[i];
      j = i;

      while (j > 0 && list[j - 1] > valueBeingSortedNow) {
        list[j] = list[j - 1];
        j -= 1;
      }

      list[j] = valueBeingSortedNow;
    }

    return list;
  },

};
