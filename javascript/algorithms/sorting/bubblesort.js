// http://en.wikipedia.org/wiki/Bubble_sort#Implementation
// https://www.youtube.com/watch?v=hR-NXv5Tma0
// bubble bubble..

var dsalgo = require('../../utilities.js').dsalgo;
var swap = dsalgo.utils.swap;

var naive = function(list) {

  var len, sorted, i;

  len = list.length;

  do {
    // assume array is sorted at first and let the for loop tell us if it isn't
    sorted = true;

    for (i = 1; i < len; i++) {

      if (list[i - 1] > list[i]) {
        list = swap(list, i - 1, i);
        sorted = false;
      }
    }

  } while (!sorted);

  return list;
};

var optimized = function(list) {

  var len, sorted, i;

  len = list.length;

  do {
    // assume array is sorted at first and let the for loop tell us if it isn't
    sorted = true;

    for (i = 1; i < len; i++) {

      if (list[i - 1] > list[i]) {
        list = swap(list, i - 1, i);
        sorted = false;
      }
    }

    // now all we need to is decrement the number of elements to look at
    // the last item on each iteration is already in the correct place
    //
    // it.. wait for it... bubbled.. to the top
    // http://cow.org/csi/
    len = len - 1;
  } while (!sorted);

  return list;
};

var stopAtLastSorted = function(list) {
  // this algorithm assumes that the last element we had to swap was the last element out of place at that iteration
  // so it shortens the amount of elements looked at on subsequent iterations by that many

  var len, sorted, i, newLen;

  len = list.length;

  do {
    newLen = 0;
    for (i = 0; i < len; i++) {

      if (list[i - 1] > list[i]) {
        list = swap(list, i - 1, i);
        newLen = i;
      }
    }

    len = newLen;
  } while (len !== 0);

  return list;
};

module.exports = {
  naive: naive,
  optimized: optimized,
  stopAtLastSorted:stopAtLastSorted
};
