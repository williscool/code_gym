/* eslint-disable no-param-reassign */
// I mean this is litterally a sorting function for an array
import dsalgo from '../../utilities';

const swap = dsalgo.utils.swap;

/**
 * Selection Sort
 *
 * Time Complexity: O(n^2)
 *
 * http://en.wikipedia.org/wiki/Selection_sort
 *
 * Rarely used as insertion sort is almost always better
 *
 * https://en.wikipedia.org/wiki/Selection_sort#Comparison_to_other_sorting_algorithms
 *
 * Fun fact a variant of this is heapsort
 *
 * https://en.wikipedia.org/wiki/Selection_sort#Variants
 *
 * @module SelectionSort
 *
 * @param {array} list input array
 * @returns {array} sorted version of input array
 */
export default function (list) {
  const len = list.length;
  let i;
  let j;
  let iMin;

  for (j = 0; j < len - 1; j += 1) {
    // start with first element in array assuming its the smallest
    iMin = j;

    for (i = j + 1; i < len; i += 1) {
      if (list[i] < list[iMin]) {
        // swap out any smaller values
        iMin = i;
      }
    }

    // unless its the value we started this iteration with
    if (iMin !== j) {
      // move this value to its correct place in the list
      list = swap(list, j, iMin);
    }
  }

  return list;
}
