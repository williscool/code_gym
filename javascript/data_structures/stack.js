import LinkedList from './linked_list/singly_linked_list';

/**
 * Build a stack using a javascript array
 * @class stackWithArray
 *
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
   * @param {any} thing
   * @returns this
   * @memberof stackWithArray
   */
  push(thing) {
    this.stack_top_index = this.stack_top_index + 1;
    this.items[this.stack_top_index] = thing;
    return this;
  }

  /**
   * Pops the thing on the top of the stack
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   * @param {any} topItem
   * @memberof stackWithArray
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
   * @returns {bool} isEmpty
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
   * @param {any} thing
   * @returns this
   * @memberof stackWithLinkedList
   */
  push(thing) {
    this.stack_top_index = this.stack_top_index + 1;
    this.items.insertFront(thing);
    return this;
  }

  /**
   * Pops the thing on the top of the stack
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   * @return {any} topItem
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
   * @returns {bool} isEmpty
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
