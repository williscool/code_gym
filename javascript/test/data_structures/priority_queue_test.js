var assert = require('assert');
var PriorityQueue = require('../../data_structures/priority_quene.js').priorityQueue.naive;

describe('Priority Queue with {key}', function(){

  describe('with no priority set', function(){

    describe('#enqueue()', function(){
      var queue = new PriorityQueue();
      it("queue has one item on it", function(){
        queue.enqueue(42);
        assert.deepEqual(queue.items[0].value, 42);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', function(){
      var queue = new PriorityQueue();
      it("returns top item value", function(){
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', function(){
      var queue = new PriorityQueue();
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
      var queue = new PriorityQueue();
      it("queue has one item on it with a priority", function(){
        queue.enqueue(42,1);
        assert.deepEqual(queue.items[0].value, 42);
        assert.deepEqual(queue.items[0].priority, 1);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', function(){
      var queue = new PriorityQueue();
      it("returns top prority item", function(){
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek(), 14);
      });
    });

    describe('#dequeue()', function(){
      var queue = new PriorityQueue();
      queue.enqueue(42).enqueue(75,10).enqueue(22);

      it("removes items", function(){
        assert.equal(queue.items.length, 3);
        queue.dequeue();
        assert.deepEqual(queue.items.map(function(a){return a.value }), [42,22]);
        assert.equal(queue.items.length, 2);
      });
    });
  });

});
