import assert from 'assert';
import FibonacciHeap from '../../data_structures/heap/fibonacci_heap';

describe('Fibonacci Heap', () => {
  describe('contructor works', () => {
    it('at all', () => {
      const heap = new FibonacciHeap();
      assert.equal(heap.size, 0);
    });
  });

  describe('#insert()', () => {
    it('single node', () => {
      const heap = new FibonacciHeap();
      heap.insert(42);
      assert.equal(heap.peek().key, 42);
      assert.equal(heap.size, 1);
    });

    it('multiple nodes', () => {
      const heap = new FibonacciHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.size, 3);
      assert.equal(heap.peek().key, [24]);
    });

  // order of the tree isn't very interesting until the first removal
  // its just a linked list no need to test that
  });

  describe('pop()', () => {
    it('single node', () => {
      const heap = new FibonacciHeap();
      heap.insert(42);
      assert.equal(heap.pop().key, 42);
      assert.equal(heap.size, 0);
    });

    it('multiple nodes', () => {
      const heap = new FibonacciHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it('even more modes', () => {
      const heap = new FibonacciHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25)
        .insert(57)
        .insert(39)
        .insert(30);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 25);
      assert.equal(heap.size, 6);
    });
  });

  describe('#decreaseKey()', () => {
    it("reduces a node's key value", () => {
      const heap = new FibonacciHeap();
      heap.insert(42);

      const node = heap.minNode;

      heap.decreaseKey(node, 17);

      assert.equal(node.key, 17);
    });
  });

  describe('remove()', () => {
    it('single node', () => {
      const heap = new FibonacciHeap();
      heap.insert(42);
      assert(heap.remove(heap.minNode));
      assert.equal(heap.size, 0);
    });

    it('multiple nodes', () => {
      const heap = new FibonacciHeap();
      heap.insert(42).insert(37).insert(24);
      assert(heap.remove(heap.minNode));
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it('even more modes', () => {
      const heap = new FibonacciHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25)
        .insert(57)
        .insert(39)
        .insert(30);

      assert(heap.remove(heap.minNode));
      assert.equal(heap.peek().key, 25);
      assert.equal(heap.size, 6);
    });

    it('works correctly after a consolidation', () => {
      const heap = new FibonacciHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25)
        .insert(57)
        .insert(39)
        .insert(30);

      heap.pop();

      assert(heap.remove(heap.minNode));
      assert.equal(heap.peek().key, 30);
      assert.equal(heap.size, 5);
    });
  });
});

