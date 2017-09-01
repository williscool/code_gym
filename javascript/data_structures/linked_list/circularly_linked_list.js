/**
 * Implements a doubly circularly linked list
 *
 * This version of a linked list is a version of a doubly linked list
 * where each node has links in both directions.
 *
 * https://en.wikipedia.org/wiki/Doubly_linked_list#Circular_doubly_linked_list
 * @TODO add insertAt() and removeAt()
 * @class CircularlyLinkedList
 */
class CircularlyLinkedList {
  /**
   * Inserts an item at the front of the list linked list
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   *
   * @param {any} val
   * @returns this
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
   * @param {any} val
   * @returns this
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
   * @returns this
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
   * @returns this
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
