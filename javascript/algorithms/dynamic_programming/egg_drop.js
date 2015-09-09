// https://en.wikipedia.org/wiki/Dynamic_programming#Egg_dropping_puzzle
//
// inspired by: 
// http://www.geeksforgeeks.org/dynamic-programming-set-11-egg-dropping-puzzle/
// http://datagenetics.com/blog/july22012/index.html
// https://www.khanacademy.org/computer-programming/egg-drop-problem/1256290535
// https://web.archive.org/web/20110726180804/http://archive.ite.journal.informs.org/Vol4No1/Sniedovich/index.php
// http://stackoverflow.com/a/25239471/511710

function naiveEggDrop(n, k) {

  // n eggs
  // k floors

  // 0 or 1 floors
  if (k <= 1) return k;

  // 1 egg
  if (n == 1) return k;

  var min = Number.POSITIVE_INFINITY,
    x,
    result;

  // n eggs
  for (x = 1; x <= k; x++) {
    // the left side of Math.max function assumes the egg broke at this floor and recursively calls the eggDrop function again on the remaining (k - 1) floors with the remaining (n-1) eggs 
    //
    // the right side on the other hand assumes this floor DID NOT break the egg and recursively calls the eggDrop function with n eggs (since none broke) and (k - x)  floors. Where x is the interval we are skipping because if this floor did not break the egg neither will the floors below it
    //
    // The 1 represents the "cost" of one trial of whether or not the egg breaks  
    // re: Lemma 5 from the Sniedovich paper/website

    result = 1 + Math.max(naiveEggDrop(n - 1, x - 1), naiveEggDrop(n, k - x));
    if (result < min)
      min = result;
  }

  return min;
}

// inspired by: http://algohub.blogspot.in/2014/05/egg-drop-puzzle.html
var dsalgo = require('../../utilities.js').dsalgo;
var cache = dsalgo.utils.simpleSet();

function dpEggDrop(n, k) {

  var cacheKey = n + ":" + k;

  if (cache[cacheKey]) return cache[cacheKey];

  // 0 or 1 floors
  if (k <= 1) return k;

  // 1 egg
  if (n == 1) return k;

  var min = Number.POSITIVE_INFINITY,
    x,
    result;

  // n eggs
  for (x = 1; x <= k; x++) {
    result = 1 + Math.max(dpEggDrop(n - 1, x - 1), dpEggDrop(n, k - x));
    if (result < min)
      min = result;
  }

  cache[cacheKey] = min;
  return min;
}


module.exports = {
  naive: naiveEggDrop,
  dp: dpEggDrop
};
