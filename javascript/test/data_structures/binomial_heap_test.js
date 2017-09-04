var assert = require('assert');
var dsalgo = require('../../utilities.js').default;

var BinomialHeap = require('../../data_structures/heap/binomial_heap.js');

describe('Binomial Heap', function() {

  describe('contructor works', function() {

    it("at all", function() {
      var heap = new BinomialHeap();
      assert.equal(heap.size, 0);
    });

  });

  describe('#insert()', function() {
    it("single node", function() {
      var heap = new BinomialHeap();
      heap.insert(42);
      assert.equal(heap.peek().key, 42);
      assert.equal(heap.size, 1);
    });

    it("multiple nodes", function() {
      var heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.size, 3);
      assert.equal(heap.peek().key, [24]);
    });

    it("inserts values in correct binomial tree order", function() {
      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      var heap = new BinomialHeap();
      heap.insert(25).insert(57).insert(42).insert(30);

      /// peek always returns min but its not guarenteed to be the root of the tree
      // unless you store a seperate pointer to it in your implmentation which I have not
      var min = heap.peek();

      assert.equal(min.key, 25);
      assert.equal(min.child.key, 30);
      assert.equal(min.child.child.key, 42);
      assert.equal(min.child.sibling.key, 57);
    });
  });

  describe('pop()', function() {
    it("single node", function() {
      var heap = new BinomialHeap();
      heap.insert(42);
      assert.equal(heap.pop().key, 42);
      assert.equal(heap.size, 0);
    });

    it("multiple nodes", function() {
      var heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it("even more modes", function() {
      var heap = new BinomialHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25).insert(57).insert(39).insert(30);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 25);
      assert.equal(heap.size, 6);
    });

    it("restores heap property and puts values in correct place", function() {
      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      var heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      var oldMin = heap.pop();
      var min = heap.peek();

      assert.equal(oldMin.key, 25);
      assert.equal(min.key, 30);
      assert.equal(min.sibling.key, 42);
      assert.equal(min.sibling.child.key, 57);
    });
  });

  describe('#decreaseKey()', function() {
    it("reduces a node's key value", function() {
      var heap = new BinomialHeap();
      heap.insert(42);

      var node = heap.root;

      heap.decreaseKey(node, 17);

      assert.equal(node.key, 17);

    });
    it("moves value properly when heap property is violated", function() {
      var heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      var node_for_decrease = heap.root.child.child; // node with key 57 at this point
      assert.equal(node_for_decrease.key, 57);

      // for some reason you get a stale reference to the object
      // the one time I dont want javascript to work on a new copy it does :/
      //
      node_for_decrease = heap.decreaseKey(node_for_decrease, 29);

      assert.equal(node_for_decrease.key, 29);
      assert.equal(heap.root.child.child.key, 42);
    });
  });

  describe('remove()', function() {
    it("single node", function() {
      var heap = new BinomialHeap();
      heap.insert(42);
      assert(heap.remove(heap.root));
      assert.equal(heap.size, 0);
    });

    it("multiple nodes", function() {
      var heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert(heap.remove(heap.root));
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it("even more modes", function() {
      var heap = new BinomialHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25).insert(57).insert(39).insert(30);
      assert(heap.remove(heap.root));
      assert.equal(heap.peek().key, 24);
      assert.equal(heap.size, 6);
    });

    it("restores heap property and puts values in correct place", function() {
      var heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      var node_for_remove = heap.root.child.child;

      assert.equal(node_for_remove.key, 57);
      assert(heap.remove(node_for_remove));

      var min = heap.peek();
      var root = heap.root;

      assert.equal(min.key, 25);
      assert.equal(root.key, 30);
      assert.equal(root.sibling.key, 25); // see how the minimum aint necessarily the root?
      assert.equal(root.sibling.child.key, 42);
    });
  });


});

