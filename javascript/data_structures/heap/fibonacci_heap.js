import dsalgo from '../../utilities';

/* eslint-disable no-param-reassign */
// the side effects of reassigning things from params are pretty central to the algorithms that create this data structure
// want to keep it as faithful to how it was coded by the people who presented it to me (CLR) as possible

/* http://en.wikipedia.org/wiki/Fibonacci_heap
 *
 * Everyone's favorite super esotertic data structure they like to pretend they know how works and is useful!
 *
 * fun fact the fib heap is essentially a performance improvement over the binomial heap...
 *
 * That works by mearly adding all the nodes to a linked list most of the time... (while keeping a pointer to your extrema)
 *
 * and only ever building the tree with the heap property on removal. clever stuff
 *
 * inspirations
 *
 *  CLRS 3rd Edition starting on pg 505
 *
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
 * debugging viz help from
 *
 * https://www.cs.usfca.edu/~galles/visualization/FibonacciHeap.html
 *
 * Also fun fact
 *
 * https://www.igvita.com/2009/03/26/ruby-algorithms-sorting-trie-heaps/
 * this was done in ruby for a GSOC project in 08
 *
 * TODO: one day when im bored make sure this thing works right by testing its structure after cutting and consolidating
*/

class FibonacciHeap {
  constructor(node, size, compfn) {
    this.minNode = node || null;
    // this could be zero so I gotta use my fancy function
    this.size = dsalgo.utils.isDefined(size) ? size : 0;

    // gotta make sure we increase the size if a node is set in contructor
    if (node) this.size += 1;

    // fib heap is also a min heap by default
    this.comp = compfn || ((a, b) => a.key <= b.key);

    // node set for keeping track of references to objects
    // same use as in binomial heap
    this.nodeSet = dsalgo.utils.simpleSet();
    this.valueToString = function (a) {
      return JSON.stringify(a);
    };
  }

  /**
   * Add the node to the set that keeps a reference to all values in the heap
   *
   * Time Complexity: O(1)
   *
   * @param {any} key
   * @param {any} val
   * @memberof FibonacciHeap
   */
  addToNodeSet(key, val) {
    // key = value storing, val = node reference
    this.nodeSet[this.valueToString(key)] = val;
  }

  /**
   * Get a reference to a node in the binomial heap by its key form the node set
   *
   * Time Complexity: O(1)
   *
   * @param {any} key
   * @returns
   * @memberof FibonacciHeap
   */
  getFromNodeSet(key) {
    return this.nodeSet[this.valueToString(key)];
  }

  /**
   * Remove a node from the node set
   *
   * Time Complexity: O(1)
   *
   * @param {any} key
   * @memberof FibonacciHeap
   */
  removeFromNodeSet(key) {
    delete this.nodeSet[this.valueToString(key)];
  }

  /**
   * Easy to tell if fib heap is empty too. no min node reference
   *
   * Time Complexity: O(1)
   *
   * @returns {boolean}
   * @memberof FibonacciHeap
   */
  isEmpty() {
    return !dsalgo.utils.isDefined(this.minNode);
  }

  /**
   * Merge the root linked lists of 2 fib heaps
   *
   * @param {FibHeapNode} a
   * @param {FibHeapNode} b
   * @returns {FibHeapNode}
   * @memberof FibonacciHeap
   */
  mergeRootLists(a, b) {
    // interesting note here this function dramatically simplifies the union operation
    // simply by returning the Min(a,b)
    // would have been nice for them to have done it this way in CLRS

    if (!a && !b) return undefined;
    if (!a) return b;
    if (!b) return a;

    const temp = a.next;

    a.next = b.next;
    a.next.prev = a;

    b.next = temp;
    b.next.prev = b;

    // with a <= comparator return the lesser of a and b
    return this.comp(a, b) ? a : b;
  }

