import LinkedList from './linked_list/singly_linked_list';

/**
 *
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
   * @param {any} topItem
   * @memberof stackWithArray
   */
  pop() {
    let topItem;
    if (this.stack_top_index > -1) {
      topItem = this.items[this.stack_top_index];
      this.items.splice(this.stack_top_index);
      // http://stackoverflow.com/questions/500606/javascript-array-delete-elements/500617#500617
      this.stack_top_index -= 1;
    } else {
      throw Error('stack empty');
    }

    return topItem;
  }

  /**
   * Check if the stack is empty
   *
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
   * @param {any} topItem
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
