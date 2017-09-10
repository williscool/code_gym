import dsalgo from '../../utilities';
import seqsearch from '../../algorithms/searching/sequentialsearch';

/**
 * Binary Heap
 *
 * http://en.wikipedia.org/wiki/Binary_heap
 * http://en.wikipedia.org/wiki/Heap_%28data_structure%29#Implementation
 *
 * Steps to understanding this thing
 *
 * 1. Recognize that binary heaps are mostly implemented as specially indexed arrays and nodes (parents and children) are accessed with standard math functions https://en.wikipedia.org/wiki/Implicit_data_structure#Examples
 * 2. Look at the functions that are used for those acceses in the array `leftI` `left` and so on and so forth
 * 3. Remember that placing the extrema (highest for max, lowest for min) at the top and having its children be lesser extrema is what creates and preserves the heap property
 * 4. Check the `insert` function and its dependant `siftUp` for how 3 is maintained on insert
 * 5. Check the `remove` function note how we now need both `siftUp` and `siftDown` (called through `reHeapifyAt`) to restore the heap property
 * 6. Stuffs pretty stright forward from there
 *
 * also why heaps are mostly done with arrays
 * http://stackoverflow.com/questions/14719007/why-is-a-binary-heap-better-as-an-array-than-a-tree
 *
 * inspirations:
 *
 * http://eloquentjavascript.net/1st_edition/appendix2.html
 *
 * https://gist.github.com/dburger/1008320
 *
 * http://docs.closure-library.googlecode.com/git/local_closure_goog_structs_heap.js.source.html
 * https://github.com/google/closure-library/blob/master/closure/goog/structs/heap.js
 *
 * http://www.bebetterdeveloper.com/data-structure-binary-heap/
 *
 * https://github.com/thauburger/js-heap/blob/master/heap.js
 * http://www.benfrederickson.com/heap-visualization/
 *
 * @prop items - the array that represents this heap
 * @prop comp - the comparision function for this heap
 * @prop valueToString - a function that turns a given value into a string used for object key
 *
 * @class Heap
 */
class Heap {
  /**
   * Creates an instance of Heap.
   *
   * Default to max heap
   * need to set comparator first or it wont be set for the constructors call to siftUp
   * heaps children can be == to also
   *
   * updated to use default params
   *
   * @param {[]} array
   * @param {Function} compfn
   * @param {Function} valueToString
   *
   * @prop array - the options for the function will move to a param soon
   * @prop comp - the comparision function
   * @prop valueToString - function to turn your input values (which could be numbers or objects) into a string defaults to `JSON.stringify`
   * @memberof Heap
   */
  constructor({
    array = [],
    comp,
    valueToString = a => JSON.stringify(a), // quick and dirty way to support objects also since they wont be that big
  } = {}) {
    this.comp = comp;

    if (!dsalgo.utils.isDefined(this.comp)) {
      // eslint-disable-next-line max-len
      throw new Error('You must define a comparision function for a custom binary heap. check Min and Max for examples');
    }

    this.valueToString = valueToString;

    // always set to an array at first
    this.items = array;

    // creation and updating of value set heavily influenced by
    //
    // http://stackoverflow.com/a/17581306/511710
    // http://stackoverflow.com/questions/17009056/how-to-implement-ologn-decrease-key-operation-for-min-heap-based-priority-queu#comment24578437_17009056
    // and https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Running_time
    this.valueSet = dsalgo.utils.simpleSet();

    if (this.items.length > 0) {
      // add the items to our set with their index
      this.items.forEach((val, i) => {
        this.addToValueSet(val, i);
      });
      this.buildHeap();
    }
  }

  /**
   * Add a value to the set that tracks values in the heap
   *
   * Time Complexity: O(1)
   *
   * @param {string} key
   * @param {any} val
   * @memberof Heap
   */
  addToValueSet(key, val) {
    // key = value storing, val = indexAt
    this.valueSet[this.valueToString(key)] = val;
  }

