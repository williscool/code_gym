import assert from 'assert';
import PriorityQueue from '../../data_structures/priority_queue';

const {
  naive: NaivePQ, // defaults to max
  binaryHeap: BinaryHeapPQ,
  binomialHeap: BinomialHeapPQ,
  fibonacciHeap: FibonacciHeapPQ,
} = PriorityQueue;

describe('Naive Max Priority Queue', () => {
  describe('with no priority set', () => {
    describe('#enqueue()', () => {
      const queue = new NaivePQ();
      it('queue has one item on it', () => {
        queue.enqueue(42);
        assert.deepEqual(queue.items[0].value, 42);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', () => {
      const queue = new NaivePQ();
      it('returns top item value', () => {
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', () => {
      const queue = new NaivePQ();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.items.length, 3);
        queue.dequeue();
        assert.deepEqual(queue.items.map(a => a.value), [75, 22]);
        assert.equal(queue.items.length, 2);
      });
    });
  });

  describe('with priority', () => {
    describe('#enqueue()', () => {
      const queue = new NaivePQ();
      it('queue has one item on it with a priority', () => {
        queue.enqueue(42, 1);
        assert.deepEqual(queue.items[0].value, 42);
        assert.deepEqual(queue.items[0].priority, 1);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', () => {
      const queue = new NaivePQ();
      it('returns top prority item', () => {
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek(), 14);
      });
    });

    describe('#dequeue()', () => {
      const queue = new NaivePQ();
      queue.enqueue(42).enqueue(75, 10).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.items.length, 3);
        queue.dequeue();
        assert.deepEqual(queue.items.map(a => a.value), [42, 22]);
        assert.equal(queue.peek(), 42);
        assert.equal(queue.items.length, 2);
      });
    });
  });
});

describe('Naive Min Priority Queue', () => {
  describe('with no priority set', () => {
    describe('#enqueue()', () => {
      const queue = new NaivePQ({
        extreme: Number.POSITIVE_INFINITY,
        comp: (a, b) => a < b,
      });
      it('queue has one item on it', () => {
        queue.enqueue(42);
        assert.deepEqual(queue.items[0].value, 42);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', () => {
      const queue = new NaivePQ({
        extreme: Number.POSITIVE_INFINITY,
        comp: (a, b) => a < b,
      });
      it('returns top item value', () => {
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', () => {
      const queue = new NaivePQ({
        extreme: Number.POSITIVE_INFINITY,
        comp: (a, b) => a < b,
      });
      queue.enqueue(42).enqueue(75).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.items.length, 3);
        queue.dequeue();
        assert.deepEqual(queue.items.map(a => a.value), [75, 22]);
        assert.equal(queue.items.length, 2);
      });
    });
  });

  describe('with priority', () => {
    describe('#enqueue()', () => {
      const queue = new NaivePQ({
        extreme: Number.POSITIVE_INFINITY,
        comp: (a, b) => a < b,
      });
      it('queue has one item on it with a priority', () => {
        queue.enqueue(42, 1);
        assert.deepEqual(queue.items[0].value, 42);
        assert.deepEqual(queue.items[0].priority, 1);
        assert.equal(queue.items.length, 1);
      });
    });

    describe('#peek()', () => {
      const queue = new NaivePQ({
        extreme: Number.POSITIVE_INFINITY,
        comp: (a, b) => a < b,
      });
      it('returns lowest prority item', () => {
        queue.enqueue(42).enqueue(14, -1);
        assert.equal(queue.peek(), 14);
      });
    });

    describe('#dequeue()', () => {
      const queue = new NaivePQ({
        extreme: Number.POSITIVE_INFINITY,
        comp: (a, b) => a < b,
      });
      queue.enqueue(42).enqueue(75, -10).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.items.length, 3);
        queue.dequeue();
        assert.deepEqual(queue.items.map(a => a.value), [42, 22]);
        assert.equal(queue.peek(), 42);
        assert.equal(queue.items.length, 2);
      });
    });
  });
});

