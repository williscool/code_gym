// http://en.wikipedia.org/wiki/Priority_queue
//
// so there is naive where #dequene()
//
// starts from the front of quene and looks for the highest/lowest prority element to the 
// end and only change the element if another element's priority is higher
//
// then we'll do one for each of the 3 heaps we've already written

var dsalgo = require('../utilities.js').dsalgo;
var BinaryHeap = require('./heap/binary_heap.js').custom;
var BinomialHeap = require('./heap/binomial_heap.js');
var FibonacciHeap = require('./heap/fibonacci_heap.js');

module.exports.priorityQueue = {};

function naivePQ(extreme,comp) {
  this.items = [];

  if(arguments.length > 0 && arguments.length < 2) throw new Error("need to define extreme and compartor for function to work correctly");

  // default to max pq
  this.extreme = dsalgo.utils.isDefined(extreme) ? extreme : Number.NEGATIVE_INFINITY;
  this.comp = comp || function(a,b) {return a > b};

}

naivePQ.prototype.enqueue = function(val, p){
  // default could be negative infinity if you wanted 
  //
  // But I'm assuming you would want the default to be neutral.
  // So you could proritize or deproritize based on your explicity settings 

  p = dsalgo.utils.isDefined(p) ? p : 0;
  this.items.push({priority: p, value: val});
  return this;
}

naivePQ.prototype.findExtreme = function(val){
  // need to get item with highest/lowest prority
  //
  // assume its item one with whatever prority than look for any item higher
  //
  // http://jsperf.com/comparison-of-numbers
  // 
  // obviously this is an O(n) operation.
 
  var extremaItem;
  var extreme = this.extreme;
  var tmp;
  for (var i = 0; i < this.items.length ; i++) {
    tmp = this.items[i].priority;
    
    if(this.comp(tmp,extreme)) {
      extreme = tmp;
      extremaItem = this.items[i];
      extremaItem.index = i;
    }
  }
  return extremaItem;
}

naivePQ.prototype.dequeue = function(){
  this.items.splice(this.findExtreme().index, 1);
  return this;
}

naivePQ.prototype.peek = function(){
  return this.findExtreme().value;
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



function fibonacciHeapPQ(){
  // Give a fibonacci heap the right comparator and it will work 
  // as a stable prority queue like magic too
  //
  // again who knew?

  // this instantiation is ugly would like to clean it up
  this.heap = new FibonacciHeap(null, 0, function(a,b) {
    if (a.key != b.key) return a.key >= b.key;
    return a.value.order < b.value.order;
  });
}

fibonacciHeapPQ.prototype.enqueue = function(val, p){
  p = dsalgo.utils.isDefined(p) ? p : 0;

  this.heap.insert(p,{value: val, priority:p, order:this.size()});
  return this;
}

fibonacciHeapPQ.prototype.dequeue = function(){
  var test = this.heap.pop();
  return this;
}

fibonacciHeapPQ.prototype.peek = function(){
  return this.heap.peek().value;
}

fibonacciHeapPQ.prototype.size = function(){
  return this.heap.size;
}

module.exports.priorityQueue.naive = naivePQ;
module.exports.priorityQueue.binaryHeap = binaryHeapPQ;
module.exports.priorityQueue.binomialHeap = binomialHeapPQ;
module.exports.priorityQueue.fibonacciHeap = fibonacciHeapPQ;
