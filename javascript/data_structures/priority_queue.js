import dsalgo from '../utilities';
import BinaryHeapTypes from './heap/binary_heap';
import BinomialHeap from './heap/binomial_heap';
import FibonacciHeap from './heap/fibonacci_heap';

/**
 * http://en.wikipedia.org/wiki/Priority_queue
 *
 * I made a naive one and then
 *
 * one for each of the 3 heap types I already made
 *
 * Pq's are pretty simple data structures a in terms of interface themselves.
 *
 * You have a bunch of items with prorities and you return the ones with the highest or lowest depending on if this is a max or min pq
 *
 * Dead simple. Making that efficient is where the complexity comes and its why people came up with those (and many more) crazy heap types.
 *
 * To make operations in this faster
 *
 * @module PriorityQueue
 */

const BinaryHeap = BinaryHeapTypes.custom;

/**
 * A naive priority queue os where #dequeue()
 *
 * starts from the front of queue and looks for the highest/lowest prority element to the
 * end and only changes the element if another element's priority is higher
 *
 * @class naivePQ
 */
class naivePQ {
  constructor({
    extreme = Number.NEGATIVE_INFINITY,
    comp = (a, b) => a > b, // default to max pq
  } = {}) {
    this.items = [];
    this.extreme = extreme;
    this.comp = comp;
  }

  /**
   * Adds a value to the priorty queue
   *
   * With priority level p
   *
   * Time Complexity: O(1)
   *
   * @param {number} val - the inserted value
   * @param {number} [p=0] - its priority level
   * @returns this
   * @memberof naivePQ
   */
  enqueue(val, p = 0) {
    // default could be negative infinity if you wanted
    //
    // But I'm assuming you would want the default to be neutral.
    // So you could proritize or deproritize based on your explicity settings
    this.items.push({
      priority: p,
      value: val,
    });
    return this;
  }

  /**
   * Returns the extrema value form the the queue
   *
   * need to get item with highest/lowest prority
   *
   * assume its item one with whatever prority than look for any item higher
   *
   * http://jsperf.com/comparison-of-numbers
   *
   * obviously this is an O(n) operation.
   *
   * Time Complexity O(n)
   *
   * @returns {any}
   * @memberof naivePQ
   */
  findExtreme() {
    let extremaItem;
    let extreme = this.extreme;
    let tmp;
    for (let i = 0; i < this.items.length; i += 1) {
      tmp = this.items[i].priority;

      if (this.comp(tmp, extreme)) {
        extreme = tmp;
        extremaItem = this.items[i];
        extremaItem.index = i;
      }
    }
    return extremaItem;
  }

  /**
   * Remove the extrema value from the queue
   *
   * Time Complexity: O(n)
   *
   * @returns this
   * @memberof naivePQ
   */
  dequeue() {
    this.items.splice(this.findExtreme().index, 1);
    return this;
  }

  /**
   * See what the extrema value is
   *
   * Time Complexity: O(1)
   *
   * @returns
   * @memberof naivePQ
   */
  peek() {
    return this.findExtreme().value;
  }
}

/**
 * Makes a Priority Queue with a binary heap
 *
 */
class BinaryHeapPQ {
  /**
   * Creates an instance of BinaryHeapPQ.
   * @param {function} comp defaults to max priority queue
   * @memberof BinaryHeapPQ
   */
  constructor({
    comp = (a, b) => {
      // have to break ties with the order values were inserted in
      //
      // http://stackoverflow.com/a/6909699/511710
      // http://algs4.cs.princeton.edu/25applications/StableMinPQ.java.html
      if (a.priority !== b.priority) return a.priority >= b.priority;

      // this takes a bit of explaining see around line 437 inside the siftDown function
      // of my heap I compare the elements being compared to do heap rotations with
      // the comparision function in an array and take the last value
      // so we need that last value to be the first element in the order of the queue
      //
      return a.order < b.order;
    },
    heapValueToString = a => `${a.value}:${a.order}`,
  } = {}) {
    this.comp = comp;

    this.heap = new BinaryHeap({
      comp: this.comp,
    });

    this.heap.valueToString = heapValueToString;
  }

  /**
   * Adds value to the priority queue
   *
   * Time Complexity: O(log(n))
   *
   * @param {number} val
   * @param {number} [p=0]
   * @returns
   * @memberof BinaryHeapPQ
   */
  enqueue(val, p = 0) {
    // default could be negative infinity if you wanted
    // But I think zero is more useful as it allows you to reproritize both postively and negatively
    this.heap.insert({
      priority: p,
      value: val,
      order: this.size(),
    });
    return this;
  }