  /**
   * Insert a new node into the fib heap
   *
   * Since all we do is add the node to the root linked list
   * then check whether or not it is then min and replace our min reference with it if so
   * this is a constant time operation
   *
   * Time Complexity: O(1)
   *
   * @param {any} key
   * @param {any} val
   * @returns this
   * @memberof FibonacciHeap
   */
  insert(key, val) {
    // eslint-disable-next-line no-use-before-define
    const newNode = new FibHeapNode({
      key,
      value: val,
      degree: 0,
      parent: null,
      child: null,
      next: null,
      prev: null,
      isMarked: null,
    });

    // the implementation mine was inspired by counts on a node never having a null reference to work
    // as opposed to null checking every where our clever conspirator chose to make nodes have circular
    // references at first that get set properly upon being merged into a tree
    //
    // Dont you wish everyone wrote comments like me? Dont ya?

    newNode.next = newNode;
    newNode.prev = newNode;

    this.minNode = this.mergeRootLists(this.minNode, newNode);
    this.size += 1;

    // add node to nodeSet
    // just need a reference
    this.addToNodeSet(val, newNode);

    return this;
  }

  /**
   * Unites 2 fib heaps
   *
   * @param {any} otherHeap
   * @memberof FibonacciHeap
   */
  union(otherHeap) {
    this.minNode = this.mergeRootLists(this.minNode, otherHeap.minNode);
    this.size += otherHeap.size;
  }

  /**
   * Super easy to find the minimum in a fib heap
   *
   * We always keep and update a reference to it
   *
   * Time Complexity: O(1)
   *
   * @returns {FibHeapNode}
   * @memberof FibonacciHeap
   */
  findMin() {
    return this.minNode;
  }

  /**
   * Simplifying helper function for other operations
   *
   * the CLRS implementation does alot of adding one list to another minus
   * the node you are removing. why not just make them point to each other?
   *
   * @static
   * @param {any} node
   * @returns
   * @memberof FibonacciHeap
   */
  static removeNodeFromList(node) {
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;

    // make node a circle with itself
    // a convention in linked list that means the node is not connected to anything
    node.next = node;
    node.prev = node;

    return node;
  }


  /**
   * Links 2 subtrees in a fib heap together
   *
   * @param {any} max
   * @param {any} min
   * @memberof FibonacciHeap
   */
  linkHeaps(max, min) {
    max = FibonacciHeap.removeNodeFromList(max);
    min.child = this.mergeRootLists(max, min.child);

    max.parent = min;
    max.isMarked = false;
  }

  /**
   * Consolidate
   *
   * Per the wikipedia article
   *
   * In the second phase (of extracting the minimum value) we decrease the number of roots by successively linking together roots of the same degree.
   *
   * When two roots u and v have the same degree, we make one of them a child of the other so that the one with the smaller key remains the root.
   *
   * Its degree will increase by one. This is repeated until every root has a different degree. (aka there are no 2 trees with the same order)
   *
   * To find trees of the same degree efficiently we use an array of length O(log n) in which we keep a pointer to one root of each degree.
   *
   * TODO: one day FAAR in the future. dig deep and figure out if this function is correct. apparently this data structure can still work even if you don't build the heap structure correct o.o
   *
   * @memberof FibonacciHeap
   */
  consolidate() {
    const toVisit = []; // aka an array of the nodes we are going to visit from the root list
    const treeRankTable = [];

    let start = this.minNode;

    // put all the nodes in the root chain on the list
    // this is useful because we are gonna reorder the chain so it helps to still
    // be able to access them in a predictable order
    //
    // iteration will work fine because on the first iteration toVisit[0] is undefined
    //
    while (start && (toVisit[0] !== start)) {
      toVisit.push(start);
      // iterate until we visit the whole root chain
      start = start.next;
    }

    // this is javascript so we dont have to initalize our rank table with nulls

    let i = 0;

    while (i < toVisit.length) {
      let current = toVisit[i];
      // we havent found a tree of this rank yet
      if (!(treeRankTable[current.degree])) {
        // put this tree there
        treeRankTable[current.degree] = current;
        // and leave this iteration of the while true loop
        break;
      }

      // there was a node at this rank before lets put them together

      // if (current.key > treeRankTable[current.degree].key)
      if (this.comp(treeRankTable[current.degree].key, current.key)) {
        // other should be further down the tree do it first and save current for later
        const temp = current;
        current = treeRankTable[current.degree];
        treeRankTable[current.degree] = temp;
      }

      this.linkHeaps(treeRankTable[current.degree], current);

      treeRankTable[current.degree] = null;
      current.degree += 1;

      treeRankTable[current.degree] = current;
      i += 1;
    }

    // reset our new min node
    this.minNode = null;

    toVisit.forEach((node) => {
      // remove sibling relationships from nodes
      if (node) {
        node.next = node;
        node.prev = node;
      }
      this.minNode = this.mergeRootLists(this.minNode, node);
    });

    return this.minNode;
  }