describe('Priority Queue with Binary Heap', () => {
  describe('with no priority set', () => {
    describe('#enqueue()', () => {
      const queue = new BinaryHeapPQ();
      it('queue has one item on it', () => {
        queue.enqueue(42);
        assert.deepEqual(queue.heap.items[0].value, 42);
        assert.equal(queue.size(), 1);
      });
    });

    describe('#peek()', () => {
      const queue = new BinaryHeapPQ();
      it('returns top item value', () => {
        queue.enqueue(42);
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#dequeue()', () => {
      const queue = new BinaryHeapPQ();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.size(), 3);
        const oldTop = queue.dequeue();
        // stucture of heap is already tests in binary heap test
        assert.equal(oldTop, 42);
        assert.equal(queue.peek(), 75);
        assert.equal(queue.size(), 2);
      });
    });
  });

  describe('with priority', () => {
    describe('#enqueue()', () => {
      const queue = new BinaryHeapPQ();
      it('queue has one item on it with a priority', () => {
        queue.enqueue(42, 1);
        assert.deepEqual(queue.heap.items[0].value, 42);
        assert.deepEqual(queue.heap.items[0].priority, 1);
        assert.equal(queue.size(), 1);
      });
    });

    describe('#peek()', () => {
      const queue = new BinaryHeapPQ();
      it('returns top prority item', () => {
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek(), 14);
      });
    });

    describe('#dequeue()', () => {
      it('removes items', () => {
        const queue = new BinaryHeapPQ();
        queue.enqueue(42).enqueue(75, 10).enqueue(22);

        assert.equal(queue.size(), 3);
        const oldTop = queue.dequeue();
        assert.equal(oldTop, 75);
        assert.equal(queue.peek(), 42);
        assert.equal(queue.size(), 2);
      });

      it('removes correctly when there are a bunch', () => {
        const queue = new BinaryHeapPQ();
        queue.enqueue(42).enqueue(75, 10).enqueue(27);
        queue.enqueue(34).enqueue(60).enqueue(27);

        queue.dequeue();
        assert.equal(queue.peek(), 42);
      });
    });

    describe('#changePriority()', () => {
      describe('updates the prority of an item', () => {
        it('without supplying and order', () => {
          const queue = new BinaryHeapPQ();
          queue.enqueue(42).enqueue(14, 5);
          queue.changePriority(42, 27);
          assert.equal(queue.peek(), 42);
          assert.equal(queue.heap.items[0].priority, 27);
        });
        it('with an order supplied', () => {
          const queue = new BinaryHeapPQ();
          queue.enqueue(42).enqueue(14, 5);
          queue.changePriority(42, 27, 0);
          assert.equal(queue.peek(), 42);
          assert.equal(queue.heap.items[0].priority, 27);
        });
      });
    });
  });
});

describe('Priority Queue with Binomial Heap', () => {
  describe('with no priority set', () => {
    // one of the properties of a binomial heap is you cannot be sure
    // that the root is the min value so no need to test enqueue and peek seperately
    //
    // of course it will be in the first test because there is only one item

    describe('#enqueue and #peek()', () => {
      const queue = new BinomialHeapPQ();
      it('returns top item value', () => {
        queue.enqueue(42);
        assert.equal(queue.peek().value, 42);
      });
    });

    describe('#dequeue()', () => {
      const queue = new BinomialHeapPQ();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.size(), 3);
        queue.dequeue();
        // stucture of heap is already tests in binary heap test
        assert.equal(queue.peek().value, 75);
        assert.equal(queue.size(), 2);
      });
    });
  });

  describe('with priority', () => {
    describe('#enqueue()', () => {
      const queue = new BinomialHeapPQ();
      it('queue has one item on it with a priority', () => {
        queue.enqueue(42, 1);
        assert.deepEqual(queue.peek().value, 42);
        assert.deepEqual(queue.peek().priority, 1);
        assert.equal(queue.size(), 1);
      });
    });

    describe('#peek()', () => {
      const queue = new BinomialHeapPQ();
      it('returns top prority item', () => {
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek().value, 14);
      });
    });

    describe('#dequeue()', () => {
      it('removes items', () => {
        const queue = new BinomialHeapPQ();
        queue.enqueue(42).enqueue(75, 10).enqueue(22);

        assert.equal(queue.size(), 3);
        queue.dequeue();
        assert.equal(queue.peek().value, 42);
        assert.equal(queue.size(), 2);
      });

      it('removes correctly when there are a bunch', () => {
        const queue = new BinomialHeapPQ();
        queue.enqueue(42).enqueue(75, 10).enqueue(27);
        queue.enqueue(34).enqueue(60).enqueue(27);

        queue.dequeue();
        assert.equal(queue.peek().value, 42);
      });
    });

    describe('#changePriority()', () => {
      describe('updates the prority of an item', () => {
        it('without supplying and order', () => {
          const queue = new BinomialHeapPQ();
          queue.enqueue(42).enqueue(14, 5);
          queue.changePriority(42, 27);
          assert.equal(queue.peek().value, 42);
          assert.equal(queue.peek().priority, 27);
        });
        it('with an order supplied', () => {
          const queue = new BinomialHeapPQ();
          queue.enqueue(42).enqueue(14, 5);
          queue.changePriority(42, 27, 0);
          assert.equal(queue.peek().value, 42);
          assert.equal(queue.peek().priority, 27);
        });
      });
    });
  });
});

