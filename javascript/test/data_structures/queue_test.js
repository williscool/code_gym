var assert = require('assert');
var Queue = require('../../data_structures/queue.js');

Object.keys(Queue).forEach(function(key) {

  describe('Queue with ' + key, function() {

    describe('#enqueue()', function() {
      var queue = new Queue[key]();
      it("queue has one item on it", function() {
        queue.enqueue(42);
        assert.deepEqual(queue.toArray(), [42]);
        assert.equal(queue.length, 1);
      });
    });

    describe('#peek()', function() {
      var queue = new Queue[key]();
      it("returns top item value", function() {
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', function() {
      var queue = new Queue[key]();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it("removes items", function() {
        assert.equal(queue.length, 3);
        var oldFront = queue.dequeue();
        assert.equal(oldFront, 42);
        assert.deepEqual(queue.toArray(), [75, 22]);
        assert.equal(queue.length, 2);
      });

    });

    describe('#isEmpty()', function() {
      it("returns true when queue has one item on it", function() {
        var queue = new Queue[key]();
        queue.enqueue(42).enqueue(50);
        assert.equal(false, queue.isEmpty());
      });
      it("returns false when queue is empty", function() {
        var queue = new Queue[key]();
        queue.enqueue(42).enqueue(50);
        queue.dequeue();
        queue.dequeue();
        assert.equal(true, queue.isEmpty());
      });
    });

  });

});