  /**
   * Get a value from the value set
   *
   * Time Complexity: O(1)
   *
   * @param {string} key
   * @returns
   * @memberof Heap
   */
  getFromValueSet(key) {
    return this.valueSet[this.valueToString(key)];
  }

  /**
   * Remove a value from the value set
   *
   * Time Complexity: O(1)
   *
   * @param {string} key
   * @memberof Heap
   */
  removeFromValueSet(key) {
    delete this.valueSet[this.valueToString(key)];
  }

  /**
   * Updated swap in this heap object to also move index in value set
   *
   * attaching it to the heap's prototype also allows the this value to bind properly
   * so that we are referencing the valueSet of this heap object
   *
   * Not here though that the valueSet is bound to a partcular heap instance
   *
   * so it would be more correct to use `this.items` in here and I may switch to that in the future
   *
   * This was just easy to keep the same interface as the old swap calls
   *
   * Time Complexity: O(1)
   *
   * @todo swith change the swap calls and interface
   *
   * @param {array} list
   * @param {number} firstIndex
   * @param {number} secondIndex
   * @returns {array}
   * @memberof Heap
   */
  swap(list, firstIndex, secondIndex) {
    const firstItem = list[firstIndex];
    const secondItem = list[secondIndex];

    // here we are swaping the index values at the set key of each value NOT the set keys themselves.
    this.addToValueSet(secondItem, firstIndex);
    this.addToValueSet(firstItem, secondIndex);

    return dsalgo.utils.swap(list, firstIndex, secondIndex);
  }

  /**
   * Returns the value at the input index
   *
   * Time Complexity: O(1)
   *
   * @param {number} i
   * @returns {number}
   * @memberof Heap
   */
  valueAt(i) {
    return this.items[i];
  }

  /**
   * Calculate the parent array index of the input index
   *
   * Time Complexity: O(1)
   *
   * @static
   * @param {number} i
   * @returns {number}
   * @memberof Heap
   */
  static parentI(i) {
    return (i - 1) >> 1; // eslint-disable-line no-bitwise
  }

  /**
   * Returns the value at the input index's parent
   *
   * Using `Heap.parentI` to get the value from of the array representing the binary heap
   *
   * Time Complexity: O(1)
   *
   * not running this in a browser on the window object so name is cool
   * @param {number} i
   * @returns {number}
   * @memberof Heap
   */
  parent(i) {
    return this.items[Heap.parentI(i)];
  }

  // left and right children related stuff
  /**
   * Calculate the left child array index of the input index
   *
   * Time Complexity: O(1)
   *
   * @static
   * @param {number} i
   * @returns {number}
   * @memberof Heap
   */
  static leftI(i) {
    return (i * 2) + 1;
  }

  /**
   * Calculate the right child array index of the input index
   *
   * Time Complexity: O(1)
   *
   * @static
   * @param {number} i
   * @returns {number}
   * @memberof Heap
   */
  static rightI(i) {
    return (i * 2) + 2;
  }

  /**
   * Retpurns the value at the input index's left child
   *
   * Using `Heap.leftI` to get the value from of the array representing the binary heap
   *
   * Time Complexity: O(1)
   *
   * @param {number} i
   * @returns {number}
   * @memberof Heap
   */
  left(i) {
    return this.items[Heap.leftI(i)];
  }

  /**
   * Returns the value at the input index's right child
   *
   * Using `Heap.rightI` to get the value from of the array representing the binary heap
   *
   * Time Complexity: O(1)
   *
   * @param {number} i
   * @returns {number}
   * @memberof Heap
   */
  right(i) {
    return this.items[Heap.rightI(i)];
  }

  /**
   * Constant Contains
   *
   * Just sees if the value is in the value set
   *
   * Time Complexity: O(1)
   *
   * @param {any} val
   * @returns
   * @memberof Heap
   */
  contains(val) {
    const index = this.getFromValueSet(val);
    if (!dsalgo.utils.isDefined(index)) return false;
    return index;
  }

  /**
   * Uses seqential search to see if a value is in the heap
   *
   * Time Complexity: O(n)
   *
   * @param {number} val
   * @returns {boolean}
   * @memberof Heap
   */
  naiveContains(val) {
    return seqsearch(this.items, val);
  }