  /**
   * Remove extrema value from queue
   *
   * Time Complexity: O(log(n))
   *
   * Because of use of BinaryHeap.pop
   *
   * @returns this
   * @memberof BinaryHeapPQ
   */
  dequeue() {
    return this.heap.pop().value;
  }

  /**
   * See what the extrema value is
   *
   * Time Complexity: O(1)
   *
   * @returns
   * @memberof BinaryHeapPQ
   */
  peek() {
    return this.heap.peek().value;
  }

  /**
   * Number of items in the queue
   *
   * Time Complexity: O(1)
   *
   * @returns
   * @memberof BinaryHeapPQ
   */
  size() {
    return this.heap.size();
  }

  /**
   * Change the priority of a value in the queue
   *
   * So there are several ways to accomplish what this function is set to do with a binary heap
   *
   * for instance
   *
   * you could search for the value in the array representing the heap remove the value and then reinsert it
   *
   * but that operation is O(n * log(n))
   *
   * O(n) to find the element and then log(n) to resatify the heap property
   *
   * not to mention we would need to do that operation V times (on each vertex) in the worse case in djikstra.
   *
   * so we can do better. though it will cost us O(n) extra space for our faster algorithm
   *
   * all we need to do maintain a set along side of our binary heap that keeps track of where
   * each value is in the heap as we update it
   *
   * and binary heap was updated to do so
   *
   * http://en.wikipedia.org/wiki/Dijkstra's_algorithm#Running_time
   *
   * @param {any} val - the value whose priority we changing
   * @param {number} newPriority - the new priority to be changed to
   * @param {number} order - the order at which that value was inserted
   * @returns
   * @memberof BinaryHeapPQ
   */
  changePriority(val, newPriority, order) {
    let orderInserted = null;
    // REMEMBER Order is the insertion order of a zero indexed array

    if (!dsalgo.utils.isDefined(order)) {
      // if the user doesn't define an order we have to linear search for the value
      // this is obviously O(n). but we will be using this most with's algorithm
      // in which we will know the insertion order ahead of time (namely djikstra and prim's)
      // greatly increasing the total speed of this whole operation

      const totalElements = this.heap.size();

      // this could tottally have been a for loop and would probably read cleaner that way... I just got bored of writin for loops
      let i = 0;
      while (i < totalElements) {
        const testObj = {
          value: val,
          order: i,
        };
        const index = this.heap.contains(testObj);
        if (index !== false) {
          orderInserted = i;
          break;
        }

        i += 1;
      }
    } else {
      orderInserted = order;
    }

    // why will this work?
    // because our toString function for this heap only looks at the value and the order it was inserted in
    const oldValueObj = {
      value: val,
      order: orderInserted,
    };

    const indexInQueue = this.heap.contains(oldValueObj);

    if (indexInQueue === false) return false; // value isnt here we are done

    const newValueObj = {
      priority: newPriority,
      value: val,
      order: orderInserted,
    };

    this.heap.updateValue(oldValueObj, newValueObj);
    return indexInQueue;
  }
}

/**
 * Give a binomial heap the right comparator and it will work
 * as a stable prority queue like magic
 *
 * who knew?
 *
 * @param {string} order - the whether this heap should be min or max ordered
 *
 * @class BinomialHeapPQ
 */
class BinomialHeapPQ {
  /**
   * Creates an instance of BinomialHeapPQ.
   * @param {function} comp defaults to max priority queue
   * @memberof BinomialHeapPQ
   */
  constructor({
    order = 'max',
    comp = (a, b) => {
      if (a.key !== b.key) return a.key >= b.key;
      return a.value.order < b.value.order;
    },
    heapValueToString = a => `${a.value}:${a.order}`,
  } = {}) {
    this.comp = comp;

    this.heap = new BinomialHeap({
      order,
      comp: this.comp,
    });

    this.heap.valueToString = heapValueToString;
  }
  /**
   * Adds value to the priority queue
   *
   * Time Complexity: O(log(n))
   *
   * @param {number} val
   * @param {number} [p=0]
   * @returns
   * @memberof BinomialHeapPQ
   */
  enqueue(val, p = 0) {
    this.heap.insert(p, {
      value: val,
      priority: p,
      order: this.size(),
    });
    return this;
  }

