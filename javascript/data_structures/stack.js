import LinkedList from './linked_list/singly_linked_list';

/**
 * Build a stack using a javascript array
 * @class stackWithArray
 *
 * @property {Array} items - the array we use to store the values in the stack
 * @property {number} stack_top_index - array index of the top item in the stack
 */
class stackWithArray {
  constructor() {
    this.items = [];
    this.stack_top_index = -1;
  }

  /**
   * Push a new thing into the stack
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   * @param {any} thing value to get pushed on to stack
   * @memberof stackWithArray
   * @returns {this} returns instance of this stack to
   */
  push(thing) {
    this.stack_top_index = this.stack_top_index + 1;
    this.items[this.stack_top_index] = thing;
    return this;
  }

  /**
   * View the item on the top of the stack
   *
   * @memberof stackWithArray
   * @returns {any} the value of the item at the top of the stac
   */
  peek() {
    return this.items[0];
  }

  /**
   * Pops the thing on the top of the stack
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @memberof stackWithArray
   * @return {any} topItem the value of the item at the top of the stack
   */
  pop() {
    let topItem;
    if (this.stack_top_index > -1) {
      topItem = this.items[this.stack_top_index];
      // http://stackoverflow.com/questions/500606/javascript-array-delete-elements/500617#500617
      // if you actually want to get rid of the item
      // but this makes the runtime O(n)
      // https://stackoverflow.com/questions/5175925/whats-the-time-complexity-of-array-splice-in-google-chrome
      // this.items.splice(this.stack_top_index);
      this.stack_top_index -= 1;
    } else {
      throw Error('stack empty');
    }

    return topItem;
  }

  /**
   * Check if the stack is empty
   *
   * Time Complexity: O(1)
   * @returns {boolean} isEmpty
   * @memberof stackWithArray
   */
  isEmpty() {
    return this.stack_top_index === -1;
  }
}

/**
 *
 * Implements a stack with a linked list
 *
 * @class stackWithLinkedList
 * @property {Array} items - the array we use to store the values in the stack
 * @property {number} stack_top_index - used to tell how many items are in the stack
 */
class stackWithLinkedList {
  constructor() {
    this.items = new LinkedList();
    this.stack_top_index = -1;
  }

  /**
   * Push a new thing into the stack
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @memberof stackWithLinkedList
   * @param {any} thing thing to put into stack
   * @returns {this} this instance of the stack
   */
  push(thing) {
    this.stack_top_index += 1;
    this.items.insertFront(thing);
    return this;
  }

  /**
   * View the item on the top of the stack
   *
   * @returns {any} value of thing on the top of the stack
   * @memberof stackWithArray
   */
  peek() {
    return this.items.head.value;
  }

  /**
   * Pops aka removes the thing on the top of the stack
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   * @returns {any} the value from the item from the top of the stakc
   * @memberof stackWithLinkedList
   */
  pop() {
    let topItem;
    if (this.stack_top_index > -1) {
      topItem = this.items.head.value;
      this.items.removeFront();
      this.stack_top_index -= 1;
    } else {
      throw Error('stack empty');
    }

    return topItem;
  }

  /**
   * Check if the stack is empty
   *
   * Time Complexity: O(1)
   * @returns {boolean} isEmpty
   * @memberof stackWithLinkedList
   */
  isEmpty() {
    return this.stack_top_index === -1;
  }
}

export default {
  array: stackWithArray,
  linked_list: stackWithLinkedList,
};