  /**
   * Check the value at the top of the binary heap
   *
   * Time Complexity: O(1)
   *
   * @returns
   * @memberof Heap
   */
  peek() {
    return this.items[0];
  }

  /**
   * The number of items in the binary heap
   *
   * Trvially the length of it representing array
   *
   * Time Complexity: O(1)
   *
   * @returns {number}
   * @memberof Heap
   */
  size() {
    return this.items.length;
  }

  /**
   * Move a value to its correct position in the tree
   *
   * Works by checking for the nodes parent and swapping with it if it meets the comparator condition
   *
   * i.e. If the parent is higher and this is a max heap stop.
   *
   * If not keep running this function until the value stops or becomes the head of the tree
   *
   * A great way to thing about wtf this function is doing is swaping a child node with parents until it is in the right place in the tree
   *
   * Time Complexity: O(log(n))
   *
   * @param {number} i
   * @memberof Heap
   */
  siftUp(i) {
    if (i < 1) return; // once we hit the zeroth index we're done

    const parentI = Heap.parentI(i);
    const parentVal = this.parent(i);

    const currentIVal = this.items[i];

    if (this.comp(currentIVal, parentVal)) {
      this.items = this.swap(this.items, i, parentI);
      // obviously this is the recursive style you could do it iteratively ala bubbleUp here
      // http://eloquentjavascript.net/1st_edition/appendix2.html
      this.siftUp(parentI);
    }
  }

  /**
   * Insert a value into the Binary Heap
   *
   * https://en.wikipedia.org/wiki/Binary_heap#Insert
   *
   * Works by adding the value to the end of the array (in essence adding it to the bottom level of the tree as its right most child)
   *
   * Then using `siftUp` to restore the heap property
   *
   * Time Complexity: O(log(n))
   *
   * @param {number} val
   * @returns {this}
   * @memberof Heap
   */
  insert(val) {
    this.items.push(val);
    this.addToValueSet(val, this.size() - 1); // since we put the value at the end its starting vertex is the last of the array
    if (this.size() > 1) this.siftUp(this.items.length - 1);
    return this;
  }

  /**
   * siftDown aka heapify
   *
   * Time Complexity: O(log(n))
   *
   * A great way to thing about wtf this function is doing is it is swaping a parent node with children until it finds its rightful place in the heap
   *
   * http://en.wikipedia.org/wiki/Binary_heap
   * interesting thing I've learned from research
   *
   * Many implementations of heaps (even the one from the famous CLRS
   * refer to what the main Heap (as opposed to the binary heap) wikipedia article
   * calls sift-down as heapify
   *
   * @param {number} i
   * @param {number} endPos
   * @memberof Heap
   */
  siftDown(i, endPos) {
    // extrema is semantic to largest or smallest
    // http://en.wikipedia.org/wiki/Extrema

    let extremaPos = i;
    const extremaVal = this.items[i];

    const leftI = Heap.leftI(i);
    const rightI = Heap.rightI(i);

    let left = this.left(i);
    let right = this.right(i);

    // much easier than what I was doing earlier
    // http://www.cs.rit.edu/~rpj/courses/bic2/studios/studio1/studio121.html

    // default them to false now because the filter used on comp arr would drop anything
    // that evaluates to false in the comparison of '> -1' which includes objects lol
    // which had the unforunate side effect of making this stucture not properly store anything but integers
    //
    // BUT WARNING THARE BE DRAGONS!!!
    //
    // in javascript 0==false
    //
    // so everwhere in this function MUST USE ===
    //
    if (!dsalgo.utils.isDefined(left)) left = false;
    if (!dsalgo.utils.isDefined(right)) right = false;

    if (dsalgo.utils.isDefined(endPos)) {
      // if either index value is greater than the endPos in a heapsort
      //
      // it is in the sorted part the array and will be ignored for sifting the value down the heap

      if (rightI > endPos) right = false;
      if (leftI > endPos) left = false;
    }

    const compArr = [extremaVal, left, right];

    // also need to drop any values less than zero to discard out of bounds indexes
    const extrema = compArr.sort(this.comp).filter(val => val !== false).pop();

    // http://algs4.cs.princeton.edu/24pq/
    // "if records can have duplicate keys, maximum means any record with the largest key value"
    //
    // so I pick to always default to not shifting the tree again

    if (extrema === left) extremaPos = leftI;
    if (extrema === right) extremaPos = rightI;

    // this isn't necessary it's just left to document what happens in this case
    // potentially there is a duplicate value and we choose to not change the tree again
    //
    // default back to leaving tree alone.
    // if (extrema === extremaVal) extremaPos = extremaPos

    if (extremaPos !== i) {
      this.items = this.swap(this.items, extremaPos, i);
      this.siftDown(extremaPos, endPos);
    }
  }

