import assert from 'assert';
import Queue from '../../data_structures/queue';

Object.keys(Queue).forEach((key) => {
  describe(`Queue with ${key}`, () => {
    describe('#enqueue()', () => {
      const queue = new Queue[key]();
      it('queue has one item on it', () => {
        queue.enqueue(42);
        assert.deepEqual(queue.toArray(), [42]);
        assert.equal(queue.length, 1);
      });
    });

    describe('#peek()', () => {
      const queue = new Queue[key]();
      it('returns top item value', () => {
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', () => {
      const queue = new Queue[key]();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.length, 3);
        const oldFront = queue.dequeue();
        assert.equal(oldFront, 42);
        assert.deepEqual(queue.toArray(), [75, 22]);
        assert.equal(queue.length, 2);
      });
    });

    describe('#isEmpty()', () => {
      it('returns false when queue has one item on it', () => {
        const queue = new Queue[key]();
        queue.enqueue(42).enqueue(50);
        assert.equal(false, queue.isEmpty());
      });
      it('returns false when queue is empty', () => {
        const queue = new Queue[key]();
        queue.enqueue(42).enqueue(50);
        queue.dequeue();
        queue.dequeue();
        assert.equal(true, queue.isEmpty());
      });
    });
  });
});
