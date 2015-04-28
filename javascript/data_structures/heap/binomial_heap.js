/* http://en.wikipedia.org/wiki/Binomial_heap
 *
 * inspirations
 * https://mitpress.mit.edu/sites/default/files/Chapter%2019.pdf
 * https://github.com/Tyriar/js-data-structures/blob/master/src/binomial-heap.js
 * http://xlinux.nist.gov/dads/HTML/binomialheap.html
 * http://www.growingwiththeweb.com/2014/01/binomial-heap.html
 * http://www.cse.yorku.ca/~aaw/Sotirios/BinomialHeapAlgorithm.html
*/

var dsalgo = require('../../utilities.js').dsalgo;

function BinomialHeap(compfn) {
  this.root = null;
  this.size = 0;

  // didnt feel like complicating this code with a comparator
  // could bring it back later
  // but most references to this data structure only say it support the min heap property
  //
  // even the last version of CLRS it was in
  //
  // default to min heap
  // this.comp = compfn || function (a,b) {return a<=b;};

}

BinomialHeap.prototype.findMin = function(){
  if(!this.root) return;

  var min = this.root;
  var next = min.sibling;
  
  while(next) {
    if(next.key <= min.key){ // comp
       min = next;
    }

    next = next.sibling;
  }

  return min;
}

BinomialHeap.prototype.peek = BinomialHeap.prototype.findMin;

BinomialHeap.prototype.linkTreeNodes = function(node, other) {
  other.parent = node; 
  other.sibling = node.child;
  node.child = other;
  node.degree++;
}

BinomialHeap.prototype.mergeHeaps = function(a, b) {

  // all we are doing here is merging the linked list that represents 
  // the roots of the each sub binomial tree a and b in order 
  //
  // we aren't doing anything else to the tree right now
  
  if(!a.root) {
    return b.root;
  } else if (!b.root) {
    return a.root;
  } else {
    var root;
    var aNext = a.root;
    var bNext = b.root;

    if(a.root.degree <= b.root.degree){
      root = a.root; 
      aNext = aNext.sibling;
    } else {
      root = b.root; 
      bNext = bNext.sibling;
    }

     var tail = root;

     while (aNext && bNext) {
        if(aNext.degree <= bNext.degree){
          tail.sibling = aNext; 
          aNext = aNext.sibling;
        } else {
          tail.sibling = bNext; 
          bNext = bNext.sibling;
        }

        tail = tail.sibling;
     }

     // finally once we reach the end of either previous root chain we set our new root chains's
     // tail to either chain that still has more nodes in it
     
     tail.sibling = aNext ? aNext : bNext;
    
    return root;
  }
}

BinomialHeap.prototype.union = function(otherHeap) {
  this.size += otherHeap.size;

  // merge heaps will give us  the lowest valued and root node of the two root chains after merging them 

  var newRoot = BinomialHeap.prototype.mergeHeaps(this, otherHeap);

  if (!newRoot) return; // both heap are empty flip a table about it

  this.root = null;
  otherHeap.root = null;

  var prev;
  var curr = newRoot;
  var next = newRoot.next;

  while (next) {
    if(curr.degree !== next.degree || (next.sibling && next.sibling.degree == curr.degree)){
      prev = curr;
      curr = next;
    } else {

      if (curr.key <= next.key ){ // comp
        curr.sibling = next.sibling;
        BinomialHeap.prototype.linkTreeNodes(curr,next);
      } else {
        if (!prev) {
          newRoot = next;
        } else {
          prev.sibling = next;
        }

        BinomialHeap.prototype.linkTreeNodes(next,curr);
        curr = next;

      }
    }

    next = curr.sibling;
  }

  this.root = newRoot;
};

BinomialHeap.prototype.insert = function (key,val){

  var tempHeap = new BinomialHeap();
  
  var newNode = {
    key: key,
    value: val,
    degree: null,
    parent: null,
    child: null,
    sibling: null
  };
  
  tempHeap.root = newNode;  
  tempHeap.size++;
  
  this.union(tempHeap);

  return this;
};


BinomialHeap.prototype.removeRoot = function(heap, root, prev){
  if(root === heap.root ) {
    heap.root = root.sibling;
  } else {
    prev.sibling = root.sibling;
  }
  
  var newRoot;
  var child = root.child;

  // reverse order of the roots children
  while(child) {
    var next = child.sibling;

    child.sibling = newRoot;
    child.parent = null;
    newRoot = child;

    child = next;
  }

  var newHeap = new BinomialHeap();
  newHeap.root = newRoot;

  heap.union(newHeap);
}


BinomialHeap.prototype.extractMin = function(){
  if(!this.root) return;

  var min = this.root;
  var minPrev;

  var next = min.sibling;
  var nextPrev = min;
  
  while(next) {
    if(next.key <= min.key){ // comp
       min = next;
       minPrev = nextPrev;
    }

    nextPrev = next;
    next = next.sibling;
  }

  BinomialHeap.prototype.removeRoot(this, min, minPrev);
  this.size--;

  return min;
}

BinomialHeap.prototype.pop = BinomialHeap.prototype.extractMin;

// implement decrease key 
//
// if for it to work you're gonna need to know you key ahead of time or keep a seperate data strcture
//
// perhaps a hash table that will allow you to search all of the keys in heap

// implement delete which simply decrease key to inifity and remove Root

module.exports = BinomialHeap;
