// http://en.wikipedia.org/wiki/Priority_queue
//
// so we are gonna do naive where dequene 
//
// will start from the front of quene and look for the highest prority element to the 
// end and only change the element if another element's priority is higher
//
// then we'll do one for each of the 3 heaps we've already written
var dsalgo = require('../utilities.js').dsalgo;

module.exports.priorityQueue = {};

function naivePQ() {
  this.items = [];
}

naivePQ.prototype.enqueue = function(val, p){
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

naivePQ.prototype.peek = function(val){
  return this.findHighest().value;
}

module.exports.priorityQueue.naive = naivePQ;
