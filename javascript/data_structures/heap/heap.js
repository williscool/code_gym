// Heap http://en.wikipedia.org/wiki/Heap_%28data_structure%29#Implementation
//
// inspired by
//
// http://eloquentjavascript.net/1st_edition/appendix2.html
//
// https://gist.github.com/dburger/1008320
//
// http://docs.closure-library.googlecode.com/git/local_closure_goog_structs_heap.js.source.html
// https://github.com/google/closure-library/blob/master/closure/goog/structs/heap.js
//
// http://www.bebetterdeveloper.com/data-structure-binary-heap/
//
// https://github.com/thauburger/js-heap/blob/master/heap.js
//// http://www.benfrederickson.com/heap-visualization/

var dsalgo = require('../../utilities.js').dsalgo;
var swap = dsalgo.utils.swap;
var seqsearch = require('../../algorithms/searching/sequentialsearch.js');

function Heap(array, compfn) {
  // default to max heap
  // need to set comparator first or it wont be set for the constructors call to siftUp
  // heaps children can be == to also
  this.comp = compfn || function (a,b) {return a>=b;};
  
  // always set to an array at first
  this.items = [];

  if (array){
    this.items = array;
    this.buildHeap();
  }
}

Heap.prototype.valueAt = function (i) {return this.items[i];};

Heap.prototype.parentI = function (i) {return (i - 1) >> 1;};

// left and right children
Heap.prototype.leftI = function (i) {return ( i * 2 ) + 1;};
Heap.prototype.rightI = function (i) {return ( i * 2 ) + 2;};

Heap.prototype.left = function (i) {return this.items[this.leftI(i)];};
Heap.prototype.right = function (i) {return this.items[this.rightI(i)];};

Heap.prototype.contains = function(val) {return seqsearch(this.items,val);};

Heap.prototype.siftUp = function(i){
  if(i < 1) return; // once we hit the zeroth index we're done
  
  var parentI = this.parentI(i);
  // not running this in a browser on the window object so name is cool
  var parent = this.items[parentI];

  var currentIVal = this.items[i];

  if(this.comp(currentIVal,parent)){
    this.items = swap(this.items, i, parentI);
    // obviously this is the recursive style you could do it iteratively ala bubbleUp here
    // http://eloquentjavascript.net/1st_edition/appendix2.html
    this.siftUp(parentI);
  }

}

Heap.prototype.insert = function (val) {
  this.items.push(val);
  if(this.size() > 1) this.siftUp(this.items.length - 1);
  return this;
}

Heap.prototype.siftDown = function(i){
  // aka heapify
  // http://en.wikipedia.org/wiki/Binary_heap
  // interesting thing I've learned from research
  //
  // Many implementations of heaps (even the one from the famous CLRS) 
  // refer to what the main Heap (as opposed to the binary heap) wikipedia article 
  // calls sift-down as heapify

  // extrema is semantic to largest or smallest
  // http://en.wikipedia.org/wiki/Extrema

  var extremaPos = i;
  var extremaVal = this.items[i];

  var leftI = this.leftI(i);
  var rightI = this.rightI(i);

  var left = this.left(i);
  var right = this.right(i);

  // much easier than what I was doing earlier
  // http://www.cs.rit.edu/~rpj/courses/bic2/studios/studio1/studio121.html
  
  // default them to -1 if they are out of bounds which wont ever be a valid array index
  if (!dsalgo.utils.isDefined(left)) left = -1;
  if (!dsalgo.utils.isDefined(right)) right = -1;

  var comp_arr = [extremaVal,left,right];
  var extrema = comp_arr.sort(this.comp).pop();

  // http://algs4.cs.princeton.edu/24pq/
  // "if records can have duplicate keys, maximum means any record with the largest key value"
  //
  // so I pick to always default to not shifting the tree again
  
  if(extrema == left) extremaPos = leftI;
  if(extrema == right) extremaPos = rightI;
  if(extrema == extremaVal) extremaPos = extremaPos;  //default back to leaving tree alone

  if(extremaPos != i){
    this.items = swap(this.items, extremaPos, i);
    this.siftDown(extremaPos);
  }
}

// aka extract-min||max http://en.wikipedia.org/wiki/Heap_%28data_structure%29#Operations
Heap.prototype.pop = function (val) {
  var retValue = this.items[0];
  var lastValue = this.items.pop();

  // sift it down 
  if(this.size() > 1){ 
    // pop off the last value to shorten array and set it as the new root of the array
    this.items[0] = lastValue;

    // sift it down into position
    this.siftDown(0);
  }  
  
  return retValue;
}

// remove abritraty value and re heap
// http://eloquentjavascript.net/1st_edition/appendix2.html
Heap.prototype.remove = function(val) {
  var inHeap = this.contains(val);

  // 0 == false in javascript even though its a valid index so we must explicitly check for false
  if(inHeap === false ) return false;

  // else
  
  var last = this.items.pop();

  if (val == last) return inHeap; // we done return the index we removed it from

  // swap end to the elements position and then reheap
  this.items[inHeap] = last;
  this.siftUp(inHeap);
  this.siftDown(inHeap);
  return inHeap;
  
  // dont know what returning the index you removed from could be useful for but why not?
  // you could also just return true
}

Heap.prototype.buildHeap = function() {
  //  the old way I was doing it was the naive version 
  //
  //  in that you just call insert for each element in the array and its O(n log n)
  //  
  //  this is now the optimized version 
  //  http://en.wikipedia.org/wiki/Binary_heap#Building_a_heap

  for (var i = (this.size() - 1) >> 1; i >=0 ; i--) {
    this.siftDown(i);
  }
};

Heap.prototype.peek = function(val){
  return this.items[0];
}

Heap.prototype.size = function(){
  return this.items.length;
}

module.exports.heap = {};
module.exports.heap.max = Heap;
