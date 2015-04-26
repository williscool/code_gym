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
    //http://stackoverflow.com/a/19708033/511710
    array.forEach(function(val){ this.insert(val) }, this);
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

  // extrema is semantic to largest or smallest
  // http://en.wikipedia.org/wiki/Extrema

  var extremaPos = i;
  var extremaVal = this.items[i];

  var leftI = this.leftI(i);
  var rightI = this.rightI(i);

  var left = this.left(i);
  var right = this.right(i);

  if(dsalgo.utils.isTruthy(leftI < this.size() && this.comp(left, extremaVal ) )){
    extremaPos = leftI;
  }

  if(dsalgo.utils.isTruthy(rightI < this.size() && this.comp(right, extremaVal ) )){
    extremaPos = rightI;
  }

  // compare values if they both exist
  if(leftI < this.size() && rightI < this.size()){
    var extrema_of_two_i, extrema_of_two;
    var comp_arr = [left,right];
    // take highest or lowest every time
    var extrema_of_two_i; 
    var extrema_of_two = comp_arr.sort(this.comp).pop();

    if(extrema_of_two == left) extrema_of_two_i = leftI;
    if(extrema_of_two == right) extrema_of_two_i = rightI;
  
    if(this.comp(extrema_of_two, extremaVal)){
      extremaPos = extrema_of_two_i;
    }
  }

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
//
// make each sub tree a proper heap by picking the comp () of the childrne
Heap.prototype.heapify = function() {
  // idk what im doing lol
};

Heap.prototype.peek = function(val){
  return this.items[0];
}

Heap.prototype.size = function(){
  return this.items.length;
}

module.exports.heap = {};
module.exports.heap.max = Heap;
