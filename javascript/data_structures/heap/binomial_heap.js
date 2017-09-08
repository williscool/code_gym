import dsalgo from '../../utilities';

/* eslint-disable no-param-reassign */
// the side effects of reassigning things from params are pretty central to the algorithms that create this data structure
// want to keep it as faithful to how it was coded by the people who presented it to me (CLR) as possible

/**
 * Binomial Heap
 *
 * A heap made of a forest of binomial trees with the heap property numbered k=0, 1, 2, ..., n, each containing either 0 or 2^k nodes.
 *
 * Each tree is formed by linking two of its predecessors, by joining one at the root of the other.
 *
 * The operations of insert a value, decrease a value, delete a value, and merge or join (meld) two queues take O(log n) time.
 *
 * The find minimum operation is a constant Θ(1).
 *
 *  - http://xlinux.nist.gov/dads/HTML/binomialheap.html
 *
 * An important thing to note about this structure is that all though all of its sub binomial TREE are min-heap ordered
 *
 * It DOES NOT necessarily mean that the value the root of the whole binomial HEAP is its minimum value!
 *
 * As a matter of fact it the finMin operation of this is simply a scan of all the binomial TREEs to see whose root is the smallest
 *
 * What's interesting about this though is that because of the stucture of the whole data structure that operation is O(log(n))
 *  where n is the total number of all nodes in all the trees
 *
 * http://en.wikipedia.org/wiki/Binomial_heap
 * https://www.youtube.com/watch?v=e_gh1aD4v-A
 *
 * inspirations
 * https://mitpress.mit.edu/sites/default/files/Chapter%2019.pdf
 * https://github.com/gwtw/js-binomial-heap
 * https://github.com/Tyriar/js-data-structures/blob/master/src/binomial-heap.js
 * http://www.growingwiththeweb.com/2014/01/binomial-heap.html
 * http://www.cse.yorku.ca/~aaw/Sotirios/BinomialHeapAlgorithm.html
 *
 * debugging viz help from
 *
 * https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
 *
 * we out here making artisanal data structures bruh
 *
 * @class BinomialHeap
 */
class BinomialHeap {
  /**
   * Creates an instance of BinomialHeap.
   * most references to this data structure only say it supports the min heap property
   *
   * even the last version of CLRS (fun fact it was just CLR then. There was no S) it was in (fun fact its not mentioned in the latest)
   *
   * default to min heap
   *
   * @prop comp - comparator function defaults to min heap
   * @prop valueToString - function to turn your input values (which could be numbers or objects) into a string defaults to `JSON.stringify`
   * @memberof BinomialHeap
   */
  constructor({
    comp = (a, b) => a.key <= b.key,
    valueToString = a => JSON.stringify(a), // quick and dirty way to support objects also since they wont be that big
  } = {}) {
    this.root = null;
    this.size = 0;
    this.comp = comp;

    // gotta make sure to update this on insert and delete
    //
    // lovely property of this data structure is it uses objects to represent its nodes instead of array values
    // so as long as we have a reference to that object we dont care what happens to it unless we need to delete it
    //
    this.nodeSet = dsalgo.utils.simpleSet();
    this.valueToString = valueToString;
  }

  /**
   * Add the node to the set that keeps a reference to all values in the heap
   *
   * Time Complexity: O(1)
   *
   * @param {any} key
   * @param {any} val
   * @memberof BinomialHeap
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
   * @memberof BinomialHeap
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
   * @memberof BinomialHeap
   */
  removeFromNodeSet(key) {
    delete this.nodeSet[this.valueToString(key)];
  }

  /**
   * finMin operation of this is simply a scan of all the binomial TREEs to see whose root has the smallest value
   *
   * Equivalent to peek in other heap implementations
   *
   * Time Complexity: O(log(n))
   *
   * @returns {BinomHeapNode}
   * @memberof BinomialHeap
   */
  findMin() {
    if (!this.root) return undefined;

    let min = this.root;
    let next = min.sibling;

    while (next) {
      if (this.comp(next, min)) {
        min = next;
      }

      next = next.sibling;
    }

    return min;
  }

  /**
   * An alias of `findMin`
   *
   * Used to have a uniform interface for all of the heap implementation
   *
   * @alias findMin
   * @returns
   * @memberof BinomialHeap
   */
  peek() {
    return this.findMin();
  }

