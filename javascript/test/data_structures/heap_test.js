var assert = require('assert');
var Heap = require('../../data_structures/heap/heap.js').heap.max;
var dsalgo = require('../../utilities.js').dsalgo;

describe('Heap', function(){

  describe('contructor works with', function(){

    it("zero nodes", function(){
      var heap = new Heap();
      assert.equal(heap.size(), 0);
    });

    it("single node", function(){
      var heap = new Heap();
      heap.insert(42);
      assert.equal(heap.peek(), 42);
      assert.equal(heap.size(), 1);
    });

    it("multiple nodes", function(){
      var heap = new Heap([32,15,12,47]);
      assert.equal(heap.size(), 4);
      assert.equal(heap.peek(), 47);
    });

    it('works on new arrays that are random and non-sorted', function () {
      var array = dsalgo.utils.makeRandomArray({
        precision: 0
      });

      var heap = new Heap(array);

      // http://stackoverflow.com/questions/15579240/max-heapify-algorithm-results/15582773#15582773
      // start from last node with children and run back to beginning
      for (var i = (heap.size() - 1 >> 1) - 1; i >=0 ; i--) {

        var curVal = heap.valueAt(i);
        var left = heap.left(i);
        var right = heap.right(i);

        //if(!heap.comp(curVal, left) || !(heap.comp(curVal, right))) debugger;
        //
        // Greater than for max heap. Less than for min heap
        assert( heap.comp(curVal, left) === true );
        assert( heap.comp(curVal, right) === true );
      }
    });
  });

  describe('#insert()', function(){
    it("single node", function(){
      var heap = new Heap();
      heap.insert(42);
      assert.equal(heap.peek(), 42);
      assert.equal(heap.size(), 1);
    });

    it("multiple nodes", function(){
      var heap = new Heap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.size(), 3);
      assert.equal(heap.peek(), [42]);
    });

    it("inserts values in correct place", function(){
      var heap = new Heap();
      heap.insert(42).insert(57).insert(25).insert(30);
      assert.equal(heap.peek(), 57);
      assert.equal(heap.left(0), 42);
      assert.equal(heap.right(0), 25);
      assert.equal(heap.left(1), 30);
    });
  });

  describe('#pop()', function(){
    it("single node", function(){
      var heap = new Heap();
      heap.insert(42);
      assert.equal(heap.pop(), 42);
      assert.equal(heap.size(), 0);
    });

    it("multiple nodes", function(){
      var heap = new Heap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.pop(), 42);
      assert.equal(heap.size(), 2);
    });

    it("restores heap property and puts values in correct place", function(){
      var heap = new Heap();
      heap.insert(42).insert(57).insert(30).insert(25);

      assert.equal(heap.pop(), 57);
      assert.equal(heap.size(), 3);

      assert.equal(heap.peek(), 42);
      assert.equal(heap.left(0), 25);

      assert.equal(heap.right(0), 30);
    });
  });

  // doesnt need a test for contains because it would just be a dupe of the test for sequential search
});

