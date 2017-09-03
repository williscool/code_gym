/**
 * Implements a doubly linked list
 *
 * Note about this implementation that took me ages to figure out when I wrote this
 *
 * This version uses a trick for when there is only one node in the list.
 * Its makes said node both the head and the tail.
 *
 * Saves you a large amount of null checking in its methods. Pretty clever
 * @TODO add insertAt() and removeAt()
 *
 * http://en.wikipedia.org/wiki/Doubly_linked_list
 * @class DoublyLinkedList
 * @property {Object} head - the node at the head of the linked list
 * @property {Object} tail - the node at the tail of the linked list
 */
class DoublyLinkedList {
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
   * @param {any} val
   * @returns this
   * @memberof DoublyLinkedList
   */
  insertFront(val) {
    const node = {
      value: val,
      prev: null,
      next: null,
    };

    if (!this.head) {
      // create special case of one node doubly linked list
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
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
   * Note that here this function is O(1) unlike in its singularly linked cousin
   * obviously because we have a link to the final node
   *
   * @param {any} val
   * @returns this
   * @memberof DoublyLinkedList
   */
  insertEnd(val) {
    const node = {
      value: val,
      next: null,
    };

    if (!this.tail) {
      // create special case of one node doubly linked list
      this.tail = node;
      this.head = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
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
   * @memberof DoublyLinkedList
   */
  removeFront() {
    if (this.head) {
      // special case for removal of node from a list with only one node where
      // that node is both the head and the tail
      //
      // this is a convention people use to make the code for adding subsequent nodes easier
      // because you never have to do any null checking
      if (this.head === this.tail) {
        this.tail = null;
      }

      const newHead = this.head.next;
      this.head = newHead;
    }

    return this;
  }

  /**
   * Remove and item from the back of the linked list
   *
   * Time Complexity: O(1)
   *
   * @returns this
   * @memberof DoublyLinkedList
   */
  removeEnd() {
    if (this.tail) {
      // special case for list with one item
      if (this.head === this.tail) {
        this.head = null;
      }

      const newTail = this.tail.prev;
      this.tail = newTail;
      // since this is now no reference to the old head the garbage collector will delete it.
      // we could do that on our own if we wanted though
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
   * @returns this
   * @memberof DoublyLinkedList
   */
  toArray() {
    const arr = [];

    // special case for list with one item
    if (this.head === this.tail) {
      return [this.head.value];
    }

    let cur = this.head;

    while (cur) {
      arr.push(cur.value);
      cur = cur.next;
    }

    return arr;
  }
}

export default DoublyLinkedList;
