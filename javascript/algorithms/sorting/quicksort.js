// http://en.wikipedia.org/wiki/Quicksort
// inplace
var dsalgo = require('../../utilities.js').default;
var swap = dsalgo.utils.swap;

function quicksort(list, lo, hi) {

  if (lo < hi) {
    var index_of_pivot = partition(list, lo, hi);
    quicksort(list, lo, index_of_pivot - 1);
    quicksort(list, index_of_pivot + 1, hi);
  }

  return list;
}

// https://www.youtube.com/watch?v=pZ12_E5R3qc
function partition(list, lo, hi) {

  var pivotIndex, pivotVal, i, index_to_move_value_to;

  // pick our pivot value
  pivotIndex = choosePivot(lo, hi);
  pivotVal = list[pivotIndex];

  // move the value of the pivot to the highest index so that it is out of the way
  // while we compare all of the other element's values to it to figure out where to move it to

  list = swap(list, pivotIndex, hi);
  index_to_move_value_to = lo;

  //once this for loop completes every value before index_to_move_value_to will be lower than pivotVal and everyone after will be higher
  for (i = lo; i < hi; i++) {

    if (list[i] < pivotVal) {
      list = swap(list, i, index_to_move_value_to);
      index_to_move_value_to = index_to_move_value_to + 1;
    }
  }

  // now that the other elements are in their new positions we can move the pivot value to its final place.
  list = swap(list, index_to_move_value_to, hi);

  // then we return the value of the index we just put the pivot in
  // that is our new pivot index
  return index_to_move_value_to;
}

function choosePivot(hi, lo) {
  // lol worthy thing that happend with this function
  //
  // so you gotta make sure your order of operations is correct
  // because if this pivot returns and incorrect index everything is fucked
  //
  // http://googleresearch.blogspot.com/2006/06/extra-extra-read-all-about-it-nearly.html
  //
  // I prefer using the midpoint but some algos call for using the first aka lo
  // i.e. https://www.hackerrank.com/challenges/quicksort2
  //
  // https://en.wikipedia.org/wiki/Quicksort#Choice_of_pivot
  //
  return (hi + lo) >> 1;
}

module.exports = function(list) {
  return quicksort(list, 0, list.length - 1);
};
//
// super awesome short quick sort
//
// http://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Quicksort#JavaScript
// But I guess its out of place because it creates new arrays and then adds them all back together at the end
