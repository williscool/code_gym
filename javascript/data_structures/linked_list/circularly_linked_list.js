/**
 * Implements a doubly circularly linked list
 *
 * This version of a linked list is a version of a doubly linked list
 * where each node has links in both directions.
 * @TODO add insertAt() and removeAt()
 *
 * https://en.wikipedia.org/wiki/Doubly_linked_list#Circular_doubly_linked_list
 * @class CircularlyLinkedList
 * @property {Object} head - the node at the head of the linked list
 * @property {Object} tail - the node at the tail of the linked list
 */
class CircularlyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  /**
   * Inserts an item at the front of the list linked list
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {any} val value to insert into linked list
   * @returns {this} reference to this linked list
   * @memberof CircularlyLinkedList
   */
  insertFront(val) {
    const node = {
      value: val,
      prev: null,
      next: null,
    };

    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.next = node;
      node.prev = node;
    } else {
      node.next = this.head;
      node.prev = this.tail;

      const oldHead = this.head;
      oldHead.prev = node;

      this.tail.next = node;

      this.head = node;
    }

    return this;
  }

  /**
   * Inserts an item at the end of the list linked list
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {any} val value to insert into linked list
   * @returns {this} reference to this linked list
   * @memberof CircularlyLinkedList
   */
  insertEnd(val) {
    const node = {
      value: val,
      next: null,
    };

    if (!this.tail) {
      this.tail = node;
      this.head = node;
      node.next = node;
      node.prev = node;
    } else {
      this.tail.next = node;
      this.head.prev = node;

      node.next = this.head;
      node.prev = this.tail;

      this.tail = node;
    }

    return this;
  }


  /**
   * Remove and item from the back of the linked list
   *
   * Time Complexity: O(1)
   *
   * @returns {this} reference to this linked list
   * @memberof LinkedList
   */
  removeFront() {
    if (!this.head) {
      // do nothing but return for chaining
    } else {
      const newHead = this.head.next;
      newHead.prev = this.head.prev;
      this.head = newHead;
    }

    return this;
  }

  removeEnd() {
    if (this.tail) {
      const newTail = this.tail.prev;
      newTail.next = this.tail.next;
      this.tail = newTail;
    }

    return this;
  }

  /**
   * Make an array representation of the linked list
   * makes testing life easier
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @returns {array} this linked list's value in an array
   * @memberof LinkedList
   */
  toArray() {
    const arr = [];

    if (!this.head) {
      return arr;
    }

    arr.push(this.head.value);

    let cur = this.head.next;

    while (cur !== this.head) {
      arr.push(cur.value);
      cur = cur.next;
    }

    return arr;
  }
}

export default CircularlyLinkedList;