  /**
   * Makes the first input `node` the new parent of `other` node's children in O(1) time.
   *
   * Time Complexity: O(1)
   *
   * @static
   * @param {any} node
   * @param {any} other
   * @memberof BinomialHeap
   */
  static linkTreeNodes(node, other) {
    other.parent = node;
    other.sibling = node.child;
    node.child = other;
    node.degree += 1;
  }

  /**
   * MergeHeaps
   *
   * Contrary to the confusing name of this function
   *
   * All we are doing in this step here is merging the linked lists that represent
   *
   * the roots of the each sub binomial tree a and b in order sorted by DEGREE (not value of the not at root)
   *
   * We aren't doing anything else to the tree right now
   *
   * To quote the 1st edition of CLRS
   *
   * The first phase, performed by the call of BINOMIAL-HEAP-MERGE, merges the root lists of binomial heaps H1 and H2
   * into a single linked list H that is sorted by DEGREE (not value of the not at root) into monotonically increasing order.
   *
   * https://youtu.be/e_gh1aD4v-A?t=184
   *
   * Time Complexity: O(lg n)
   *
   * @static
   * @param {Node} a The root of the first heap to merge.
   * @param {Node} b The root of the second heap to merge.
   * @returns {Node} The root of the new merged heap
   * @memberof BinomialHeap
   */
  static mergeHeaps(a, b) {
    if (!a.root) {
      return b.root;
    } else if (!b.root) {
      return a.root;
    }

    let root;
    let aNext = a.root;
    let bNext = b.root;

    // TODO: is this supposed to used comparator? if so switch to it (note I dont think so. this comparing node DEGREE not VALUE)
    if (a.root.degree <= b.root.degree) {
      root = a.root;
      aNext = aNext.sibling;
    } else {
      root = b.root;
      bNext = bNext.sibling;
    }

    let tail = root;

    while (aNext && bNext) {
      // TODO: is this supposed to used comparator? if so switch to it
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

    tail.sibling = aNext || bNext;

    return root;
  }

  /**
   * This function does the actual real heavy lifting of merging 2 binomial heaps and restoring the heap property
   *
   * The union procedure repeatedly links binomial trees whose roots have the same degree.
   *
   * 1. It starts with a call to the subroutine `mergeHeaps` which links the root link lists of tree nodes
   *
   * There might be as many as two roots (but no more) of each degree, however,
   * so the second phase links roots of equal degree until at most one root remains of each degree.
   * Because the linked list H is sorted by degree, we can perform all the link operations quickly
   *
   * pg. 464 of Chapter 19 of CLR https://mitpress.mit.edu/sites/default/files/Chapter%2019.pdf
   * has pretty solid explaination of what is happening here
   *
   * Time Complexity: O(log(n))
   *
   * @param {any} otherHeap
   * @returns
   * @memberof BinomialHeap
   */
  union(otherHeap) {
    this.size += otherHeap.size;

    // merge heaps will give us the lowest valued and root node of the two root chains after merging them in order
    let newRoot = BinomialHeap.mergeHeaps(this, otherHeap);

    if (!newRoot) return; // both heaps are empty. flip a table about it (╯°□°)╯︵ ┻━┻... nah just chill ┬─┬ ノ( ゜-゜ノ) and exit the function

    this.root = null;
    otherHeap.root = null;

    let prev;
    let curr = newRoot;
    let next = newRoot.sibling;

    //  if(!!prev && prev.degree > 0) debugger;
    //  if(!!curr && curr.degree > 0) debugger;
    //  if(!!next && next.degree > 0) debugger;

    while (next) {
      // if this root node and the next root node have the same degree
      // or the next root node's sibling's (also refered to as next.next in some implementations) degree is the same as the current degree
      //
      // these case are distinct enough I think they warrant a seperate else if statement :/
      // even if they would have the same procedure in them
      //
      // but I want to keep this this as faithful to the book (CLR 1st ed) implementation as possible
      if (curr.degree !== next.degree || (next.sibling && next.sibling.degree === curr.degree)) {
        // keep going through the root chain links
        prev = curr;
        curr = next;
      } else if (this.comp(curr, next)) { // check if next's value is less than current's value with a.key <= b.key compartor
        // next's value is greater than curr with a.key <= b.key compartor

        // so make next's sibling curr's new next
        curr.sibling = next.sibling;
        // then make the old next curr's child
        BinomialHeap.linkTreeNodes(curr, next);
      } else {
        // next's value is less than current's value with a.key <= b.key compartor
        if (!prev) { // guard condition for if we are at the root node and prev is not defined
          newRoot = next; // now the new root becomes next
        } else {
          // prev did exist but it's next was the curr node we are looking at.
          //
          // that is about to become the child of next since curr's value is lower (with <=)
          // so prev's new next will be curr's old next
          prev.sibling = next;
        }

        // finally make curr a child of next
        BinomialHeap.linkTreeNodes(next, curr);
        curr = next; // continue going through root node chain that next is now a part of by setting it to curr
      }

      // obviously visit the next node in the root chain to continue the union operation
      next = curr.sibling;
    }

    // finally make the root node from mergeHeaps the new root of the binomial tree
    this.root = newRoot;
  }

  /**
   * Add a node to the binomial heap tree
   *
   * Most of the magic happens in `union` to properly setup the heap
   *
   * Time Complexity: O(log(n))
   *
   * @param {any} key
   * @param {any} val
   * @returns
   * @memberof BinomialHeap
   */
  insert(key, val) {
    const tempHeap = new BinomialHeap();

    // eslint-disable-next-line no-use-before-define
    const newNode = new BinomHeapNode({
      key,
      value: val,
      degree: 0,
      parent: null,
      child: null,
      sibling: null,
    });

    tempHeap.root = newNode;
    tempHeap.size += 1;

    this.union(tempHeap);

    // add node to nodeSet
    // just need a reference
    this.addToNodeSet(val, newNode);

    return this;
  }

  /**
   * Used to remove a root linked list node from the tree and restore the binomial heap
   *
   * this implementations line 2 of pg 468 of CLR 1st ed chapter 19 and the rest of the `BINOMIAL-HEAP-EXTRACT-MIN`
   *
   * Time Complexity: O(log(n))
   *
   * @static
   * @param {BinomialHeap} heap
   * @param {BinomHeapNode} root
   * @param {BinomHeapNode} prev
   * @memberof BinomialHeap
   */
  static removeRoot(heap, rootToBeRemoved, prev) {
    const newHeap = new BinomialHeap();

    // remove the root representing the min from the root chain (linked list of binomial tree roots)
    // pretty straight forward
    // if the node we want to remove is the root of the heap we are removing it from... make its sibling the new root
    if (rootToBeRemoved === heap.root) {
      heap.root = rootToBeRemoved.sibling;
    } else {
      // if not make the node previous to it in the root chain a sibling with its soon to be old sibling
      prev.sibling = root.sibling;
    }

    let newRoot;
    let child = rootToBeRemoved.child;

    // reverse order of the root we are about to remove's children
    while (child) {
      const next = child.sibling;

      child.sibling = newRoot;
      // as we are doing this we remove the children's parent reference because it will change in the final union step
      child.parent = null;
      newRoot = child;

      child = next;
    }

    newHeap.root = newRoot;
    // this point there is no referene in the binomail tree to the rootToBeRemoved so its removed now

    // restore the binomial heap structure by uniting the rest of the heap with the removed root's reversed child root chain
    heap.union(newHeap);
  }

  /**
   * Extract the minimum value from the binomial heap
   *
   * Works by:
   * (Only step one is done in this function in this implementattion)
   * 1. finding the minimum root node in the root node linked list same as findMin while keeping a reference to its prev
   * 2. the rest is done in `removeRoot`
   *
   * Time Complexity: O(log(n))
   *
   * @returns {BinomHeapNode}
   * @memberof BinomialHeap
   */
  extractMin() {
    if (!this.root) return undefined;

    let min = this.root;
    let minPrev;

    let next = min.sibling;
    let nextPrev = min;

    // essentially the same operation as `findMin`
    // but we need to keep track of the min node's previous to change that when we remove it from the heap
    while (next) {
      if (this.comp(next, min)) {
        min = next;
        minPrev = nextPrev;
      }

      nextPrev = next;
      next = next.sibling;
    }

    // line 2 of pg 468 of CLR 1st ed chapter 19 and the rest of the function is in the subroutine removeRoot in this implementation
    BinomialHeap.removeRoot(this, min, minPrev);
    this.size -= 1;

    return min;
  }

  /**
   * Alias of extractMin
   *
   * Used to have uniform interfaces for all of the heaps
   *
   * @returns {BinomHeapNode}
   * @memberof BinomialHeap
   */
  pop() {
    return this.extractMin();
  }

  /**
   * Kinda similar to the swap operation in my `BinaryHeap`
   *
   * Swaps the keys and values of 2 nodes
   *
   * Time Complexity: O(1)
   *
   * @static
   * @param {any} node
   * @param {any} other
   * @memberof BinomialHeap
   */
  static exchange(node, other) {
    // all the other fields get swapped properly just by the key exhange

    const temp = {
      key: node.key,
      value: node.value,
    };

    node.key = other.key;
    node.value = other.value;

    other.key = temp.key;
    other.value = temp.value;
  }

  /**
   * Everybody's favorite (computer science professor's) method of changing the value of a node in a heap
   *
   * decrease key
   *
   * Needs a reference to node out from the node set to work
   *
   * Time Complexity: O(log(n))
   *
   * @param {BinomHeapNode} node
   * @param {BinomHeapNode} newKey
   * @returns {BinomHeapNode}
   * @memberof BinomialHeap
   */
  decreaseKey(node, newKey) {
    // key should be checked to not be greater according to CLRS 2nd edition
    // they were wrong you dont have to :) but you have to have your comparator working correctly
    // to make sure values dont get put in weird places

    node.key = newKey;

    // move node up tree until it stops breaking heap property
    let parent = node.parent;

    while (parent && this.comp(node, parent)) {
      BinomialHeap.exchange(node, parent);

      node = parent;
      parent = parent.parent;
    }

    // return the node for its new position
    return node;
  }

  /**
   * Obviously deletes a node from the heap
   *
   * Because of the properties of this data structure all we have to do is ...
   *
   * 1. Change this node's value to negative infinity
   * 2. then run extractMin to remove that lowest and node our target node from the tree :)
   *
   * Finally something easy to explain here lol
   *
   * Time Complexity: O(log(n))
   *
   * @param {any} node
   * @returns
   * @memberof BinomialHeap
   */
  delete(node) {
    // doing it the academic way of decreasing node to negative inifity
    // you could also just check for a another parameter i.e. toRoot
    // and move the node all the way to the root if for some crazy reason
    // you needed to store negative infinity but I dont
    //
    // only want BinomHeapNode objects here nothing else
    //
    // for instance if you gave it just a number the extract min function would still run
    // and this function would not only silently fail... it would also lie that it succeded lol

    if (!(node instanceof BinomHeapNode)) { // eslint-disable-line no-use-before-define
      throw new Error('Pass this function a valid BinomHeapNode or you are gonna have a bad time');
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
  }

  /**
   * Does this heap contain the input value?
   *
   * Time Complexity: O(1)
   *
   * @param {any} val
   * @returns
   * @memberof BinomialHeap
   */
  contains(val) {
    const node = this.getFromNodeSet(val);
    return dsalgo.utils.isDefined(node) ? node : false;
  }

  /**
   * Just an alias for `delete`
   *
   * Time Complexity: O(1)
   *
   * @param {any} node
   * @returns
   * @memberof BinomialHeap
   */
  remove(node) {
    return this.delete(node);
  }
}

/**
 * A Binomial Heap Tree Node
 *
 * @class BinomHeapNode
 * @property {number} value - the value held at this node of the binary search tree
 * @property {number} degree - the number of edges attached to this node https://en.wikipedia.org/wiki/Degree_(graph_theory)
 * @property {BinomHeapNode} parent - a reference to the object that represent's the nodes parent in this Binomial Heap Tree
 * @property {BinomHeapNode} child - a reference to the object that represent's the nodes child in this Binomial Heap Tree
 * @property {BinomHeapNode} sibling - a reference to the object that represent's the nodes sibling in this Binomial Heap Tree
 */
class BinomHeapNode {
  /**
   * Creates an instance of Node.
   * with the value of val
   *
   * @param {any} val
   * @memberof Node
   */
  constructor({
    key,
    value,
    degree = 0,
    parent = null,
    child = null,
    sibling = null,
  } = {}) {
    this.key = key;
    this.value = value;
    this.degree = degree;
    this.parent = parent;
    this.child = child;
    this.sibling = sibling;
  }
}

export default BinomialHeap;
