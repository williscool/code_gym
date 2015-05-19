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

function heapValueToString (a) {
    var string = a.value + ":" + a.order;
    return string;
}

function binaryHeapPQ(binHeap){
  // have to break ties with the order values were inserted in
  //
  // http://stackoverflow.com/a/6909699/511710
  // http://algs4.cs.princeton.edu/25applications/StableMinPQ.java.html

  this.heap = binHeap || new BinaryHeap([], function (a,b) {
    if (a.priority != b.priority) return a.priority >= b.priority;

    // this takes a bit of explaining see around line 132 inside the siftDown function
    // of my heap I compare the elements being compared to do heap rotations with 
    // the comparision function in an array and take the last value
    // so we need that last value to be the first element in the order of the quene
    //
    return a.order < b.order;
  });

  // I just didnt want to add yet another function to the constructor 
  // pls dont judge me
  this.heap.valueToString = heapValueToString;
}

binaryHeapPQ.prototype.enqueue = function(val, p){
  // default could be negative infinity if you wanted 
  // But I think zero is more useful as it allows you to reproritize both postively and negatively

  p = dsalgo.utils.isDefined(p) ? p : 0;
  this.heap.insert({priority: p, value: val, order: this.size()});
  return this;
}

binaryHeapPQ.prototype.dequeue = function(){
  return this.heap.pop().value;
}

binaryHeapPQ.prototype.peek = function(){
  return this.heap.peek().value;
}
binaryHeapPQ.prototype.size = function(){
  return this.heap.size();
}

binaryHeapPQ.prototype.changePriority = function(val,newPriority,order){
  // So there are several ways to accomplish what this function is set to do with a binary heap
  //
  // for instance
  // you could search for the value in the array representing the heap remove the value and then reinsert it
  // 
  // but that operation is O(n * log(n))
  // O(n) to find the element and then log(n) to resatify the heap property
  //
  // not to mention we would need to do that operation V times (on each vertex) in the worse case in djikstra.
  //
  // so we can do better. though it will cost us O(n) extra space for our faster algorithm
  //
  // all we need to do maintain a set along side of our binary heap that keeps track of where
  // each value is in the heap as we update it
  //
  // and binary heap was updated to do so
  //
  // http://en.wikipedia.org/wiki/Dijkstra's_algorithm#Running_time
  
  var orderInserted = null;
  // REMEMBER Order is the insertion order of a zero indexed array

  if(!dsalgo.utils.isDefined(order)) {
    
    // if the user doesn't define an order we have to linear search for the value
    // this is obviously O(n). but we will be using this with djikstra's algorithm in which we will know the insertion order 
    // greatly increasing the total speed of this whole operation

    var totalElements = this.heap.size();
    var i = 0;
    while(i < totalElements){
    
      var testObj = {value: val, order: i};
      var index = this.heap.contains(testObj);
      if ( index !== false){
         orderInserted = i ;
         break;
      } 

      i = i + 1;
    }

  } else {
    orderInserted = order;
  }

  // why will this work? 
  // because our toString function for this heap only looks at the value and the order it was inserted in
  var oldValueObj =  {value: val, order: orderInserted};

  var indexInQueue = this.heap.contains(oldValueObj);

  if(indexInQueue === false) return false; // value isnt here we are done

  var newValueObj = {priority: newPriority, value: val, order: orderInserted};

  this.heap.updateValue(oldValueObj , newValueObj);
  return indexInQueue;
}


function binomialHeapPQ(heap){
  // Give a binomial heap the right comparator and it will work 
  // as a stable prority queue like magic
  //
  // who knew?

  this.heap = heap || new BinomialHeap(function(a,b) {
    if (a.key != b.key) return a.key >= b.key;
    return a.value.order < b.value.order;
  });
  
  // still didnt want to add yet another function to the constructor 
  // again pls dont judge me
  this.heap.valueToString = heapValueToString;
}

binomialHeapPQ.prototype.enqueue = function(val, p){
  p = dsalgo.utils.isDefined(p) ? p : 0;

  this.heap.insert(p,{value: val, priority:p, order:this.size()});
  return this;
}

binomialHeapPQ.prototype.dequeue = function(){
  return this.heap.pop().value;
}

binomialHeapPQ.prototype.peek = function(){
  return this.heap.peek().value;
}

binomialHeapPQ.prototype.size = function(){
  return this.heap.size;
}

var bionomialAndFibchangePriority = function(val,newPriority,order){
  var orderInserted = null;
  // REMEMBER Order is the insertion order of a zero indexed array

  if(!dsalgo.utils.isDefined(order)) {

    // slow linear search we wont have to do in djikstra
    var totalElements = this.size();
    var i = 0;
    while(i < totalElements){
    
      var testObj = {value: val, order: i};
      var node = this.heap.contains(testObj);
      if ( node !== false){
         orderInserted = i ;
         break;
      } 

      i = i + 1;
    }

  } else {
    orderInserted = order;
  }

  // why will this work? 
  // because our toString function for this heap only looks at the value and the order it was inserted in
  var oldValueObj =  {value: val, order: orderInserted};

  var node = this.heap.contains(oldValueObj);

  if(node === false) return false; // value isnt here we are done

  // remember this is a reference to the actual node in the tree
  //  so we can just update the priority on it directly
  node.value.priority = newPriority;

  this.heap.decreaseKey(node, newPriority);
  
}

binomialHeapPQ.prototype.changePriority = bionomialAndFibchangePriority;

function fibonacciHeapPQ(heap){
  // Give a fibonacci heap the right comparator and it will work 
  // as a stable prority queue like magic too
  //
  // again who knew?

  // this instantiation is ugly would like to clean it up
  this.heap = heap || new FibonacciHeap(null, 0, function(a,b) {
    if (a.key != b.key) return a.key >= b.key;
    return a.value.order < b.value.order;
  });
  
  // still didnt want to add yet another function to the constructor 
  // 
  // I regret nothing
  this.heap.valueToString = heapValueToString;
}

fibonacciHeapPQ.prototype.enqueue = function(val, p){
  p = dsalgo.utils.isDefined(p) ? p : 0;

  this.heap.insert(p,{value: val, priority:p, order:this.size()});
  return this;
}

fibonacciHeapPQ.prototype.dequeue = function(){
  return this.heap.pop().value;
}

fibonacciHeapPQ.prototype.peek = function(){
  return this.heap.peek().value;
}

fibonacciHeapPQ.prototype.size = function(){
  return this.heap.size;
}

fibonacciHeapPQ.prototype.changePriority = bionomialAndFibchangePriority;

module.exports.priorityQueue.naive = naivePQ;
module.exports.priorityQueue.binaryHeap = binaryHeapPQ;
module.exports.priorityQueue.binomialHeap = binomialHeapPQ;
module.exports.priorityQueue.fibonacciHeap = fibonacciHeapPQ;
