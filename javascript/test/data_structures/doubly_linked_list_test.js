var assert = require('assert');
var DoublyLinkedList = require('../../data_structures/linked_list/doubly_linked_list.js');

describe('Doubly Linked List', function() {

  describe('#insertFront()', function() {
    var llist = new DoublyLinkedList();
    it("inserts into linked list", function() {
      llist.insertFront(1);
      assert.equal(llist.head.value, 1);
    });

    it("inserts subsequent ahead of older value", function() {
      llist.insertFront(2);
      assert.equal(llist.head.value, 2);
      assert.equal(llist.head.next.value, 1);
      assert.equal(llist.head.next.prev.value, 2);
    });
  });

  describe('#toArray()', function() {
    it("converts list with one item an array", function() {
      var llist = new DoublyLinkedList();
      llist.insertFront(1);

      // http://stackoverflow.com/questions/13225274/the-difference-between-assert-equal-and-assert-deepequal-in-javascript-testing-w
      assert.deepEqual(llist.toArray(), [1]);
    });
    it("converts list to an array", function() {
      var llist = new DoublyLinkedList();
      llist.insertFront(1).insertFront(2);

      // http://stackoverflow.com/questions/13225274/the-difference-between-assert-equal-and-assert-deepequal-in-javascript-testing-w
      assert.deepEqual(llist.toArray(), [2, 1]);
    });
  });

  describe('#insertEnd()', function() {
    var llist = new DoublyLinkedList();

    it("inserts into linked list", function() {
      llist.insertEnd(1);
      assert.equal(llist.head.value, 1);
    });

    it("inserts subsequent value behind older value", function() {
      llist.insertEnd(2);
      assert.equal(llist.head.value, 1);
      assert.equal(llist.tail.value, 2);
      assert.equal(llist.head.next.value, 2);
      assert.equal(llist.head.next, llist.tail);
      assert.equal(llist.tail.prev, llist.head);
      assert.equal(llist.tail.prev.value, 1);
    });

    it("correctly converts toArray", function() {
      assert.deepEqual(llist.toArray(), [1, 2]);
    });
  });

  describe('#removeFront()', function() {
    var llist = new DoublyLinkedList();
    llist.insertFront(1);

    it("works corectly with 1 value", function() {
      llist.removeFront();
    });

    llist.insertFront(1).insertFront(2);
    it("removes most recently inserted value", function() {
      llist.removeFront();
      assert.equal(llist.head.value, 1);
    });
  });

  describe('#removeEnd()', function() {
    var llist = new DoublyLinkedList();
    llist.insertFront(1);

    it("works corectly with 1 value", function() {
      llist.removeEnd();
    });

    llist.insertFront(1).insertFront(2);
    it("removes least recently inserted value", function() {
      llist.removeEnd();
      assert.equal(llist.head.value, 2);
    });
  });


});

