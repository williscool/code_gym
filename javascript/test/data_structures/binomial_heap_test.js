var assert = require('assert');
var dsalgo = require('../../utilities.js').dsalgo;

var BinomialHeap = require('../../data_structures/heap/binomial_heap.js');

describe('Binomial Heap', function(){

  describe('contructor works', function(){

    it("at all", function(){
      var heap = new BinomialHeap();
      assert.equal(heap.size, 0);
    });

  });

  describe('#insert()', function(){
    it("single node", function(){
      var heap = new BinomialHeap();
      heap.insert(42);
      assert.equal(heap.peek().key, 42);
      assert.equal(heap.size, 1);
    });

    it("multiple nodes", function(){
      var heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.size, 3);
      assert.equal(heap.peek().key, [24]);
    });

    it.skip("inserts values in correct place", function(){
      var heap = new BinomialHeap();
      heap.insert(25).insert(57).insert(42).insert(30);
      assert.equal(heap.peek().key, 25);
    });
  });

  describe('.pop()', function(){
    it("single node", function(){
      var heap = new BinomialHeap();
      heap.insert(42);
      assert.equal(heap.pop().key, 42);
      assert.equal(heap.size, 0);
    });

    it("multiple nodes", function(){
      var heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.size, 2);
    });

    it("even more modes", function(){
      var heap = new BinomialHeap();
      heap.insert(24).insert(37).insert(42)
      .insert(25).insert(57).insert(39).insert(30);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 25);
      assert.equal(heap.size, 6);
    });

    it.skip("restores heap property and puts values in correct place", function(){
      var heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      assert.equal(heap.pop().key, 25);
      assert.equal(heap.size, 3);

      assert.equal(heap.peek().key, 30);
      assert.equal(heap.left(0), 57);

      assert.equal(heap.right(0), 42);
    });
  });

  describe.skip('#remove()', function(){
    it("single node", function(){
      var heap = new BinomialHeap();
      heap.insert(42);
      assert.equal(heap.remove(42), 0);
      assert.equal(heap.size, 0);
    });

    it("multiple nodes", function(){
      var heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.remove(37), 2);
      assert.equal(heap.size, 2);
    });

    it("restores heap property and puts values in correct place", function(){
      var heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      assert.equal(heap.remove(25), 0);
      assert.equal(heap.size, 3);

      assert.equal(heap.peek().key, 30);
      assert.equal(heap.left(0), 57);

      assert.equal(heap.right(0), 42);
    });
  });

});

