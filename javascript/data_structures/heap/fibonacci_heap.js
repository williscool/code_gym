/* http://en.wikipedia.org/wiki/Fibonacci_heap
 *
 * inspirations
 *
 *  CLRS 3rd Edition 
 *  http://www.growingwiththeweb.com/2014/06/fibonacci-heap.html
 *  http://keithschwarz.com/interesting/code/?dir=fibonacci-heap
 *
 *  http://www.researchgate.net/post/Which_data_structure_in_Java_provides_the_function_of_Fibonacci_Heap2
 *
 *  https://github.com/gaye/fibonacci-heap/blob/master/index.js
 *
 *  for funsies the original paper
 *  http://www.cl.cam.ac.uk/~sos22/supervise/dsaa/fib_heaps.pdf#page=9
 *
 *
 *  http://stackoverflow.com/questions/19508526/what-is-the-intuition-behind-the-fibonacci-heap-data-structure
 *  http://stackoverflow.com/questions/14333314/why-is-a-fibonacci-heap-called-a-fibonacci-heap
 *
 *
 ** debugging viz help from 
 *
 * https://www.cs.usfca.edu/~galles/visualization/FibonacciHeap.html
*/

var dsalgo = require('../../utilities.js').dsalgo;

function FibonacciHeap(node, size) {
  this.minNode = node || null;
  // this could be zero so I gotta use my fancy function
  this.size = dsalgo.utils.isDefined(size) ? size : 0;

  // gotta make sure we increase the size if a node is set in contructor
  if(node) this.size++;
}

FibonacciHeap.prototype.isEmpty = function (){
  return !dsalgo.utils.isDefined(this.minNode);
}

FibonacciHeap.prototype.mergeRootLists = function(a, b) {
  // interesting not here this function dramatically simplifies the union operation 
  // simply by returning the Min(a,b) 
  // would have been nice for them to have done it this way in CLRS

  if(!a && !b) return; 
  if(!a) return b; 
  if(!b) return a; 
    
  var temp = a.next;

  a.next = b.next;
  a.next.prev = a;

  b.next = temp;
  b.next.prev = b;

  return (a.key <= b.key) ? a :b; // comp
}

FibonacciHeap.prototype.insert = function (key,val){

  var newNode = {
    key: key,
    value: val,
    degree: 0,
    parent: null,
    child: null,
    next: null,
    prev: null,
    isMarked: null
  };
 
  // implementation this was inspired by counts on a node never having a null reference to work
  // as opposed to null checking every where our clever conspirator chose to make nodes have circular
  // references at first that get set properly upon being merged into a tree
  //
  // Dont you wish everyone wrote comments like me? Dont ya?

  newNode.next = newNode;
  newNode.prev = newNode;
   
  this.minNode = this.mergeRootLists(this.minNode, newNode);
  this.size++;
  
  return this;
};

FibonacciHeap.prototype.union = function(otherHeap) {
  this.minNode = this.mergeRootLists(this.minNode, otherHeap.minNode);
  this.size += otherHeap.size;
};

FibonacciHeap.prototype.findMin = function(){
  return this.minNode;
}

FibonacciHeap.prototype.peek = FibonacciHeap.prototype.findMin;


FibonacciHeap.prototype.removeNodeFromList = function(node){
  // another simplifying helper function
  // the CLRS implementation does alot of adding one list to another minus 
  // the node you are removing. why not just make them point to each other?

  var prev = node.prev
     , next = node.next;

  prev.next = next;
  next.prev = prev;

  // make node a circle with itself
  // why? idk
  node.next = node;
  node.prev = node;

  return node;
}


FibonacciHeap.prototype.linkHeaps = function(max, min){
  max = removeNodeFromList(max);
  min.child = mergeRootLists(max,min.child);

  max.parent = min;
  max.isMarked = false;
}