describe('Priority Queue with Fibonacci Heap', () => {
  describe('with no priority set', () => {
    // in a fib heap you only ever keep a pointer to the min node
    // so again not interesting to test enqueue and peek of one value separately

    describe('#enqueue and #peek()', () => {
      const queue = new FibonacciHeapPQ();
      it('returns top item value', () => {
        queue.enqueue(42);
        assert.equal(queue.peek().value, 42);
      });
    });

    describe('#dequeue()', () => {
      const queue = new FibonacciHeapPQ();
      queue.enqueue(42).enqueue(75).enqueue(22);

      it('removes items', () => {
        assert.equal(queue.size(), 3);
        queue.dequeue();
        // stucture of heap is already tests in binary heap test
        assert.equal(queue.peek().value, 75);
        assert.equal(queue.size(), 2);
      });
    });
  });

  describe('with priority', () => {
    describe('#enqueue()', () => {
      const queue = new FibonacciHeapPQ();
      it('queue has one item on it with a priority', () => {
        queue.enqueue(42, 1);
        assert.deepEqual(queue.peek().value, 42);
        assert.deepEqual(queue.peek().priority, 1);
        assert.equal(queue.size(), 1);
      });
    });

    describe('#peek()', () => {
      const queue = new FibonacciHeapPQ();
      it('returns top prority item', () => {
        queue.enqueue(42).enqueue(14, 5);
        assert.equal(queue.peek().value, 14);
      });
    });

    describe('#dequeue()', () => {
      it('removes items', () => {
        const queue = new FibonacciHeapPQ();
        queue.enqueue(42).enqueue(75, 10).enqueue(22);

        assert.equal(queue.size(), 3);
        queue.dequeue();
        assert.equal(queue.peek().value, 42);
        assert.equal(queue.size(), 2);
      });

      it('removes correctly when there are a bunch', () => {
        const queue = new FibonacciHeapPQ();
        queue.enqueue(42).enqueue(75, 10).enqueue(27);
        queue.enqueue(34).enqueue(60).enqueue(27);

        queue.dequeue();
        assert.equal(queue.peek().value, 42);
      });
    });

    describe('#changePriority()', () => {
      describe('updates the prority of an item', () => {
        it('without supplying and order', () => {
          const queue = new FibonacciHeapPQ();
          queue.enqueue(42).enqueue(14, 5);
          queue.changePriority(42, 27);
          assert.equal(queue.peek().value, 42);
          assert.equal(queue.peek().priority, 27);
        });
        it('with an order supplied', () => {
          const queue = new FibonacciHeapPQ();
          queue.enqueue(42).enqueue(14, 5);
          queue.changePriority(42, 27, 0);
          assert.equal(queue.peek().value, 42);
          assert.equal(queue.peek().priority, 27);
        });
      });
    });
  });
});
