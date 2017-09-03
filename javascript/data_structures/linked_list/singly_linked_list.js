/**
 * Implements a Singly Linked List
 *
 * @TODO add insertAt() and removeAt()
 * @class LinkedList
 *
 * @property {Object} head - the node at the head of the linked list
 */
class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * Inserts an item at the front of the list linked list
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {any} val
   * @returns this
   * @memberof LinkedList
   */
  insertFront(val) {
    const node = {
      value: val,
      next: null,
    };

    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    return this;
  }

  /**
   * Insert an item at the end of the linked list
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * @param {any} val
   * @returns this
   * @memberof LinkedList
   */
  insertEnd(val) {
    const node = {
      value: val,
      next: null,
    };

    if (!this.head) {
      this.head = node;
    } else {
      let cur = this.head;

      while (cur.next) {
        cur = cur.next;
      }
      cur.next = node;
    }

    return this;
  }

  /**
   * Remove an item from the front of the linked list
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @returns this
   * @memberof LinkedList
   */
  removeFront() {
    if (!this.head) {
      return this;
    }
    const newHead = this.head.next;
    delete this.head;
    this.head = newHead;
    return this;
  }

  /**
   * Remove and item from the back of the linked list
   *
   * Time Complexity: O(n)
   *
   * @returns this
   * @memberof LinkedList
   */
  removeEnd() {
    if (!this.head) {
      // do nothing but return for method chaining
      return this;
    }
    let cur = this.head;

    while (cur) {
      cur = cur.next;
    }

    cur = null;

    return this;
  }

  /**
   * Make an array representation of the linked list
   * makes testing life easier
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @returns this
   * @memberof LinkedList
   */
  toArray() {
    const arr = [];

    let cur = this.head;

    while (cur) {
      arr.push(cur.value);
      cur = cur.next;
    }

    return arr;
  }
}

export default LinkedList;