/* Consolidate
 * per the wikipedia article
 *
 *  In the second phase we decrease the number of roots by successively linking together roots of the same degree.
 * When two roots u and v have the same degree, we make one of them a child of the other so that the one with the smaller key remains the root. 
 *
 *  Its degree will increase by one. This is repeated until every root has a different degree. 
 *
 * To find trees of the same degree efficiently we use an array of length O(log n) in which we keep a pointer to one root of each degree.
 *
 * */

FibonacciHeap.prototype.consolidate = function(){

  var toVisit = []; //aka an array of the nodes we are going to visit from the root list
  var treeRankTable = [];

  var start = this.minNode;

  // put all the nodes in the root chain on the list 
  // this is useful because we are gonna reorder the chain so it helps to still
  // be able to access them in a predictable order
  //
  // iteration will work fine because on the first iteration toVisit[0] is undefined
  //
  while (start && (toVisit[0] !== start)){
    toVisit.push(start);
    // iterate until we visit the whole root chain
    start = start.next;
  }

  // this is javascript so we dont have to initalize our rank table with nulls
  
  var i = 0;

  while(i < toVisit.length){

    var current = toVisit[i];
    // we havent found a tree of this rank yet
    if(!(treeRankTable[current.degree])){
      // put this tree there
      treeRankTable[current.degree] = current;
      // and leave this iteration of the while true loop
      break;
    }

    // there was a node at this rank before lets put them together

    if(other.key > current.key){
      // other should be further down the tree do it first and save current for later
      var temp = current;
      current = treeRankTable[current.degree];
      treeRankTable[current.degree] = temp;
    }

    this.linkHeaps(treeRankTable[current.degree],current);

    treeRankTable[current.degree] = null; 
    current.degree++;

    treeRankTable[current.degree] = current;
    i++;
  }

  // reset our new min node
  this.minNode = null;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  toVisit.forEach(function(node){
     // remove sibling relationships from nodes
     if(node){
      node.next = node;
      node.prev = node;
     }
     
     this.minNode = this.mergeRootLists(this.minNode, node);
  }, this);

}


FibonacciHeap.prototype.extractMin = function(){

  var min = this.minNode;
  
  if(min){
    // set parent to null for min's children
    if(min.child) {
      var child = min.child;

      do {
        child.parent = null; 
        child = child.next; 
      } while (child != min.child);
    }

    // if this is the root of the tree skip the last operation
    var nextInRootList = (this.minNode.next === this.minNode) ? null : this.minNode.next;

    this.removeNodeFromList(min);
    this.size--;
    
    // Merge kids of min node with current root list
    this.minNode = this.mergeRootLists(nextInRootList, min.child);

    if(nextInRootList){
      this.minNode = nextInRootList;
      this.consolidate();
    }
  }

  return min;
}

FibonacciHeap.prototype.pop = FibonacciHeap.prototype.extractMin;

FibonacciHeap.prototype.cut = function(node, parent) {
   // https://www.youtube.com/watch?v=M37HHf099oM
   this.removeNodeFromList(node);
   parent.degree--; 
   this.mergeRootLists(minNode,node);
   node.isMarked = false;
}

FibonacciHeap.prototype.cascadingCut = function(node, parent) {
  var parent = node.parent;
  if(parent){
    if(node.isMarked){
      cur(node,parent);
      cascadingCut(parent);
    } else {
      node.isMarked = true;
    }
  }
}

FibonacciHeap.prototype.decreaseKey = function(node, newKey) {

  // should tell you to not set a higher key
  // just dont be stupid lol

  node.key = newKey;
  var parent = node.parent;

  if(parent && (node.key <= node.parent)) { // comp
    cut(node,parent);
    cascadingCut(parent);
  }

  // comp
  if(node.key <= this.minNode.key) this.minNode = node;

  return true;
}

FibonacciHeap.prototype.delete = function(node){

  // doing it the academic way of decreasing node to negative inifity again
  // but really do. why would you need to store negative infinity?
  
  if (!(node instanceof Object)) { return false; }

  this.decreaseKey(node, Number.NEGATIVE_INFINITY);
  this.extractMin();
  return true;
}

FibonacciHeap.prototype.remove = FibonacciHeap.prototype.delete;

module.exports = FibonacciHeap;
