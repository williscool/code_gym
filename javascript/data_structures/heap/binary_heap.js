// http://en.wikipedia.org/wiki/Binary_heap
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
//
//
// also why heaps are mostly done with arrays
// http://stackoverflow.com/questions/14719007/why-is-a-binary-heap-better-as-an-array-than-a-tree

var util = require("util");
var dsalgo = require('../../utilities.js').dsalgo;
var swap = dsalgo.utils.swap;
var seqsearch = require('../../algorithms/searching/sequentialsearch.js');

function Heap(array, compfn) {
  // default to max heap
  // need to set comparator first or it wont be set for the constructors call to siftUp
  // heaps children can be == to also
 
  // should better handle only passing a comparison function instead of just an array
  // weird errors happen if you set array to a function;
  
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

Heap.prototype.peek = function(val){
  return this.items[0];
}

Heap.prototype.size = function(){
  return this.items.length;
}

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

Heap.prototype.siftDown = function(i,endPos){
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
  
  // default them to false now because the filter used on comp arr would drop anything
  // that evaluates to false in the comparison of '> -1' which includes objects lol
  // which had the unforunate side effect of making this stucture not properly store anything but integers
  //
  // BUT WARNING THARE BE DRAGONS!!!
  //
  // in javascript 0==false
  //
  // so everwhere in this function MUST USE ===
  //
  if (!dsalgo.utils.isDefined(left)) left = false;
  if (!dsalgo.utils.isDefined(right)) right = false;

  if (dsalgo.utils.isDefined(endPos)){
    // if either index value is greater than the endPos in a heapsort 
    //
    // it is in the sorted part the array and will be ignored for sifting the value down the heap
    
    if (rightI > endPos) right = false;
    if (leftI > endPos) left = false;
  } 

  var comp_arr = [extremaVal,left,right];
  
  // also need to drop any values less than zero to discard outof bounds indexes
  //
  var extrema = comp_arr.sort(this.comp).filter(function(val){return val !== false;}).pop();

  // http://algs4.cs.princeton.edu/24pq/
  // "if records can have duplicate keys, maximum means any record with the largest key value"
  //
  // so I pick to always default to not shifting the tree again
  
  if(extrema === left) extremaPos = leftI;
  if(extrema === right) extremaPos = rightI;
  if(extrema === extremaVal) extremaPos = extremaPos;  //default back to leaving tree alone

  if(extremaPos !== i){
    this.items = swap(this.items, extremaPos, i);
    this.siftDown(extremaPos,endPos);
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

Heap.prototype.heapsort = function(){
 // note about this function. it can break the heap property of this data structure if you dont restore it!
 //
 // how to handle this?
 // either re heap after or create a copy of the items in original order and reset them later
 
  // store the array in its orginal heapified for so we can restore it later
  var heapified_list = dsalgo.utils.arrayDeepCopy(this.items);

  var i,len = this.size();

  var end = len -1;

  // sort the list
  //
  // how? what do we know about a max heap? 
  //
  // the highest value is at the top...
  //
  // so knowing that we can move that value to the end and then make another heap out of the remaining elements 
  //
  // ignoring our previously swapped element
  //
  // what will this give us? at the top our next highest element! so we repeat this until we reach the end of the list :)

  for (var i = len - 1 ; i > 0 ; i--) {
    this.items = swap(this.items, 0,i);
    end = end -1;
    this.siftDown(0,end);
  }

  var sorted_list = this.items;

  // restore 
  this.items = heapified_list;

  return sorted_list;
}

// min is the same logic as max just with a different comparator
function minHeap (array) {
    var comp = function (a,b) {return a<=b;};
    minHeap.super_.prototype.constructor.call(this, array, comp);
}

util.inherits(minHeap, Heap);

function maxHeap (array) {
    var comp = function (a,b) {return a>=b;};
    maxHeap.super_.prototype.constructor.call(this, array, comp);
}
util.inherits(maxHeap, Heap);

module.exports = {
  min: minHeap,
  max: maxHeap,
  custom: Heap
};