  /**
   * Extract the minimum value node from the heap
   *
   * This is one of the new not constant operation in this data structure.
   *
   * Most of the other operations just put off all the work until you need to remove something from the tree or change its value
   *
   * Then subroutines of this then restore the heap property
   *
   * @returns {FibHeapNode}
   * @memberof FibonacciHeap
   */
  extractMin() {
    const min = this.minNode;

    if (min) {
      // set parent to null for min's children
      if (min.child) {
        let child = min.child;

        do {
          child = child.next;
          child.parent = null;
        } while (child !== min.child);
      }

      let nextInRootList = min.next;

      // min was the only node in the list since it has a reference to itself
      if (min.next === this.minNode) {
        nextInRootList = null;
      }

      FibonacciHeap.removeNodeFromList(min);

      // Merge kids of min node with current root list
      this.minNode = this.mergeRootLists(nextInRootList, min.child);

      // this is synoymous with saying min was not the only node in the list
      // so run consolidate
      if (this.minNode) {
        this.minNode = this.consolidate();
      }

      this.size -= 1;
    }

    return min;
  }

  /**
   * Remove node from the child list of its parent
   *
   * from pg 519 of CLRS The CUT procedure "cuts" the link between (node) and its parent, making (node) a root.
   *
   * https://www.youtube.com/watch?v=M37HHf099oM
   * https://www.youtube.com/watch?v=jKduDKsfl6U
   *
   * @param {FibHeapNode} node
   * @param {FibHeapNode} parent
   * @memberof FibonacciHeap
   */
  cut(node, parent) {
    FibonacciHeap.removeNodeFromList(node);
    this.mergeRootLists(this.minNode, node);
    parent.degree -= 1;
    node.isMarked = false;
  }

  /**
   * The cascading cut restores the heap property in the case of a node's value changing (through decreaseKey)
   *
   *  CASCADING-CUT calls itself recursively in line 6 on y’s parent ´.
   *  The CASCADING-CUT procedure recurses its way up the tree until it finds either a root or an unmarked node.
   *
   * TODO: also waaay of in the future WHY THIS FUCK DID THIS THING WORK when I had a typo in it originally where I spelled cut as `cur`
   * so my implementation was off but not only did it work in this test it also stilll worked in djikstra's algorith... wtf?
   *
   * @param {any} node
   * @memberof FibonacciHeap
   */
  cascadingCut(node) {
    const parent = node.parent;
    if (parent) {
      if (node.isMarked) {
        this.cut(node, parent);
        this.cascadingCut(parent);
      } else {
        node.isMarked = true;
      }
    }
  }

