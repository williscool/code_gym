var assert = require('assert');
var dsalgo = require('../../utilities.js').dsalgo;

var FibonacciHeap = require('../../data_structures/heap/fibonacci_heap.js');

describe('Fibonacci Heap', function() {

  describe('contructor works', function() {

    it("at all", function() {
      var heap = new FibonacciHeap();
      assert.equal(heap.size, 0);
    });

  });

  describe('#insert()', function() {
    it("single node", function() {
      var heap = new FibonacciHeap();
      heap.insert(42);
      assert.equal(heap.peek().key, 42);
      assert.equal(heap.size, 1);
    });

    it("multiple nodes", function() {
      var heap = new FibonacciHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.size, 3);
      assert.equal(heap.peek().key, [24]);
    });

  // order of the tree isn't very interesting until the first removal
  // its just a linked list no need to test that
  });

  describe('pop()', function() {
    it("single node", function() {
      var heap = new FibonacciHeap();
      heap.insert(42);
      assert.equal(heap.pop().key, 42);
      assert.equal(heap.size, 0);
    });

    it("multiple nodes", function() {
      var heap = new FibonacciHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it("even more modes", function() {
      var heap = new FibonacciHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25).insert(57).insert(39).insert(30);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 25);
      assert.equal(heap.size, 6);
    });


  });

  describe('#decreaseKey()', function() {
    it("reduces a node's key value", function() {
      var heap = new FibonacciHeap();
      heap.insert(42);

      var node = heap.minNode;

      heap.decreaseKey(node, 17);

      assert.equal(node.key, 17);

    });

  });

  describe('remove()', function() {
    it("single node", function() {
      var heap = new FibonacciHeap();
      heap.insert(42);
      assert(heap.remove(heap.minNode));
      assert.equal(heap.size, 0);
    });

    it("multiple nodes", function() {
      var heap = new FibonacciHeap();
      heap.insert(42).insert(37).insert(24);
      assert(heap.remove(heap.minNode));
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it("even more modes", function() {
      var heap = new FibonacciHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25).insert(57).insert(39).insert(30);

      assert(heap.remove(heap.minNode));
      assert.equal(heap.peek().key, 25);
      assert.equal(heap.size, 6);
    });

    it("works correctly after a consolidation", function() {
      var heap = new FibonacciHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25).insert(57).insert(39).insert(30);

      heap.pop();

      assert(heap.remove(heap.minNode));
      assert.equal(heap.peek().key, 30);
      assert.equal(heap.size, 5);
    });


  });


});

