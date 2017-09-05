/**
 * Recursive Binary Search
 *
 * inspired by
 *
 * http://en.wikipedia.org/wiki/Binary_search_algorithm#Recursive
 * http://en.wikibooks.org/wiki/Algorithm_Implementation/Search/Binary_search#JavaScript
 * Recursive Binary Search
 *
 * @param {number[]} list
 * @param {number} needle
 * @param {number} [inputMin=0]
 * @param {number} [inputMax=list.length]
 * @returns
 */
function rBinarySearch(list, needle, inputMin = 0, inputMax = list.length) {
  const min = inputMin;
  const max = inputMax;

  // recursed to an empty list so return value having not been found
  if (min > max) return false;

  const mid = (min + max) >> 1; // eslint-disable-line no-bitwise

  const midValue = list[mid];

  if (needle === midValue) {
    return mid;
  } else if (needle > midValue) {
    // target is lower search lower values in list
    return rBinarySearch(list, needle, mid + 1, max);
  }
  // target is lower search lower values in list
  return rBinarySearch(list, needle, min, mid - 1);
}

/**
 * Binary Search implementations
 *
 * Time Complexity: O(log(n))
 *
 * Only works on sorted arrays
 *
 * Everyone's favorite search algorithm.
 *
 * Boy to do techincal interviewers love to ask generalized version of it too
 *
 * i.e.
 *
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
 * https://www.interviewbit.com/problems/painters-partition-problem/
 *
 * http://en.wikipedia.org/wiki/Binary_search_algorithm
 *
 * https://www.youtube.com/watch?v=P3YID7liBug
 *
 * @module BinarySearch
 */
export default {
  recursive: rBinarySearch,
  /**
   * Iterative Version of Binary Search
   * somewhat inspired by
   * http://www.bradoncode.com/blog/2012/04/big-o-algorithm-examples-in-javascript.html
   *
   * @param {number[]} list
   * @param {number} needle
   * @param {number} [min=0]
   * @param {number} [max=list.length]
   * @returns
   */
  iterative(list, needle, inputMin = 0, inputMax = list.length) {
    const result = false;
    let min = inputMin;
    let max = inputMax;

    while (min <= max) {
      const mid = (min + max) >> 1; // eslint-disable-line no-bitwise

      const midValue = list[mid];

      if (needle === midValue) {
        return mid;
      } else if (needle > midValue) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    return result;
  },
};
