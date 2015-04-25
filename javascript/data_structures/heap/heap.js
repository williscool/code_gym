// Heap http://en.wikipedia.org/wiki/Heap_%28data_structure%29#Implementation
var dsalgo = require('../../utilities.js').dsalgo;
var swap = dsalgo.utils.swap;
var seqsearch = require('../../algorithms/searching/sequentialsearch.js');

function Heap(array, compfn) {
  // default to max heap
  // need to set comparator first or it wont be set for the constructors call to heapify
  this.comp = compfn || function (a,b) {return a>b;};
  
  if (dsalgo.utils.isFalsy(array)){
    this.items = [];
  } else {
    this.items = array;
    if(array.length > 1) this.heapify();
  }
}

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

Heap.prototype.heapify = function() {this.siftUp(this.items.length - 1);};

Heap.prototype.insert = function (val) {
  this.items.push(val);
	if(this.items.length > 1) {
      this.siftUp(this.items.length - 1);
	}
  return this;
}

Heap.prototype.peek = function(val){
  return this.items[0];
}

Heap.prototype.size = function(){
  return this.items.length;
}

module.exports = Heap;
