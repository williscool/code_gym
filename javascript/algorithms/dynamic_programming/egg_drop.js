import dsalgo from '../../utilities';
/**
 * Given some number of floors and some number of ideal eggs, what is the minimum number of attempts it will take to find out from which floor egg will break?
 *
 * Where an ideal egg has the physical properties is such that:
 *
 * - it will shatter if it is dropped from breaking floor (n*) or above,
 * - will have no damage whatsoever if it is dropped from floor below the breaking floor (n* - 1) or below.
 *
 * https://brilliant.org/wiki/egg-dropping/
 *
 * https://en.wikipedia.org/wiki/Dynamic_programming#Egg_dropping_puzzle
 *
 * inspired by:
 * http://www.geeksforgeeks.org/dynamic-programming-set-11-egg-dropping-puzzle/
 * http://datagenetics.com/blog/july22012/index.html
 * https://www.khanacademy.org/computer-programming/egg-drop-problem/1256290535
 * https://web.archive.org/web/20110726180804/http://archive.ite.journal.informs.org/Vol4No1/Sniedovich/index.php
 * http://stackoverflow.com/a/25239471/511710
 * https://www.youtube.com/watch?v=3hcaVyX00_4
 *
 * @module EggDrop
 */

/**
 * The naive iteration of egg drop
 *
 * @param {number} n number of eggs
 * @param {number} k number of floors to be tested
 * @returns {number} number of drops needed to find the critical height in the worst case
 */
function naiveEggDrop(n, k) {
  // n eggs
  // k floors

  // 0 or 1 floors
  if (k <= 1) return k;

  // 1 egg
  if (n === 1) return k;

  let min = Number.POSITIVE_INFINITY; // init this postion to something the final answer will defintely be lower than

  // n eggs
  for (let x = 1; x <= k; x += 1) {
    // The 1 represents the "cost" of one trial of whether or not the egg breaks
    // re: Lemma 5 from the Sniedovich paper/website
    //
    // Why the Max? We will ultimately be looking to minimize(thus the min of the result) the worst-case (highest number in the sub problems of each branch) number of eggs dropped
    //
    // the left side of Math.max function assumes...
    // the egg broke at this floor and recursively calls the eggDrop function again on the remaining (k - 1) floors with the remaining (n-1) eggs
    //
    // the right side on the other hand assumes ...
    // this floor DID NOT break the egg and recursively calls the eggDrop function with n eggs (since none broke) and (k - x) floors.
    // Where x is the interval we are skipping because if this floor did not break the egg neither will the floors below it

    const result = 1 + Math.max(naiveEggDrop(n - 1, x - 1), naiveEggDrop(n, k - x));
    min = Math.min(min, result);
  }

  return min;
}

const cache = dsalgo.utils.simpleSet();
/**
 * Top Down Egg Drop
 *
 * Time Complexity: O(nk^2)
 * inspired by: http://algohub.blogspot.in/2014/05/egg-drop-puzzle.html
 *
 * @param {number} n number of eggs
 * @param {number} k number of floors to be tested
 * @returns {number} number of drops needed to find the critical height in the worst case
 */
function topDownEggDrop(n, k) {
  const cacheKey = `${n}:${k}`;

  if (cache[cacheKey]) return cache[cacheKey];

  // 0 or 1 floors
  if (k <= 1) return k;

  // 1 egg
  if (n === 1) return k;

  let min = Number.POSITIVE_INFINITY;

  // n eggs
  for (let x = 1; x <= k; x += 1) {
    const result = 1 + Math.max(topDownEggDrop(n - 1, x - 1), topDownEggDrop(n, k - x));
    min = Math.min(min, result);
  }

  cache[cacheKey] = min;
  return min;
}

/**
 * Bottom up memoization of egg drop problem
 *
 * @param {number} n number of eggs
 * @param {number} k number of floors to be tested
 * @returns {number} number of drops needed to find the critical height in the worst case
 */
function bottomUpEggDrop(n, k) {
  const memo = dsalgo.utils.create2Darray(n + 1, k + 1); // initlize 2d array memoization table

  // We need 0 trials for 0 floors and one trial for one floor
  for (let i = 0; i <= n; i += 1) {
    memo[i][0] = 0;
    memo[i][1] = 1;
  }

  // We always need j trials for one egg and j floors.
  for (let j = 0; j <= k; j += 1) {
    memo[1][j] = j;
  }

  // calculate the [n][k]th index using the table
  for (let i = 2; i <= n; i += 1) {
    for (let j = 2; j <= k; j += 1) {
      memo[i][j] = Number.POSITIVE_INFINITY; // init this postion to something the final answer will defintely be lower than

      for (let x = 1; x <= j; x += 1) {
        const result = 1 + Math.max(memo[i - 1][x - 1], memo[i][j - x]);
        memo[i][j] = Math.min(memo[i][j], result);
      }
    }
  }

  return memo[n][k];
}

// fun thing for another time write b search O(nk log k)
// https://en.wikipedia.org/wiki/Dynamic_programming#Faster_DP_solution_using_a_different_parametrization
// https://brilliant.org/wiki/egg-dropping/

export default {
  naive: naiveEggDrop,
  top_down: topDownEggDrop,
  bottom_up: bottomUpEggDrop,
};
