// http://en.wikipedia.org/wiki/Heapsort
// http://rosettacode.org/wiki/Sorting_algorithms/Heapsort
// and the CLRS intro to algorithms version

var dsalgo = require('../../utilities.js').dsalgo;
var maxHeap = require('../../data_structures/heap/binary_heap.js').max;
var swap = dsalgo.utils.swap;

module.exports = function(list) {

  // build a heap does a similar thing to heapify in the wikipiedia version of the algorithm
  // all you care about is that you have a valid heap to start with

  var heap = new maxHeap(list);

  return heap.heapsort();
};
