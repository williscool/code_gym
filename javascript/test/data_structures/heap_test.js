var assert = require('assert');
var Heap = require('../../data_structures/heap/heap.js');

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
      var heap = new Heap([47,32,15,12]);
      assert.equal(heap.size(), 4);
      assert.equal(heap.peek(), 47);
    });

    it.skip('works on new arrays that are random and non-sorted', function () {
      var array = dsalgo.utils.makeRandomArray({
        precision: 0
      });

      // heapifying a random array
      var heap = new Heap(array);

      // http://stackoverflow.com/questions/15579240/max-heapify-algorithm-results/15582773#15582773
      // start from last node with children and run back to beginning
      for (var i = array.length >> 1; i >=0 ; i--) {
        var leftI = (i * 2) + 1;
        var rightI = (i* 2) + 2;

      // greater than for Max heap and less than for min
        assert((array[i] >= array[leftI]) === true);
        assert((array[i] >= array[rightI]) === true);
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

    it.skip("inserts values in correct place", function(){
      var heap = new Heap();
      heap.insert(42).insert(57).insert(25);
      assert.equal(heap.root.value, [42]);
      assert.equal(heap.root.right.value, [57]);
      assert.equal(heap.root.left.value, [25]);
    });
  });

  // doesnt need a test for contains because it would just be a dupe of the test for sequential search

  describe.skip("#remove()", function(){
  });

});