  /**
   * Everybody's favorite (computer science professor's) method of changing the value of a node in a heap
   *
   * decrease key
   *
   * Needs a reference to node out from the node set to work
   *
   * @param {FibHeapNode} node
   * @param {number} newKey
   * @returns
   * @memberof FibonacciHeap
   */
  decreaseKey(node, newKey) {
    // should tell you to not set a higher key
    // just dont be stupid lol

    node.key = newKey;
    const parent = node.parent;

    if (parent && this.comp(node, node.parent)) {
      this.cut(node, parent);
      this.cascadingCut(parent);
    }

    // The only node whose key changed was the node x whose key decreased.
    // Thus, the new minimum node is either the original minimum node or node x.
    if (this.comp(node, this.minNode)) this.minNode = node;

    return true;
  }

  /**
   * Deletes the node from the fib heap
   * Same simple algo from binomial heap
   *
   * 1. Change this node's value to negative infinity
   * 2. then run extractMin to remove that lowest and node our target node from the tree :)
   *
   * @param {FibHeapNode} node
   * @returns {boolean} if this operation succedes
   * @memberof FibonacciHeap
   */
  delete(node) {
    // doing it the academic way of decreasing node to negative infinity again
    // but really do. why would you need to store negative infinity?

    if (!(node instanceof FibHeapNode)) { // eslint-disable-line no-use-before-define
      return false;
    }

    this.decreaseKey(node, Number.NEGATIVE_INFINITY);
    this.extractMin();

    // remove node from nodeSet
    this.removeFromNodeSet(node.value);
    return true;
  }

  /**
   * Does this heap contain the input value?
   *
   * Time Complexity: O(1)
   *
   * @param {any} val
   * @returns
   * @memberof FibonacciHeap
   */
  contains(val) {
    const node = this.getFromNodeSet(val);
    return dsalgo.utils.isDefined(node) ? node : false;
  }
}

/**
 * An alias of `findMin`
 *
 * Used to have a uniform interface for all of the heap implementation
 *
 * @alias findMin
 * @returns
 * @memberof FibonacciHeap
 */
FibonacciHeap.prototype.peek = FibonacciHeap.prototype.findMin;

/**
 * Just an alias for `delete`
 *
 * @param {any} node
 * @returns
 * @memberof FibonacciHeap
 */

FibonacciHeap.prototype.remove = FibonacciHeap.prototype.delete;

/**
 * Alias of `extractMin`
 *
 * Used to have uniform interfaces for all of the heaps
 *
 * @returns {BinomHeapNode}
 * @memberof FibonacciHeap
 */
FibonacciHeap.prototype.pop = FibonacciHeap.prototype.extractMin;


/**
 * A Fibonacci Heap Tree Node
 *
 * @class BinomHeapNode
 * @property {number} value - the value held at this node of the binary search tree
 * @property {number} degree - the number of edges attached to this node https://en.wikipedia.org/wiki/Degree_(graph_theory)
 * @property {FibHeapNode} parent - a reference to the object that represent's the nodes parent in this Fibonacci Heap Tree
 * @property {FibHeapNode} child - a reference to the object that represent's the nodes child in this Fibonacci Heap Tree
 * @property {FibHeapNode} sibling - a reference to the object that represent's the nodes sibling in this Fibonacci Heap Tree
 * @property {FibHeapNode} next - a reference to the object that represent's the next node in this node's root chain
 * @property {FibHeapNode} prev - a reference to the object that represent's the previous node in this node's root chain
 * @property {any} isMarked - used to tell if a node has been cut before to signal to the heap to run a cascadingCut
 */
class FibHeapNode {
  /**
   * Creates an instance of FibHeapNode.
   *
   * @memberof Node
   */
  constructor({
    key,
    value,
    degree = 0,
    parent = null,
    child = null,
    sibling = null,
    next = null,
    prev = null,
    isMarked = null,
  } = {}) {
    this.key = key;
    this.value = value;
    this.degree = degree;
    this.parent = parent;
    this.child = child;
    this.sibling = sibling;
    this.next = next;
    this.prev = prev;
    this.isMarked = isMarked;
  }
}

export default FibonacciHeap;
