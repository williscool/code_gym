import DoublyLinkedList from './linked_list/doubly_linked_list';
import StackTypes from './stack';

/**
 * Queue with a doubly linked list
 *
 * @class queueDll
 * @property {DoublyLinkedList} items - the DoublyLinkedList of items in the queue
 * @property {number} length - the number of items in queue
 */
class queueDll {
  constructor() {
    this.items = new DoublyLinkedList();
    this.length = 0;
  }

  /**
   * Add an item to the queue
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {any} val
   * @returns this
   * @memberof queueDll
   */
  enqueue(val) {
    this.items.insertEnd(val);
    this.length += 1;
    return this;
  }

  /**
   * Remove an item from the queue in First in First Out order
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @returns {any} value
   * @memberof queueDll
   */
  dequeue() {
    const value = this.peek();
    this.items.removeFront();
    this.length -= 1;
    return value;
  }


  /**
   * Just look at the first item in the queue
   *
   * Time Complexity: O(1)
   *
   * @returns {any} value
   * @memberof queueDll
   */
  peek() {
    return this.items.head.value;
  }

  /**
   * See if the queue is empty
   *
   * Time Complexity: O(1)
   *
   * @returns {boolean} isEmpty
   * @memberof queueDll
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * Get an array representation of the queue
   *
   * Time Complexity: O(n)
   *
   * @returns {Array} queue
   * @memberof queueDll
   */
  toArray() {
    return this.items.toArray();
  }

  /**
   * Used to invoke a function on each element of the queue
   *
   * Time Complexity: O(n)
   *
   * nice for testing things
   *
   * @param {any} fn
   * @memberof queueDll
   */
  forEach(fn) {
    this.toArray().forEach(fn);
  }
}
/**
 * Queue with an array
 *
 * @class queueArr
 * @property {Array} items - the array of items in the queue
 * @property {number} length - the number of items in queue
 */
class queueArr {
  constructor() {
    this.items = [];
    this.length = 0;
  }

  /**
   * Add an item to the queue
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {any} val
   * @returns this
   * @memberof queueArr
   */
  enqueue(val) {
    this.items.push(val);
    this.length += 1;
    return this;
  }

  /**
   * Remove an item from the queue in First in First Out order
   *
   * Time Complexity: O(1)
   * Space Complexity: O(n)
   *
   * this is O(n) each time
   * https://github.com/v8/v8/blob/master/src/array.js#L620
   * which is fine for our academic purposes
   * the way to allow both enqueue and dequeue to be constant time with an array
   * backed queue is to use a fixed size queue and manipulate the front and rear indexs
   * ala
   * http://codereview.stackexchange.com/questions/64258/array-implementation-of-queue
   *
   * @returns {any} value
   * @memberof queueArr
   */
  dequeue() {
    const value = this.items.shift();
    this.length -= 1;
    return value;
  }

  /**
   * Just look at the first item in the queue
   *
   * Time Complexity: O(1)
   *
   * @returns {any} value
   * @memberof queueArr
   */
  peek() {
    return this.items[this.items.length - 1];
  }

  /**
   * See if the queue is empty
   *
   * Time Complexity: O(1)
   *
   * @returns {boolean} isEmpty
   * @memberof queueArr
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * Get an array representation of the queue
   *
   * Time Complexity: O(n)
   *
   * @returns {Array} queue
   * @memberof queueArr
   */
  toArray() {
    return this.items;
  }

  /**
   * Used to invoke a function on each element of the queue
   *
   * Time Complexity: O(n)
   *
   * nice for testing things
   *
   * @param {any} fn
   * @memberof queueArr
   */
  forEach(fn) {
    this.toArray().forEach(fn);
  }
}

const Stack = StackTypes.linked_list;
/**
 * Makes a queue using 2 stacks.
 *
 * A favorite toy interview problem
 *
 * Why would you ever actually do this? Stackoverflow's got an answer
 *
 * https://stackoverflow.com/questions/7395400/why-do-we-do-implement-a-queue-using-2-stacks
 * @class queueWithTwoStacks
 * @property {Stack.linked_list} in_stack - the items recently added to the queue
 * @property {Stack.linked_list} out_stack - the items on there way out of the queue
 * @property {number} length - the number of items in queue
 */
class queueWithTwoStacks {
  constructor() {
    this.in_stack = new Stack();
    this.out_stack = new Stack();
    this.length = 0;
  }

  /**
   * Moves things that where pushed fifo into the instack to the lifo outstack
   *
   * @memberof queueWithTwoStacks
   */
  flushInStackToOut() {
    // check if there is stuff on in stack and push on out Stack
    while (!this.in_stack.isEmpty()) {
      this.out_stack.push(this.in_stack.pop());
    }
  }

  /**
   * Take stuff from out_stack and return into an array
   *
   * @memberof queueWithTwoStacks
   * @returns {any} output
   */
  flushOutStackToArray() {
    const output = [];
    while (!this.out_stack.isEmpty()) output.push(this.out_stack.pop());
    return output;
  }

  /**
   * Add an item to the queue
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {any} val
   * @returns this
   * @memberof queueWithTwoStacks
   */
  enqueue(val) {
    this.in_stack.push(val);
    this.length += 1;
    return this;
  }

  /**
   * Remove an item from the queue in First in First Out order
   *
   * Amoritized Time Complexity: O(1)
   * Worst Case Time Complexity: O(n)
   *
   * @returns {any} value
   * @memberof queueWithTwoStacks
   */
  dequeue() {
    if (this.out_stack.isEmpty()) {
      this.flushInStackToOut();
    }
    const value = this.out_stack.pop();
    this.length -= 1;
    return value;
  }

  /**
   * Just look at the first item in the queue
   *
   * Amoritized Time Complexity: O(1)
   * Worst Case Time Complexity: O(n)
   *
   * @returns {any} value
   * @memberof queueWithTwoStacks
   */
  peek() {
    if (this.out_stack.isEmpty()) {
      this.flushInStackToOut();
    }
    // first item in out stack is the first item its it representing array
    return this.out_stack.peek();
  }

  /**
   * See if the queue is empty
   *
   * Time Complexity: O(1)
   *
   * @returns {boolean} isEmpty
   * @memberof queueWithTwoStacks
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * Get an array representation of the queue
   *
   * Time Complexity: O(n)
   *
   * @returns {Array} queue
   * @memberof queueWithTwoStacks
   */
  toArray() {
    let output = [];
    // concat returns a copy with arrays concatenated.
    // does not add in place. never forget
    output = output.concat(this.flushOutStackToArray());
    this.flushInStackToOut();
    return output.concat(this.flushOutStackToArray());
  }

  /**
   * Used to invoke a function on each element of the queue
   *
   * Time Complexity: O(n)
   *
   * nice for testing things
   *
   * @param {any} fn
   * @memberof queueWithTwoStacks
   */
  forEach(fn) {
    this.toArray().forEach(fn);
  }
}

export default {
  doubly_linked_list: queueDll,
  array: queueArr,
  with_two_stacks: queueWithTwoStacks,
};
