/* http://en.wikipedia.org/wiki/Binomial_heap
 *
 * inspirations
 * https://mitpress.mit.edu/sites/default/files/Chapter%2019.pdf
 * https://github.com/Tyriar/js-data-structures/blob/master/src/binomial-heap.js
 * http://xlinux.nist.gov/dads/HTML/binomialheap.html
 * http://www.growingwiththeweb.com/2014/01/binomial-heap.html
 * http://www.cse.yorku.ca/~aaw/Sotirios/BinomialHeapAlgorithm.html
 *
 *
 * debugging viz help from 
 *
 * https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
*/

var dsalgo = require('../../utilities.js').dsalgo;

function BinomialHeap(compfn) {
  this.root = null;
  this.size = 0;

  // most references to this data structure only say it supports the min heap property
  //
  // even the last version of CLRS it was in
  //
  // default to min heap
  this.comp = compfn || function(a, b) {
      return a.key <= b.key;
  };

  // gotta make sure to update this on insert and delete
  //
  // lovely property of this data structure is it uses objects to represent its nodes instead of array values
  // so as long as we have a reference to that object we dont care what happens to it unless we need to delete it
  //
  this.nodeSet = dsalgo.utils.simpleSet();
  this.valueToString = function(a) {
    return JSON.stringify(a);
  };
}

BinomialHeap.prototype.addToNodeSet = function(key, val) {
  // key = value storing, val = node reference
  this.nodeSet[this.valueToString(key)] = val;
};

BinomialHeap.prototype.getFromNodeSet = function(key) {
  return this.nodeSet[this.valueToString(key)];
};

BinomialHeap.prototype.removeFromNodeSet = function(key) {
  delete this.nodeSet[this.valueToString(key)];
};

BinomialHeap.prototype.findMin = function() {
  if (!this.root) return;

  var min = this.root;
  var next = min.sibling;

  while (next) {
    if (this.comp(next, min)) {
      min = next;
    }

    next = next.sibling;
  }

  return min;
};

BinomialHeap.prototype.peek = BinomialHeap.prototype.findMin;

BinomialHeap.prototype.linkTreeNodes = function(node, other) {
  other.parent = node;
  other.sibling = node.child;
  node.child = other;
  node.degree += 1;
};

BinomialHeap.prototype.mergeHeaps = function(a, b) {

  // all we are doing here is merging the linked lists that represents 
  //
  // the roots of the each sub binomial tree a and b in order 
  //
  // we aren't doing anything else to the tree right now

  if (!a.root) {
    return b.root;
  } else if (!b.root) {
    return a.root;
  } else {
    var root;
    var aNext = a.root;
    var bNext = b.root;

    if (a.root.degree <= b.root.degree) {
      root = a.root;
      aNext = aNext.sibling;
    } else {
      root = b.root;
      bNext = bNext.sibling;
    }

    var tail = root;

    while (aNext && bNext) {
      if (aNext.degree <= bNext.degree) {
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
};

BinomialHeap.prototype.union = function(otherHeap) {
  this.size += otherHeap.size;

  // merge heaps will give us the lowest valued and root node of the two root chains after merging them 

  var newRoot = BinomialHeap.prototype.mergeHeaps(this, otherHeap);

  if (!newRoot) return; // both heap are empty flip a table about it

  this.root = null;
  otherHeap.root = null;

  var prev;
  var curr = newRoot;
  var next = newRoot.sibling;

  //  if(!!prev && prev.degree > 0) debugger;
  //  if(!!curr && curr.degree > 0) debugger;
  //  if(!!next && next.degree > 0) debugger;

  while (next) {
    if (curr.degree !== next.degree || (next.sibling && next.sibling.degree == curr.degree)) {
      prev = curr;
      curr = next;
    } else {

      if (this.comp(curr, next)) {
        curr.sibling = next.sibling;
        BinomialHeap.prototype.linkTreeNodes(curr, next);
      } else {
        if (!prev) {
          newRoot = next;
        } else {
          prev.sibling = next;
        }

        BinomialHeap.prototype.linkTreeNodes(next, curr);
        curr = next;

      }
    }

    next = curr.sibling;
  }

  this.root = newRoot;
};

BinomialHeap.prototype.insert = function(key, val) {

  var tempHeap = new BinomialHeap();

  var newNode = {
    key: key,
    value: val,
    degree: 0,
    parent: null,
    child: null,
    sibling: null
  };

  tempHeap.root = newNode;
  tempHeap.size++;

  this.union(tempHeap);

  // add node to nodeSet
  // just need a reference
  this.addToNodeSet(val, newNode);

  return this;
};


BinomialHeap.prototype.removeRoot = function(heap, root, prev) {
  if (root === heap.root) {
    heap.root = root.sibling;
  } else {
    prev.sibling = root.sibling;
  }

  var newRoot;
  var child = root.child;

  // reverse order of the roots children
  while (child) {
    var next = child.sibling;

    child.sibling = newRoot;
    child.parent = null;
    newRoot = child;

    child = next;
  }

  var newHeap = new BinomialHeap();
  newHeap.root = newRoot;

  heap.union(newHeap);
};


BinomialHeap.prototype.extractMin = function() {
  if (!this.root) return;

  var min = this.root;
  var minPrev;

  var next = min.sibling;
  var nextPrev = min;

  while (next) {
    if (this.comp(next, min)) {
      min = next;
      minPrev = nextPrev;
    }

    nextPrev = next;
    next = next.sibling;
  }

  BinomialHeap.prototype.removeRoot(this, min, minPrev);
  this.size--;

  return min;
};

BinomialHeap.prototype.pop = BinomialHeap.prototype.extractMin;

BinomialHeap.prototype.exchange = function(node, other) {

  // all the other fields get swapped properly just by the key exhange

  var temp = {
    key: node.key,
    value: node.value,
  };

  node.key = other.key;
  node.value = other.value;

  other.key = temp.key;
  other.value = temp.value;

};

// decrease key 
// needs node out of node set to work
BinomialHeap.prototype.decreaseKey = function(node, newKey) {

  // key should be checked to not be greater according to CLRS 2nd edition
  // they were wrong you dont have to :) but you have to have your comparator working correctly
  // to make sure values dont get put in weird places

  node.key = newKey;

  // move node up tree until it stops breaking heap property
  var parent = node.parent;

  while (parent && this.comp(node, parent)) {

    this.exchange(node, parent);

    node = parent;
    parent = parent.parent;
  }

  // return the node for its new position
  return node;
};

BinomialHeap.prototype.delete = function(node) {

  // doing it the academic way of decreasing node to negative inifity
  // you could also just check for a another parameter i.e. toRoot 
  // and move the node all the way to the root if for some crazy reason
  // you needed to store negative infinity but I dont
  //
  // only want node objects here no numbers
  //
  // if you gave it just a number the extract min function would still run 
  // and this function would not only silently fail it would also lie that it succeded lol

  if (!(node instanceof Object)) {
    return false;
  }

  // interesting calling this from the constructor doesn't properly set the this value
  // so decreaseKey would not have access to the proper this context and invariably
  // the comparision function so we must call it on this instead of BinomialHeap.prototype
  //
  // Yay javascript!

  this.decreaseKey(node, Number.NEGATIVE_INFINITY);
  this.extractMin();

  // remove node from nodeSet
  this.removeFromNodeSet(node.value);
  return true;
};

BinomialHeap.prototype.contains = function(val) {
  var node = this.getFromNodeSet(val);
  return dsalgo.utils.isDefined(node) ? node : false;
};

BinomialHeap.prototype.remove = BinomialHeap.prototype.delete;

module.exports = BinomialHeap;
