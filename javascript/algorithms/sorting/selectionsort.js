// http://en.wikipedia.org/wiki/Selection_sort
var dsalgo = require('../../utilities.js').dsalgo;
var swap = dsalgo.utils.swap;

module.exports = function(list) {

  var len, i, j, iMin;

  len = list.length;

  for (j = 0; j < len - 1; j++) {
    // start with first element in array assuming its the smallest
    iMin = j;

    for (i = j + 1; i < len; i++) {

      if (list[i] < list[iMin]) {
        // swap out any smaller values
        iMin = i;
      }
    }

    // unless its the value we started this iteration with
    if (iMin != j) {
      // move this value to its correct place in the list
      list = swap(list, j, iMin);
    }

  }

  return list;
};