  /**
   * Remove extrema value from queue
   *
   * Time Complexity: O(log(n))
   *
   * Because of use of BinomialHeapPQ.pop
   *
   * @returns this
   * @memberof BinomialHeapPQ
   */
  dequeue() {
    return this.heap.pop().value;
  }

  /**
   * See what the extrema value is
   *
   * Time Complexity: O(log(n))
   *
   * @returns {number}
   * @memberof BinomialHeapPQ
   */
  peek() {
    return this.heap.peek().value;
  }

  /**
   * Number of items in the queue
   *
   * Time Complexity: O(1)
   *
   * @returns
   * @memberof BinomialHeapPQ
   */
  size() {
    return this.heap.size;
  }
}

/**
 * So I dont have to have the same function that does the exact same thing for 2 heap types
 *
 * Updates priority of a node.
 *
 * If you pass in the order it will be a constant time operation... if not we have to scan the total number nodes times to see what order it was place in
 *
 * Time Complexity: O(1) or O(n)
 *
 * @param {number} val
 * @param {number} newPriority
 * @param {number} order
 * @returns {boolean}
 */
function bionomialAndFibchangePriority(val, newPriority, order) {
  let orderInserted = null;
  let node;
  // REMEMBER Order is the insertion order of a zero indexed array

  if (!dsalgo.utils.isDefined(order)) {
    // slow linear search we wont have to do in djikstra
    const totalElements = this.size();
    let i = 0;
    while (i < totalElements) {
      const testObj = {
        value: val,
        order: i,
      };
      node = this.heap.contains(testObj);
      if (node !== false) {
        orderInserted = i;
        break;
      }

      i += 1;
    }
  } else {
    orderInserted = order;
  }

  // why will this work?
  // because our toString function for this heap only looks at the value and the order it was inserted in
  const oldValueObj = {
    value: val,
    order: orderInserted,
  };

  node = this.heap.contains(oldValueObj);

  if (node === false) return false; // value isnt here we are done

  // remember this is a reference to the actual node in the tree
  //  so we can just update the priority on it directly
  node.value.priority = newPriority;

  this.heap.decreaseKey(node, newPriority);
  return true;
}

BinomialHeapPQ.prototype.changePriority = bionomialAndFibchangePriority;

/**
 * Give a fibonacci heap the right comparator and it will work
 * as a stable prority queue like magic too
 *
 * again who knew?
 *
 * @class FibonacciHeapPQ
 */
class FibonacciHeapPQ {
  /**
   * Creates an instance of FibonacciHeapPQ.
   * @param {function} comp defaults to max priority queue
   * @memberof FibonacciHeapPQ
   */
  constructor({
    comp = (a, b) => {
      if (a.key !== b.key) return a.key >= b.key;
      return a.value.order < b.value.order;
    },
    heapValueToString = a => `${a.value}:${a.order}`,
  } = {}) {
    this.comp = comp;

    this.heap = new FibonacciHeap({
      comp: this.comp,
    });
    this.heap.valueToString = heapValueToString;
  }

  /**
   * Adds value to the priority queue
   *
   * Time Complexity: O(1)
   *
   * @param {number} val
   * @param {number} [p=0]
   * @returns
   * @memberof FibonacciHeapPQ
   */
  enqueue(val, p = 0) {
    this.heap.insert(p, {
      value: val,
      priority: p,
      order: this.size(),
    });
    return this;
  }

  /**
   * Remove extrema value from queue
   *
   * Time Complexity: O(log(n))
   *
   * Because of use of BinomialHeapPQ.pop
   *
   * @returns this
   * @memberof FibonacciHeapPQ
   */
  dequeue() {
    return this.heap.pop().value;
  }

  /**
   * See what the extrema value is
   *
   * Time Complexity: O(1)
   *
   * @returns {number}
   * @memberof FibonacciHeapPQ
   */
  peek() {
    return this.heap.peek().value;
  }

  /**
   * Number of items in the queue
   *
   * Time Complexity: O(1)
   *
   * @returns
   * @memberof FibonacciHeapPQ
   */
  size() {
    return this.heap.size;
  }
}

FibonacciHeapPQ.prototype.changePriority = bionomialAndFibchangePriority;

module.exports = {
  naive: naivePQ,
  binaryHeap: BinaryHeapPQ,
  binomialHeap: BinomialHeapPQ,
  fibonacciHeap: FibonacciHeapPQ,
};
