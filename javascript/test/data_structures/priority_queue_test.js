var assert = require('assert');
var naivePQ = require('../../data_structures/priority_quene.js').priorityQueue.naive;
var binaryHeapPQ = require('../../data_structures/priority_quene.js').priorityQueue.binaryHeap;
var binomialHeapPQ = require('../../data_structures/priority_quene.js').priorityQueue.binomialHeap;

describe('Naive Priority Queue', function(){

  describe('with no priority set', function(){

    describe('#enqueue()', function(){
      var queue = new naivePQ();
      it("queue has one item on it", function(){
        queue.enqueue(42);
        assert.deepEqual(queue.items[0].value, 42);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', function(){
      var queue = new naivePQ();
      it("returns top item value", function(){
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', function(){
      var queue = new naivePQ();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it("removes items", function(){
        assert.equal(queue.items.length, 3);
        queue.dequeue();
        assert.deepEqual(queue.items.map(function(a){return a.value }), [75,22]);
        assert.equal(queue.items.length, 2);
      });
    });
  });

  describe('with priority', function(){

    describe('#enqueue()', function(){
      var queue = new naivePQ();
      it("queue has one item on it with a priority", function(){
        queue.enqueue(42,1);
        assert.deepEqual(queue.items[0].value, 42);
        assert.deepEqual(queue.items[0].priority, 1);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', function(){
      var queue = new naivePQ();
      it("returns top prority item", function(){
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek(), 14);
      });
    });

    describe('#dequeue()', function(){
      var queue = new naivePQ();
      queue.enqueue(42).enqueue(75,10).enqueue(22);

      it("removes items", function(){
        assert.equal(queue.items.length, 3);
        queue.dequeue();
        assert.deepEqual(queue.items.map(function(a){return a.value }), [42,22]);
        assert.equal(queue.peek(), 42);
        assert.equal(queue.items.length, 2);
      });
    });
  });

});

describe('Priority Queue with Binary Heap', function(){

  describe('with no priority set', function(){

    describe('#enqueue()', function(){
      var queue = new binaryHeapPQ();
      it("queue has one item on it", function(){
        queue.enqueue(42);
        assert.deepEqual(queue.heap.items[0].value, 42);
        assert.equal(queue.size(), 1);
      });
    });

    describe('#peek()', function(){
      var queue = new binaryHeapPQ();
      it("returns top item value", function(){
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', function(){
      var queue = new binaryHeapPQ();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it("removes items", function(){
        assert.equal(queue.size(), 3);
        queue.dequeue();
        // stucture of heap is already tests in binary heap test
        assert.equal(queue.peek(), 75);
        assert.equal(queue.size(), 2);
      });
    });
  });

  describe('with priority', function(){

    describe('#enqueue()', function(){
      var queue = new binaryHeapPQ();
      it("queue has one item on it with a priority", function(){
        queue.enqueue(42,1);
        assert.deepEqual(queue.heap.items[0].value, 42);
        assert.deepEqual(queue.heap.items[0].priority, 1);
        assert.equal(queue.size(), 1);
      });
    });

    describe('#peek()', function(){
      var queue = new binaryHeapPQ();
      it("returns top prority item", function(){
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek(), 14);
      });
    });

    describe('#dequeue()', function(){

      it("removes items", function(){
        var queue = new binaryHeapPQ();
        queue.enqueue(42).enqueue(75,10).enqueue(22);

        assert.equal(queue.size(), 3);
        queue.dequeue();
        assert.equal(queue.peek(), 42);
        assert.equal(queue.size(), 2);
      });

      it("removes correctly when there are a bunch", function(){
        var queue = new binaryHeapPQ();
        queue.enqueue(42).enqueue(75,10).enqueue(27);
        queue.enqueue(34).enqueue(60).enqueue(27);

        queue.dequeue();
        assert.equal(queue.peek(), 42);
      });
    });
  });

});

describe('Priority Queue with Binomial Heap', function(){

  describe('with no priority set', function(){

    // one of the properties of a binomial heap is you cannot be sure 
    // that the root is the min value so no need to test enqueue and peek seperately
    // 
    // of course it will be in the first test because there is only one item
    
    describe('#enquene and #peek()', function(){
      var queue = new binomialHeapPQ();
      it("returns top item value", function(){
        queue.enqueue(42);
        assert.equal(queue.peek().value, 42);
      });
    });

    describe('#dequeue()', function(){
      var queue = new binomialHeapPQ();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it("removes items", function(){
        assert.equal(queue.size(), 3);
        queue.dequeue();
        // stucture of heap is already tests in binary heap test
        assert.equal(queue.peek().value, 75);
        assert.equal(queue.size(), 2);
      });
    });
  });

  describe('with priority', function(){

    describe('#enqueue()', function(){
      var queue = new binomialHeapPQ();
      it("queue has one item on it with a priority", function(){
        queue.enqueue(42,1);
        assert.deepEqual(queue.peek().value, 42);
        assert.deepEqual(queue.peek().priority, 1);
        assert.equal(queue.size(), 1);
      });
    });

    describe('#peek()', function(){
      var queue = new binomialHeapPQ();
      it("returns top prority item", function(){
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek().value, 14);
      });
    });

    describe('#dequeue()', function(){

      it("removes items", function(){
        var queue = new binomialHeapPQ();
        queue.enqueue(42).enqueue(75,10).enqueue(22);

        assert.equal(queue.size(), 3);
        queue.dequeue();
        assert.equal(queue.peek().value, 42);
        assert.equal(queue.size(), 2);
      });

      it("removes correctly when there are a bunch", function(){
        var queue = new binomialHeapPQ();
        queue.enqueue(42).enqueue(75,10).enqueue(27);
        queue.enqueue(34).enqueue(60).enqueue(27);

        queue.dequeue();
        assert.equal(queue.peek().value, 42);
      });
    });
  });

});
