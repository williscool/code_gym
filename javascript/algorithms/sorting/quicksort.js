/* eslint-disable no-param-reassign */
// I mean this is litterally a sorting function for an array
import dsalgo from '../../utilities';

const swap = dsalgo.utils.swap;

/**
 * Chooses the pivot value for the partition function
 *
 * lol worthy thing that happend with this function
 *
 * So you gotta make sure your order of operations is correct
 * because if this pivot returns an incorrect index everything is fucked
 *
 * http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html
 *
 * I prefer using the midpoint but some algos call for using the value at the lowest index aka lo
 * i.e. https://www.hackerrank.com/challenges/quicksort2
 *
 * fun fact though that algorithm causes worst case behavior on arrays that are already sorted
 *
 * https://en.wikipedia.org/wiki/Quicksort#Choice_of_pivot
 *
 *
 * @param {number} lo - lowest index to use to calculate pivot
 * @param {number} hi - highest index to used to calculate pivot
 * @returns {number}
 */
function choosePivot(hi, lo) {
  // eslint-disable-next-line no-bitwise
  return (hi + lo) >> 1;
}

/**
 * Partitions the array's values into values that are higher and lower
 * than the value at a pivot index
 *
 * https://www.youtube.com/watch?v=pZ12_E5R3qc
 *
 * @param {array} list - input array to sort
 * @param {number} lo - lowest index to use to calculate pivot
 * @param {number} hi - highest index to used to calculate pivot
 * @returns {array}
 */
function partition(list, lo, hi) {
  // pick our pivot value
  const pivotIndex = choosePivot(lo, hi);
  const pivotVal = list[pivotIndex];

  // move the value of the pivot to the highest index so that it is out of the way
  // while we compare all of the other element's values to it to figure out where to move it to
  list = swap(list, pivotIndex, hi);
  let indexToMoveValueTo = lo;

  // once this for loop completes every value before indexToMoveValueTo will be lower than pivotVal and everyone after will be higher
  for (let i = lo; i < hi; i += 1) {
    if (list[i] < pivotVal) {
      list = swap(list, i, indexToMoveValueTo);
      indexToMoveValueTo += 1;
    }
  }

  // now that the other elements are in their new positions we can move the pivot value to its final place.
  list = swap(list, indexToMoveValueTo, hi);

  // then we return the value of the index we just put the pivot in
  // that is our new pivot index
  return indexToMoveValueTo;
}

/**
 * Quicksort
 *
 * This is the inplace (it sorts the input array as a opposed to returning a sorted copy)
 *
 * One of the most commonly used very performant (in the avg case on large array) sorting algorithms
 *
 * Average Case Time Complexity: O(n log(n))
 * Worse Case Time Complexity: O(n^2)
 *
 * As a matter of fact it is used in v8 (the javascript engine powering node.js) for arrays
 * https://github.com/v8/v8/blob/6.3.4/src/js/array.js#L768
 *
 * http://en.wikipedia.org/wiki/Quicksort
 *
 * @param {array} list - input array to sort
 * @param {number} lo - lowest index to use to calculate pivot
 * @param {number} hi - highest index to used to calculate pivot
 * @returns {array}
 */
function quicksort(list, lo, hi) {
  if (lo < hi) {
    const indexOfPivot = partition(list, lo, hi);
    quicksort(list, lo, indexOfPivot - 1);
    quicksort(list, indexOfPivot + 1, hi);
  }

  return list;
}

/**
 * Module that exports quicksort function with its common invokation
 * (with the input list, the first index of the input, and the last index)
 *
 * @module quicksort
 * @exports {{quicksort}}
 * @param {any} list
 */
export default function (list) {
  return quicksort(list, 0, list.length - 1);
}
