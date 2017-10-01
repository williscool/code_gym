/* eslint-disable no-param-reassign */
// I mean this is litterally a sorting function for an array

/**
 * Adds the arrays that were sorted in sub arrays back together
 *
 * @param {array} left leftside input array to merge
 * @param {array} right rightside input array to merge
 * @returns {array} the merged array
 */
function merge(left, right) {
  const result = [];
  let iLeft = 0;
  let iRight = 0;

  while (iLeft < left.length && iRight < right.length) {
    if (left[iLeft] < right[iRight]) {
      result.push(left[iLeft]);
      iLeft += 1;
    } else {
      result.push(right[iRight]);
      iRight += 1;
    }
  }

  // lol wat http://stackoverflow.com/questions/7124884/why-does-1-2-3-4-1-23-4-in-javascript
  // return result + left.slice(iLeft) + right.slice(iRight);
  //
  // slice returns all the elements after and at the index you give it
  return result.concat(left.slice(iLeft)).concat(right.slice(iRight));
}

/**
 * Top Down Version of Merge Sort
 *
 * inspired by http://www.nczonline.net/blog/2012/10/02/computer-science-and-javascript-merge-sort/
 * the wikipedia entry psuedocode was doing to much
 *
 * https://en.wikipedia.org/wiki/Merge_sort#Top-down_implementation
 *
 * Using the function shorthand in es6 didnt work with the recursion in this funtionn
 *
 * @param {array} list input array
 * @returns {array} sorted version of input array
 */
function topDownMergeSort(list) {
  if (list.length <= 1) {
    return list;
  }

  let left = [];
  let right = [];

  // http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html
  // eslint-disable-next-line no-bitwise
  const middle = list.length >> 1;

  const len = list.length;
  let i;

  for (i = 0; i < len; i += 1) {
    if (i < middle) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }

  left = topDownMergeSort(left);
  right = topDownMergeSort(right);

  return merge(left, right);
}

/**
 * Module of Merge Sorts
 *
 * Time Complexity: O(n log(n))
 * Space Complexity: O(n)
 *
 * This sort is not inplace but it is stable
 *
 * http://algs4.cs.princeton.edu/22mergesort/
 * http://en.wikipedia.org/wiki/Merge_sort
 *
 * @module MergeSort
 */
export default {
  topDown: topDownMergeSort,
  /**
   * Bottom Up Version of MergeSort
   *
   * Super helpful video explaination (i promise im not trollin you this time)
   * https://www.youtube.com/watch?v=lOUe8Q9jQow
   *
   * https://en.wikipedia.org/wiki/Merge_sort#Bottom-up_implementation_using_lists
   * @param {array} list input array
   * @returns {array} sorted version of input array
   */
  bottomUp(list) {
    if (list.length <= 1) {
      return list;
    }

    const len = list.length;
    let temp = [];
    let blockSize;
    let i;

    for (blockSize = 1; blockSize < len; blockSize *= 2) {
      // we want to take all of the elements as long as we dont go out of bounds
      // if we were to do len - blocksize then we would miss the last iteration in some cases where
      // the right side is smaller than the left
      for (i = 0; i < len; i += (blockSize * 2)) {
        // javascript list slice is not inclusive of the element at the end index that you give it
        const left = list.slice(i, i + blockSize);
        const right = list.slice(i + blockSize, Math.min((i + (2 * blockSize)), len));

        temp = temp.concat(merge(left, right));
      }

      list = temp;
      temp = [];
    }

    return list;
  },
};
