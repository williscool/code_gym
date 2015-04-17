var assert = require('assert');
var Queue = require('../../data_structures/queue.js');

describe('Queue with Doubly Linked List', function(){

  describe('#enqueue()', function(){
    var queue = new Queue();
    it("queue has one item on it", function(){
      queue.enqueue(42);
      assert.deepEqual(queue.items.toArray(), [42]);
      assert.equal(queue.length, 1);
    });
  });

  describe('#peek()', function(){
    var queue = new Queue();
    it("returns top item value", function(){
      queue.enqueue(42);
      assert.equal(queue.peek(), 42);
    });
  });

  describe('#dequeue()', function(){
    var queue = new Queue();
    queue.enqueue(42).enqueue(75).enqueue(22);

    it("removes items", function(){
      assert.equal(queue.length, 3);
      queue.dequeue(42);
      assert.deepEqual(queue.items.toArray(), [75,22]);
      assert.equal(queue.length, 2);
    });

  });
});