  /**
   * Removes the extrema (min or max) value from the heap
   *
   * aka extract-min||max http://en.wikipedia.org/wiki/Heap_%28data_structure%29#Operations
   *
   * Super simple. Take the top value (at the first index of the array)
   *
   * Remove the one from the last index and `siftDown`
   *
   * Time Complexity: O(log(n))
   *
   * @returns {numbere}
   * @memberof Heap
   */
  pop() {
    const retValue = this.items[0];
    const lastValue = this.items.pop();

    // sift it down
    if (this.size() > 0) {
      // pop off the last value to shorten array and set it as the new root of the array
      this.items[0] = lastValue;

      // sift it down into position
      // TODO: see if you can safely use reHeapifyAt here
      this.siftDown(0);
    }

    this.removeFromValueSet(retValue);
    return retValue;
  }

  /**
   * Restores the heap property for the heap
   *
   * Using Calls to `siftUp` and `siftDown`
   *
   * @TODO figure out why siftUp in not necessary but siftDown is
   *
   * Time Complexity: O(log(n))
   *
   * @param {any} index
   * @returns {this}
   * @memberof Heap
   */
  reHeapifyAt(index) {
    if (!dsalgo.utils.isDefined(this.items[index])) return false;

    // set new value and rejigger heap to satify heap property again
    // rejigger being the techincal term
    // fun fact you dont HAVE to siftUp but you do have to siftDown
    this.siftUp(index);
    this.siftDown(index);
    return this;
  }

  /**
   * Remove a value from the heap
   *
   * Remove arbitrary value and re heap
   *
   * Steps
   * 1. find the value
   * 2. Pop the value off of the end of the array
   * 3. If thats you value you are done
   * 4. If its not swap that last value from the array and restore the heap property (in `reHeapifyAt`)
   *
   * You'll step 1 this implemented in one of 2 ways
   *
   * 1. Sequentially search through the array to find the value. this is obviously O(n) http://eloquentjavascript.net/1st_edition/appendix2.html
   * 2. Keep an auxillary data stucture that stores you values and their corresponding indicies. Use that to get your value. this is O(1) time in exchange for O(n) extra space
   *
   * Time Complexity: O(log(n))
   *
   * @param {number} val - the value to be removed from the heap
   * @returns {number|false} - the index the value was removed from or that the value did not exist
   * @memberof Heap
   */
  remove(val) {
    const inHeap = this.contains(val);

    // 0 == false in javascript even though its a valid index so we must explicitly check for false
    if (inHeap === false) return false;

    // else

    const last = this.items.pop();

    if (val === last) return inHeap; // we done return the index we removed it from

    // swap end to the elements position and then reheap
    this.items[inHeap] = last;
    this.reHeapifyAt(inHeap);
    return inHeap;

    // dont know what returning the index you removed from could be useful for but why not?
    // you could also just return true
  }

