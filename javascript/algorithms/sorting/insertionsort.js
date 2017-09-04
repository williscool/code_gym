// http://en.wikipedia.org/wiki/Insertion_sort
var dsalgo = require('../../utilities.js').default;
var swap = dsalgo.utils.swap;

var naive = function(list) {

  var len, i, j;

  len = list.length;

  // for each value in the list starting with the second
  for (i = 1; i < len; i++) {
    j = i;

    // while this value j is greater than zero AND value at list[j] is lower than left previous value
    //
    // j greater than zero makes sure to not go out of bounds to the left when looking to move the value back
    //
    // greater than previous value keeps the while going until we find a value that list[j] is greater than
    //
    while (j > 0 && list[j - 1] > list[j]) {
      list = swap(list, j, j - 1);
      // --j != j--
      // http://en.wikipedia.org/wiki/Increment_and_decrement_operators
      // https://www.youtube.com/watch?v=VbvNp6AjwM8
      //
      // j = j - 1;
      --j;
    }
  }

  return list;
};

var optimized = function(list) {

  var len, i, j, value_being_sorted_now;

  len = list.length;

  for (i = 1; i < len; i++) {
    // store this val to swap into its new place only after we are done moving higher values in front of it
    value_being_sorted_now = list[i];
    j = i;

    while (j > 0 && list[j - 1] > value_being_sorted_now) {
      list[j] = list[j - 1];
      j = j - 1;
    }

    list[j] = value_being_sorted_now;
  }

  return list;
};

module.exports = {
  naive: naive,
  optimized: optimized
};
