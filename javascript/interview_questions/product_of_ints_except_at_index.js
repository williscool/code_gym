import dsalgo from '../utilities';

/**
 * https://www.interviewcake.com/question/product-of-other-numbers
 *
 * You have a list of integers, and for each index you want to find the product of every integer except the integer at that index.
 *
 * Write a function get_products_of_all_ints_except_at_index() that takes a list of integers and returns a list of the products.
 *
 * Do not use division in your solution.
 *
 * Also I could throw an exception if there are are less than 2 numbers in the array (because there is no other index to do the multiplication with in that case)
 * but its pretty trival to guard on that edge case
 *
 * @module ProductOfIntsExceptAtIndex
 */


/**
 * This is the naive solution. aka slow as balls lol
 *
 * In this solution you simply interate over the input array n times for each n indicies (expect the one at the current iteration of course)
 *
 * And multiply the numbers in the auxillary array.
 *
 * Time Complexity: O(n^2)
 * Extra Space Complexity: O(n)
 *
 * @param {number[]} ints input ints array
 * @returns {number[]} output product of ints except at index
 */
function slowProductOfAllExceptAtIndex(ints) {
  const productArr = [];

  ints.forEach((num, i) => {
    ints.forEach((otherNum, j) => {
      if (i !== j) {
        if (!dsalgo.utils.isDefined(productArr[i])) {
          productArr[i] = otherNum;
        } else {
          productArr[i] *= otherNum;
        }
      }
    });
  });

  return productArr;
}

// there is an intermediate version that you could put here that is but O(n) uses 3 extra arrays
// one for the products of the numbers before index
// one for the products of the numbers after index
// and another one to multply those together at each index in
// but not particularly intesresting to code so I'll leave as a comments

/**
 * This solution works by multiplying all of the numbers before an index in the aux arr...
 *
 * Then reversing both ... thus allowing you to multiply all of the numbers after each index into each.
 *
 * Finally reverse the aux arr one more time to get it back into the original order of the input array
 *
 * Then return it
 *
 * Time Complexity: O(5n)
 * Extra Space Complexity: O(n)
 *
 * @param {number[]} ints input ints array
 * @returns {number[]} output product of ints except at index
 */
function foreachPAllExceptAtIndex(ints) {
  let numsBefore = ints[0]; // start with 1 to not affect the product
  const productArr = [];

  ints.forEach((num, i) => {
    productArr[i] = numsBefore;
    numsBefore *= num;
  });

  ints.reverse();
  productArr.reverse();

  let numsAfter = ints[0];

  ints.forEach((num, i) => {
    if (i > 0) { // first number has already had all other nums multipled into it in first pass of numsBefore so skip it
      productArr[i] *= numsAfter;
      numsAfter *= num;
    }
  });

  // again reverse it back
  productArr.reverse();
  return productArr;
}


/**
 * This version gets rid of the need for reversing the arrays
 * and just uses 2 while loops to go first forward then back
 *
 * waaaay more elegant
 *
 * Time Complexity: O(2n)
 * Extra Space Complexity: O(n)
 *
 * @param {number[]} ints input ints array
 * @returns {number[]} output product of ints except at index
 */
function whilePAllExceptAtIndex(ints) {
  let numsBefore = 1;
  const productArr = [];
  let i = 0;

  while (i < ints.length) {
    productArr[i] = numsBefore;
    numsBefore *= ints[i];
    i += 1;
  }

  let numsAfter = 1;
  i = ints.length - 1;

  while (i >= 0) {
    productArr[i] *= numsAfter;
    numsAfter *= ints[i];
    i -= 1;
  }

  return productArr;
}

/**
 * This is bonus style uses division to get the job done.
 *
 * but because of this it would blowup on zero
 *
 * Extra Space Complexity: O(n)
 *
 * @param {number[]} ints input ints array
 * @returns {number[]} output product of ints except at index
 */
function divisionPAllExceptAtIndex(ints) {
  const productArr = [ints[0]];

  ints.forEach((num, i) => {
    if (i > 0) {
      productArr[i] = productArr[i - 1] * num;
    }
  });

  ints.reverse();
  productArr.reverse();

  let multiplicator = ints[0];

  ints.forEach((num, i) => {
    if (i > 0) {
      productArr[i] *= multiplicator;
      multiplicator *= num;
    }
  });

  ints.forEach((num, i) => {
    productArr[i] /= num;
  });

  // reverse it back again lol
  productArr.reverse();
  return productArr;
}

export default {
  slow: slowProductOfAllExceptAtIndex,
  foreach_loop: foreachPAllExceptAtIndex,
  while_loop: whilePAllExceptAtIndex,
  division: divisionPAllExceptAtIndex,
};
