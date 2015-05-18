var assert = require('assert');
var dsalgo = require('../../utilities.js').dsalgo;

var Heap = require('../../data_structures/heap/binary_heap.js');
var minHeap = Heap.min;
var maxHeap = Heap.max;

describe('Heap', function(){

  describe('Max', function(){

    describe('contructor works with', function(){

      it("zero nodes", function(){
        var heap = new maxHeap();
        assert.equal(heap.size(), 0);
      });

      it("single node", function(){
        var heap = new maxHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it("multiple nodes", function(){
        var heap = new maxHeap([32,15,12,47]);
        assert.equal(heap.size(), 4);
        assert.equal(heap.peek(), 47);
      });

      it('works on new arrays that are random and non-sorted', function () {
        var array = dsalgo.utils.makeRandomArray({
          precision: 0
        });

        var heap = new maxHeap(array);

        // http://stackoverflow.com/questions/15579240/max-heapify-algorithm-results/15582773#15582773
        // start from last node with children and run back to beginning
        for (var i = (heap.size() - 1 >> 1) - 1; i >=0 ; i--) {

          var curParent = heap.valueAt(i);
          var left = heap.left(i);
          var right = heap.right(i);

          //if(!heap.comp(curVal, left) || !(heap.comp(curVal, right))) debugger;
          //
          // Greater than for max heap. Less than for min heap
          assert( heap.comp(curParent, left) === true );
          assert( heap.comp(curParent, right) === true );
        }
      });
    });

    describe('#insert()', function(){
      it("single node", function(){
        var heap = new maxHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it("multiple nodes", function(){
        var heap = new maxHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.size(), 3);
        assert.equal(heap.peek(), [42]);
      });

      it("inserts values in correct place", function(){
        var heap = new maxHeap();
        heap.insert(42).insert(57).insert(25).insert(30);
        assert.equal(heap.peek(), 57);
        assert.equal(heap.left(0), 42);
        assert.equal(heap.right(0), 25);
        assert.equal(heap.left(1), 30);
      });
    });

    describe('#pop()', function(){
      it("single node", function(){
        var heap = new maxHeap();
        heap.insert(42);
        assert.equal(heap.pop(), 42);
        assert.equal(heap.size(), 0);
      });

      it("multiple nodes", function(){
        var heap = new maxHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.pop(), 42);
        assert.equal(heap.size(), 2);
      });

      it("restores heap property and puts values in correct place", function(){
        var heap = new maxHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.pop(), 57);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 42);
        assert.equal(heap.left(0), 25);

        assert.equal(heap.right(0), 30);
      });
    });

    describe('#contains()', function(){
      it("should find values that are there", function(){
      var heap = new maxHeap([32,15,12,47,4]);
        assert.equal(heap.contains(47), 0);
      });
      it("should not find values that are not there", function(){
      var heap = new maxHeap([32,15,12,47]);
        assert.equal(heap.contains(0), false);
      });
    });

    describe('#remove()', function(){
      it("single node", function(){
        var heap = new maxHeap();
        heap.insert(42);
        assert.equal(heap.remove(42), 0);
        assert.equal(heap.size(), 0);
      });

      it("multiple nodes", function(){
        var heap = new maxHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.remove(37), 1);
        assert.equal(heap.size(), 2);
      });

      it("restores heap property and puts values in correct place", function(){
        var heap = new maxHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.remove(57), 0);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 42);
        assert.equal(heap.left(0), 25);

        assert.equal(heap.right(0), 30);
      });
    });

  });

  describe('Min', function(){

    describe('contructor works with', function(){

      it("zero nodes", function(){
        var heap = new minHeap();
        assert.equal(heap.size(), 0);
      });

      it("single node", function(){
        var heap = new minHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it("multiple nodes", function(){
        var heap = new minHeap([32,15,12,47]);
        assert.equal(heap.size(), 4);
        assert.equal(heap.peek(), 12);
      });

      it('works on new arrays that are random and non-sorted', function () {
        var array = dsalgo.utils.makeRandomArray({
          precision: 0
        });

        var heap = new minHeap(array);

        // http://stackoverflow.com/questions/15579240/max-heapify-algorithm-results/15582773#15582773
        // start from last node with children and run back to beginning
        for (var i = (heap.size() - 1 >> 1) - 1; i >=0 ; i--) {

          var curParent = heap.valueAt(i);
          var left = heap.left(i);
          var right = heap.right(i);

          // if(!heap.comp(curParent, left) || !(heap.comp(curParent, right))) debugger;
          
          // Greater than for max heap. Less than for min heap
          assert( heap.comp(curParent, left) === true );
          assert( heap.comp(curParent, right) === true );
        }
      });
    });

    describe('#insert()', function(){
      it("single node", function(){
        var heap = new minHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it("multiple nodes", function(){
        var heap = new minHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.size(), 3);
        assert.equal(heap.peek(), [24]);
      });

      it("inserts values in correct place", function(){
        var heap = new minHeap();
        heap.insert(25).insert(57).insert(42).insert(30);
        assert.equal(heap.peek(), 25);
        assert.equal(heap.left(0), 30);
        assert.equal(heap.right(0), 42);
        assert.equal(heap.left(1), 57);
      });
    });

    describe('#pop()', function(){
      it("single node", function(){
        var heap = new minHeap();
        heap.insert(42);
        assert.equal(heap.pop(), 42);
        assert.equal(heap.size(), 0);
      });

      it("multiple nodes", function(){
        var heap = new minHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.pop(), 24);
        assert.equal(heap.size(), 2);
      });

      it("restores heap property and puts values in correct place", function(){
        var heap = new minHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.pop(), 25);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 30);
        assert.equal(heap.left(0), 57);

        assert.equal(heap.right(0), 42);
      });
    });

    describe('#contains()', function(){
      it("should find values that are there", function(){
        var heap = new minHeap([32,15,12,47]);
        assert.equal(heap.contains(12), 0);
      });
      it("should not find values that are not there", function(){
        var heap = new minHeap([32,15,12,47]);
        assert.equal(heap.contains(0), false);
      });
    });

    describe('#remove()', function(){
      it("single node", function(){
        var heap = new minHeap();
        heap.insert(42);
        assert.equal(heap.remove(42), 0);
        assert.equal(heap.size(), 0);
      });

      it("multiple nodes", function(){
        var heap = new minHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.remove(37), 2);
        assert.equal(heap.size(), 2);
      });

      it("restores heap property and puts values in correct place", function(){
        var heap = new minHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.remove(25), 0);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 30);
        assert.equal(heap.left(0), 57);

        assert.equal(heap.right(0), 42);
      });
    });

  });

});

