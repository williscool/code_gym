var assert = require('assert');
var LinkedList = require('../../data_structures/linked_list/singly_linked_list.js');

describe('Singly Linked List', function(){

  describe('#insertFront()', function(){
    var llist = new LinkedList();
    it("inserts into linked list", function(){
      llist.insertFront(1);
      assert.equal(llist.head.value, 1);
    });

    it("inserts subsequent ahead of older value", function(){
      llist.insertFront(2);
      assert.equal(llist.head.value, 2);
    });
  });

  describe('#toArray()', function(){
    var llist = new LinkedList();
    it("converts list to an array", function(){
      llist.insertFront(1).insertFront(2);

      // http://stackoverflow.com/questions/13225274/the-difference-between-assert-equal-and-assert-deepequal-in-javascript-testing-w
      assert.deepEqual(llist.toArray(), [2,1]);
    });
  });

  describe('#insertEnd()', function(){
    var llist = new LinkedList();

    it("inserts into linked list", function(){
      llist.insertEnd(1);
      assert.equal(llist.head.value, 1);
    });

    it("inserts subsequent value behind older value", function(){
      llist.insertEnd(2);
      assert.equal(llist.head.value, 1);
    });

    it("correctly converts toArray", function(){
      assert.deepEqual(llist.toArray(), [1,2]);
    });
  });

  describe('#removeFront()', function(){
    var llist = new LinkedList();
    llist.insertFront(1).insertFront(2);

    it("removes most recently inserted value", function(){
      llist.removeFront();
      assert.equal(llist.head.value, 1);
    });
  });

  describe('#removeEnd()', function(){
    var llist = new LinkedList();
    llist.insertFront(1).insertFront(2);

    it("removes least recently inserted value", function(){
      llist.removeEnd();
      assert.equal(llist.head.value, 2);
    });
  });


});

