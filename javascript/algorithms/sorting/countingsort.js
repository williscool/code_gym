
/**
 * Counting Sort
 *
 * http://en.wikipedia.org/wiki/Counting_sort
 *
 * Time Complexity: O(n + k)
 *
 * where n is the number of items and k is the maxium value
 *
 * inspired by http://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Counting_sort
 *
 * turns out bucket sort is basically just a generalization of counting sort
 * http://en.wikipedia.org/wiki/Bucket_sort#Comparison_with_other_sorting_algorithms
 *
 * but instead of a bucket for every number you can make up your own arbitrariliy sized buckets
 *
 * presumably / preferably based off of some knowledge that would help you make the buckets some uniform size
 * then you either recursively bbecket sort or use another sort perhaps selection sort on the smaller buckets
 *
 * http://en.wikipedia.org/wiki/Bucket_sort#Optimizations
 *
 * so no need to re do for that
 *
 * https://www.interviewcake.com/question/ruby/top-scores
 *
 * @module CountingSort
 *
 * @param {array} list
 * @returns {array}
 */
export default function (list) {
  const counts = [];
  const result = [];
  const len = list.length;

  // calculate min and max from the numbers in the list
  let min = list[0];
  let max = list[0];
  list.forEach((val) => {
    if (val > max) {
      max = val;
    }

    if (val < min) {
      min = val;
    }
  });

  // setup array to hold counts of different values
  for (let i = 0; i < (max - min) + 1; i += 1) {
    counts[i] = 0;
  }

  // count number of distinct values in their respective array place
  for (let i = 0; i < len; i += 1) {
    // current value minus the min to keep it in array bounds
    counts[list[i] - min] += 1;
  }

  let k = 0;

  // put output values in result array
  //
  // repeat values based on count at counts index
  counts.forEach((val, index) => {
    for (let j = 0; j < counts[index]; j += 1) {
      result[k] = index + min;
      k += 1;
    }
  });

  return result;
}
