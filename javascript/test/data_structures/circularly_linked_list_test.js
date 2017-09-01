import assert from 'assert';
import CircularlyLinkedList from '../../data_structures/linked_list/circularly_linked_list';

// never forget objects are only cleared across tests of functions
// not with each subtest of a function
describe('Circularly Linked List', () => {
  describe('#insertFront()', () => {
    const llist = new CircularlyLinkedList();
    it('inserts into linked list', () => {
      llist.insertFront(1);
      assert.equal(llist.head.value, 1);
    });

    it('inserts subsequent ahead of older value', () => {
      llist.insertFront(2);
      assert.equal(llist.head.value, 2);
      assert.equal(llist.head.next.value, 1);
      assert.equal(llist.head.next.prev.value, 2);
    });

    it('allows tail to reach head', () => {
      assert.equal(llist.head.value, 2);
      assert.equal(llist.tail.value, 1);

      assert.equal(llist.head.next.value, 1);
      assert.equal(llist.head.next.prev.value, 2);

      assert.equal(llist.tail.prev.value, 2);
      assert.equal(llist.tail.prev.next.value, 1);
    });
  });

  describe('#toArray()', () => {
    const llist = new CircularlyLinkedList();
    it('converts list to an array', () => {
      llist.insertFront(1).insertFront(2);

      // http://stackoverflow.com/questions/13225274/the-difference-between-assert-equal-and-assert-deepequal-in-javascript-testing-w
      assert.deepEqual(llist.toArray(), [2, 1]);
    });
  });

  describe('#insertEnd()', () => {
    const llist = new CircularlyLinkedList();

    it('inserts into linked list', () => {
      llist.insertEnd(1);
      assert.equal(llist.head.value, 1);
    });

    it('inserts subsequent value behind older value', () => {
      llist.insertEnd(2);
      assert.equal(llist.head.value, 1);
      assert.equal(llist.tail.value, 2);
      assert.equal(llist.head.next.value, 2);
      assert.equal(llist.head.next, llist.tail);
      assert.equal(llist.tail.prev, llist.head);
      assert.equal(llist.tail.prev.value, 1);
    });

    it('correctly converts toArray', () => {
      assert.deepEqual(llist.toArray(), [1, 2]);
    });

    it('allows tail to reach head', () => {
      assert.equal(llist.head.value, 1);
      assert.equal(llist.tail.value, 2);

      assert.equal(llist.head.next.value, 2);
      assert.equal(llist.head.next.prev.value, 1);

      assert.equal(llist.tail.prev.value, 1);
      assert.equal(llist.tail.prev.next.value, 2);
    });
  });

  describe('#removeFront()', () => {
    it('removes most recently inserted value', () => {
      const llist = new CircularlyLinkedList();
      llist.insertFront(1).insertFront(2);
      llist.removeFront();
      assert.equal(llist.head.value, 1);
    });

    it("doesn't break circularity", () => {
      const llist = new CircularlyLinkedList();
      llist.insertFront(1).insertFront(2).insertFront(3);

      llist.removeFront();

      assert.equal(llist.head.value, 2);
      assert.equal(llist.tail.value, 1);

      assert.equal(llist.head.next.value, 1);
      assert.equal(llist.head.next.prev.value, 2);

      assert.equal(llist.tail.prev.value, 2);
      assert.equal(llist.tail.prev.next.value, 1);
    });
  });

  describe('#removeEnd()', () => {
    it('removes least recently inserted value', () => {
      const llist = new CircularlyLinkedList();
      llist.insertFront(1).insertFront(2);
      llist.removeEnd();
      assert.equal(llist.head.value, 2);
    });

    it("doesn't break circularity", () => {
      const llist = new CircularlyLinkedList();
      llist.insertEnd(1).insertEnd(2).insertEnd(3);

      llist.removeEnd();
      assert.equal(llist.head.value, 1);
      assert.equal(llist.tail.value, 2);

      assert.equal(llist.head.next.value, 2);
      assert.equal(llist.head.next.prev.value, 1);

      assert.equal(llist.tail.prev.value, 1);
      assert.equal(llist.tail.prev.next.value, 2);
    });
  });
});

