/* eslint-disable no-loop-func, no-param-reassign  */
// again this is litterally a sort function for arrays
// also i'll make as many forEach functions in a look as I damn well please lol
// http://stackoverflow.com/questions/10451865/jshint-wont-let-me-use-foreach-in-a-for-loop

/**
 * returns the maximum value in a number array
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
 *
 * @param {number[]} numArray
 * @returns
 */
function arrayMax(numArray) {
  return Math.max.apply(null, numArray);
}

/**
 * Varying Base Log in js
 *
 * http://stackoverflow.com/a/8492462/511710
 *
 * @param {any} b
 * @param {any} n
 * @returns
 */
function log(b, n) {
  return Math.log(n) / Math.log(b);
}

/**
 * Get the digit at a place in the number
 *
 * Used to chooze the bucket to place a number in for the radix sort
 *
 * @param {any} base
 * @param {any} value
 * @param {any} digit
 * @returns
 */
function indexFunction(base, value, digit) {
  return Math.floor((value / (base ** digit)) % base);
}

/**
 * Radix sort
 *
 * This, like counting sort, is another form of bucket sort
 *
 * In this the buckets are decided by the digits in each place of a number based on the base
 *
 * http://en.wikipedia.org/wiki/Radix_sort#Least_significant_digit_radix_sorts
 *
 * inspired by
 * http://www.geeksforgeeks.org/radix-sort/
 * https://github.com/kennyledet/Algorithm-Implementations/blob/master/Radix_Sort/Java/PatrickYevsukov/radix_sort.java
 * http://www.dreamincode.net/forums/topic/199650-least-significant-digit-radix-sort/page__view__findpost__p__1166098
 *
 * https://medium.com/@tyguyo/all-sorts-of-sorts-5da9873aa046
 * https://codehost.wordpress.com/2011/07/22/radix-sort/
 *
 * only works with positve numbers
 *
 * @module RadixSort
 * @export RadixSort
 * @param {any} list
 * @param {number} base - the base of the numbers we are sorting. defaults to 10 aka decimal
 * @returns
 */
export default function (list, base = 10) {
  if (list.length < 2) {
    return list;
  }
  const buckets = [];

  // make buckets for numbers to go into
  // another bucket sort
  let i = 0;
  while (i < base) {
    buckets[i] = [];
    i += 1;
  }

  const max = arrayMax(list);
  const maxLen = Math.floor(log(base, max) + 1);

  // now we will place each number into a bucket
  // based on each digit at a place in it starting with the least siginificat
  for (let digit = 0; digit < maxLen; digit += 1) {
    // place numbers in to bucket based on there significant digit
    // i.e. the 0 in the number 10 in a first pass or the 1 in a second

    // Got tired of writing for loops
    list.forEach((val) => {
      // let index = indexFunction(val,digit);
      // if(!buckets[index]) debugger;
      buckets[indexFunction(base, val, digit)].push(val);
    });

    // now that we've built the buckets and shifted them
    // we need to flatten them back into the list
    list = [];
    buckets.forEach((val, index) => {
      list = list.concat(val);
      // then reset buckets to get them ready for next round at the next place
      buckets[index] = [];
    });
  }

  return list;
}
