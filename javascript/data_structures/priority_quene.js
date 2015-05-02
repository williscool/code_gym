// http://en.wikipedia.org/wiki/Priority_queue
//
// so we are gonna do naive where dequene 
//
// will start from the front of quene and look for the highest prority element to the 
// end and only change the element if another element's priority is higher
//
// then we'll do one for each of the 3 heaps we've already written
var dsalgo = require('../utilities.js').dsalgo;
var BinaryHeap = require('./heap/binary_heap.js').custom;
var BinomialHeap = require('./heap/binomial_heap.js');

module.exports.priorityQueue = {};

function naivePQ() {
  this.items = [];
}

naivePQ.prototype.enqueue = function(val, p){
  // default could be negative infinity if you wanted 
  p = dsalgo.utils.isDefined(p) ? p : 0;
  this.items.push({priority: p, value: val});
  return this;
}

naivePQ.prototype.findHighest = function(val){
  // need to get item with highest prority
  //
  // assume its item one with whatever prority than look for any item higher
  //
  // http://jsperf.com/comparison-of-numbers
  // 
  // obviously this is an O(n) operation.
  var highItem;
  var highest = Number.NEGATIVE_INFINITY;
  var tmp;
  for (var i = 0; i < this.items.length ; i++) {
    tmp = this.items[i].priority;
    
    if(tmp > highest) {
      highest = tmp;
      highItem = this.items[i];
      highItem.index = i;
    }
  }
  return highItem;
}

naivePQ.prototype.dequeue = function(){
  this.items.splice(this.findHighest().index, 1);
  return this;
}

naivePQ.prototype.peek = function(){
  return this.findHighest().value;
}


function binaryHeapPQ(){
  // have to break ties with the order values were inserted in
  //
  // http://stackoverflow.com/a/6909699/511710
  // http://algs4.cs.princeton.edu/25applications/StableMinPQ.java.html

  this.heap = new BinaryHeap([], function (a,b) {
    if (a.priority != b.priority) return a.priority >= b.priority;

    // this takes a bit of explaining see on line 132 inside the siftDown function
    // of my heap I compare the elements being compared to do heap rotations with 
    // the comparision function in an array and take the last value
    // so we need that last value to be the first element in the order of the quene
    //
    return a.order < b.order;
  });
}
binaryHeapPQ.prototype.enqueue = function(val, p){
  // default could be negative infinity if you wanted 
  p = dsalgo.utils.isDefined(p) ? p : 0;
  this.heap.insert({priority: p, value: val, order: this.size()});
  return this;
}
binaryHeapPQ.prototype.dequeue = function(){
  this.heap.pop();
  return this;
}

binaryHeapPQ.prototype.peek = function(){
  return this.heap.peek().value;
}
binaryHeapPQ.prototype.size = function(){
  return this.heap.size();
}




function binomialHeapPQ(){
  // Give a binomial heap the right comparator and it will work 
  // as a stable prority queue like magic
  //
  // who knew?

  this.heap = new BinomialHeap(function(a,b) {
    if (a.key != b.key) return a.key >= b.key;
    return a.value.order < b.value.order;
  });
}

binomialHeapPQ.prototype.enqueue = function(val, p){
  p = dsalgo.utils.isDefined(p) ? p : 0;

  this.heap.insert(p,{value: val, priority:p, order:this.size()});
  return this;
}

binomialHeapPQ.prototype.dequeue = function(){
  var test = this.heap.pop();
  return this;
}

binomialHeapPQ.prototype.peek = function(){
  return this.heap.peek().value;
}

binomialHeapPQ.prototype.size = function(){
  return this.heap.size;
}

module.exports.priorityQueue.naive = naivePQ;
module.exports.priorityQueue.binaryHeap = binaryHeapPQ;
module.exports.priorityQueue.binomialHeap = binomialHeapPQ;