  /**
   * Used to change the value of a node in the heap
   *
   * This is used in a prority queue implementation to change the prority of things in the queue
   *
   * Because of the propeties of our heap it make doing this operation efficient for priority queue implementations
   *
   * Time Complexity: O(log(n))
   *
   * @param {any} val
   * @param {any} newValue
   * @returns
   * @memberof Heap
   */
  updateValue(val, newValue) {
    const indexInHeap = this.contains(val);

    // 0 == false in javascript even though its a valid index so we must explicitly check for false
    if (indexInHeap === false) return false;

    // else

    this.items[indexInHeap] = newValue;

    // need to remove old value from valueSet and add new one
    this.removeFromValueSet(val);
    this.addToValueSet(newValue, indexInHeap);

    this.reHeapifyAt(indexInHeap);

    // return new index of new value
    return this.getFromValueSet(newValue);
  }

  /**
   * Make a heap out of the array tied to this heap object
   * the old way I was doing it was the naive version
   *
   * in that you just call insert for each element in the array and its O(n log n)
   *
   * this is now the optimized version
   * http://en.wikipedia.org/wiki/Binary_heap#Building_a_heap
   *
   * Time Complexity: O(h)
   *
   * Where h is the height of the resulting tree.
   *
   * @memberof Heap
   */
  buildHeap() {
    for (let i = (this.size() - 1) >> 1; i >= 0; i -= 1) { // eslint-disable-line no-bitwise
      this.siftDown(i);
    }
  }

  /**
   * Sort the list
   *
   * how? what do we know about a max heap?
   *
   * the highest value is at the top...
   *
   * so knowing that we can move that value to the end and then make another heap out of the remaining elements
   *
   * ignoring our previously swapped element
   *
   * what will this give us? at the top our next highest element! so we repeat this until we reach the end of the list :)
   *
   * Time Complexity: O(n * log(n))
   *
   * note about this function. It will invalidate the heap property of this data structure if you dont restore it!
   *
   * how to handle this?
   * either re heap after or create a copy of the items in original order and reset them later
   *
   * @returns {number[]}
   * @memberof Heap
   */
  heapsort() {
    // store the array in its orginal heapified form so we can restore it later
    const heapifiedList = dsalgo.utils.arrayDeepCopy(this.items);

    const len = this.size();

    let end = len - 1;

    for (let i = len - 1; i > 0; i -= 1) {
      this.items = this.swap(this.items, 0, i);
      end -= 1;
      this.siftDown(0, end);
    }

    const sortedList = this.items;

    // restore
    this.items = heapifiedList;

    return sortedList;
  }

  /**
   * Checks to see if we have a valid binary heap
   *
   * http://stackoverflow.com/questions/15579240/max-heapify-algorithm-results/15582773#15582773
   *
   * start from last node with children and run back to beginning making sure that our heap property is intact
   *
   * Time Complexity: O(log(n))
   *
   * @returns
   * @memberof Heap
   */
  isValid() {
    const heap = this;

    for (let i = (heap.size() - 1 >> 1) - 1; i >= 0; i -= 1) { // eslint-disable-line no-bitwise
      const curParent = heap.valueAt(i);
      const left = heap.left(i);
      const right = heap.right(i);

      // if(!heap.comp(curVal, left) || !(heap.comp(curVal, right))) debugger;
      //
      // Comparator is Greater than for max heap and Less than for min heap of course

      // here we return false if ever a parent child relationship fails the Comparison
      if (heap.comp(curParent, left) !== true) return false;
      if (heap.comp(curParent, right) !== true) return false;
    }

    return true;
  }
}

/**
 * Use a max compartor to create a max heap
 *
 * @class MaxHeap
 * @extends {Heap}
 */
class MaxHeap extends Heap {
  constructor({
    array = [],
    comp = (a, b) => a >= b,
    valueToString = a => JSON.stringify(a), // quick and dirty way to support objects also since they wont be that big
  } = {}) {
    super({ array, comp, valueToString });
  }
}

/**
 * Min Heap is the EXACT same logic as max just with a different comparator
 *
 * @class MinHeap
 * @extends {Heap}
 */
class MinHeap extends Heap {
  constructor({
    array = [],
    comp = (a, b) => a <= b,
    valueToString = a => JSON.stringify(a), // quick and dirty way to support objects also since they wont be that big
  } = {}) {
    super({ array, comp, valueToString });
  }
}

export default {
  min: MinHeap,
  max: MaxHeap,
  custom: Heap,
};
