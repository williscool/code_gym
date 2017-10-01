/* eslint-disable no-param-reassign */
// I mean this is litterally a sorting function for an array
// its gotta mutate it
import dsalgo from '../../utilities';

const swap = dsalgo.utils.swap;

/**
 * http://en.wikipedia.org/wiki/Bubble_sort#Implementation
 *
 * bubble bubble..
 * https://www.youtube.com/watch?v=hR-NXv5Tma0
 *
 * Exports several types of bubble sorts
 *
 * Time Complexity: O(n^2)
 *
 * Also this basically the worst sorting algorithm there is on multiple fronts
 * https://en.wikipedia.org/wiki/Bubble_sort#In_practice
 *
 * @module BubbleSort
 */
export default {

  /**
   * This is the orginal version
   *
   * @param {array} list input array
   * @returns {array} sorted version of input array
   */
  naive(list) {
    const len = list.length;
    let sorted;
    let i;

    do {
      // assume array is sorted at first and let the for loop tell us if it isn't
      sorted = true;

      for (i = 1; i < len; i += 1) {
        if (list[i - 1] > list[i]) {
          list = swap(list, i - 1, i);
          sorted = false;
        }
      }
    } while (!sorted);

    return list;
  },

  /**
   * This version is optimized by skipping examing the already sort items at each pass
   *
   * @param {array} list input array
   * @returns {array} sorted version of input array
   */
  optimized(list) {
    let len;
    let sorted;
    let i;

    len = list.length;

    do {
      // assume array is sorted at first and let the for loop tell us if it isn't
      sorted = true;

      for (i = 1; i < len; i += 1) {
        if (list[i - 1] > list[i]) {
          list = swap(list, i - 1, i);
          sorted = false;
        }
      }

      // now all we need to is decrement the number of elements to look at
      // the last item on each iteration is already in the correct place
      //
      // it.. wait for it... bubbled.. to the top
      // http://cow.org/csi/
      len -= 1;
    } while (!sorted);

    return list;
  },

  /**
   * Another Optimized version of Bubblesort
   *
   * This algorithm assumes that the last element we had to swap was the last element out of place at that iteration
   * so it shortens the amount of elements looked at on subsequent iterations by that many
   *
   * @param {array} list input array
   * @returns {array} sorted version of input array
   */
  stopAtLastSorted(list) {
    let len;
    let i;
    let newLen;

    len = list.length;

    do {
      newLen = 0;
      for (i = 0; i < len; i += 1) {
        if (list[i - 1] > list[i]) {
          list = swap(list, i - 1, i);
          newLen = i;
        }
      }

      len = newLen;
    } while (len !== 0);

    return list;
  },

};
