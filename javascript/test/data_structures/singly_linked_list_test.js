import assert from 'assert';
import LinkedList from '../../data_structures/linked_list/singly_linked_list';

describe('Singly Linked List', () => {
  describe('#insertFront()', () => {
    const llist = new LinkedList();
    it('inserts into linked list', () => {
      llist.insertFront(1);
      assert.equal(llist.head.value, 1);
    });

    it('inserts subsequent ahead of older value', () => {
      llist.insertFront(2);
      assert.equal(llist.head.value, 2);
    });
  });

  describe('#toArray()', () => {
    const llist = new LinkedList();
    it('converts list to an array', () => {
      llist.insertFront(1).insertFront(2);

      // http://stackoverflow.com/questions/13225274/the-difference-between-assert-equal-and-assert-deepequal-in-javascript-testing-w
      assert.deepEqual(llist.toArray(), [2, 1]);
    });
  });

  describe('#insertEnd()', () => {
    const llist = new LinkedList();

    it('inserts into linked list', () => {
      llist.insertEnd(1);
      assert.equal(llist.head.value, 1);
    });

    it('inserts subsequent value behind older value', () => {
      llist.insertEnd(2);
      assert.equal(llist.head.value, 1);
    });

    it('correctly converts toArray', () => {
      assert.deepEqual(llist.toArray(), [1, 2]);
    });
  });

  describe('#removeFront()', () => {
    const llist = new LinkedList();
    llist.insertFront(1).insertFront(2);

    it('removes most recently inserted value', () => {
      llist.removeFront();
      assert.equal(llist.head.value, 1);
    });
  });

  describe('#removeEnd()', () => {
    const llist = new LinkedList();
    llist.insertFront(1).insertFront(2);

    it('removes least recently inserted value', () => {
      llist.removeEnd();
      assert.equal(llist.head.value, 2);
    });
  });
});
