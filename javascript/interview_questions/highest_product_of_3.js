import quicksort from '../algorithms/sorting/quicksort';
/**
 * https://www.interviewcake.com/question/highest-product-of-3
 *
 * Given an array of integers, find the highest product you can get from three of the integers.
 *
 * The input arrayOfInts will always have at least three integers.
 *
 * @module highestProductOf3
 */

/**
 * Naive solution. Just multiplies distinct triplets of of the input to find the highest
 *
 * Time Complexity: O(n^3)
 * Space Complexity: O(1)
 *
 * @param {number[]} ints input
 * @returns {number} highest product of 3 numbers in the input
 */
function naiveHPOT(ints) {
  let highestOf3 = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < ints.length; i += 1) {
    for (let j = 0; j < ints.length; j += 1) {
      for (let k = 0; k < ints.length; k += 1) {
        if (i !== j && j !== k && i !== k) {
          highestOf3 = Math.max(highestOf3, ints[i] * ints[j] * ints[k]);
        }
      }
    }
  }

  return highestOf3;
}


/**
 * Linerithmic solution aka sort the numbers.
 *
 * Then in constant time you can compare
 *
 * The highest 3 multiplied and the lowest 2 times the highest to get the highest of 3
 *
 * Time Complexity: O(nlogn)
 * Space Complexity: O(1)
 *
 * @param {number[]} ints input
 * @returns {number} highest product of 3 numbers in the input
 */
function sortHPOT(ints) {
  const sortedInts = quicksort(ints);

  const highest = sortedInts[sortedInts.length - 1];

  const secondHighest2 = sortedInts[sortedInts.length - 3] * sortedInts[sortedInts.length - 2];
  const lowest2 = sortedInts[0] * sortedInts[1];

  return Math.max(highest * lowest2, highest * secondHighest2);
}

/**
 * https://www.interviewcake.com/question/highest-product-of-3
 *
 * Given an array of integers, find the highest product you can get from three of the integers.
 *
 * This solution saves us the sort time with a greedy approach.
 *
 * So now at each iteration we must maintain several numbers that could helps find the highest product of 3
 *
 * obviously the highest, and highest product of 2
 *
 * but now we also need to keep updating of the lowest and lowest of 2 because at each iteration a new number could
 *
 * bring the highest product of 2 up or lowest product of 2 down.
 *
 * So at each iteration we're
 *
 * 1. seeing if the new number * the current highest or lowest product of 2 gives us a new highest of 3
 * 2. updating the highest and lowest product of 2 based on this new num
 * 3. updating the highest and lowest num based on this new num
 *
 * keeping track of and updating each.
 *
 * @param {number[]} ints input
 * @returns {number} highest product of 3 numbers in the input
 */
function optimizedHighestProductOfThree(ints) {
  let highest = Math.max(ints[0], ints[1]);
  let lowest = Math.min(ints[0], ints[1]);

  let highestProductOf2 = ints[0] * ints[1];
  let lowestProductOf2 = ints[0] * ints[1];

  let highestProductOf3 = highestProductOf2 * ints[2];

  ints.forEach((num, i) => {
    if (i > 1) { // skip the numbers we initialized with
      highestProductOf3 = Math.max(highestProductOf3, num * highestProductOf2, num * lowestProductOf2);

      highestProductOf2 = Math.max(highestProductOf2, num * lowest, num * highest);

      lowestProductOf2 = Math.min(lowestProductOf2, num * lowest, num * highest);

      highest = Math.max(num, highest);
      lowest = Math.min(num, lowest);
    }
  });

  return highestProductOf3;
}


export default {
  naive: naiveHPOT,
  sorted: sortHPOT,
  optimized: optimizedHighestProductOfThree,
};
