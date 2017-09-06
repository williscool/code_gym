import assert from 'assert';
import dsalgo from '../../utilities';
import Heap from '../../data_structures/heap/binary_heap';

const MinHeap = Heap.min;
const MaxHeap = Heap.max;
const CustomHeap = Heap.custom;

describe('Heap', () => {
  describe('Max', () => {
    describe('contructor works with', () => {
      it('zero nodes', () => {
        const heap = new MaxHeap();
        assert.equal(heap.size(), 0);
      });

      it('single node', () => {
        const heap = new MaxHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it('multiple nodes', () => {
        const heap = new MaxHeap({ array: [32, 15, 12, 47] });
        assert.equal(heap.size(), 4);
        assert.equal(heap.peek(), 47);
      });

      it('works on new arrays that are random and non-sorted', () => {
        const array = dsalgo.utils.makeRandomArray({
          precision: 0,
        });

        const heap = new MaxHeap({ array });

        assert(heap.isValid());
      });
    });

    describe('#insert()', () => {
      it('single node', () => {
        const heap = new MaxHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it('multiple nodes', () => {
        const heap = new MaxHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.size(), 3);
        assert.equal(heap.peek(), [42]);
      });

      it('inserts values in correct place', () => {
        const heap = new MaxHeap();
        heap.insert(42).insert(57).insert(25).insert(30);
        assert.equal(heap.peek(), 57);
        assert.equal(heap.left(0), 42);
        assert.equal(heap.parent(1), 57);
        assert.equal(heap.right(0), 25);
        assert.equal(heap.left(1), 30);
      });
    });

    describe('#pop()', () => {
      it('single node', () => {
        const heap = new MaxHeap();
        heap.insert(42);
        assert.equal(heap.pop(), 42);
        assert.equal(heap.size(), 0);
      });

      it('multiple nodes', () => {
        const heap = new MaxHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.pop(), 42);
        assert.equal(heap.size(), 2);
      });

      it('restores heap property and puts values in correct place', () => {
        const heap = new MaxHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.pop(), 57);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 42);
        assert.equal(heap.left(0), 25);

        assert.equal(heap.right(0), 30);
      });
    });

    describe('#contains()', () => {
      it('should find values that are there', () => {
        const heap = new MaxHeap({ array: [32, 15, 12, 47, 4] });
        assert.equal(heap.contains(47), 0);
      });
      it('should not find values that are not there', () => {
        const heap = new MaxHeap({ array: [32, 15, 12, 47] });
        assert.equal(heap.contains(0), false);
      });
    });

    describe('#remove()', () => {
      it('single node', () => {
        const heap = new MaxHeap();
        heap.insert(42);
        assert.equal(heap.remove(42), 0);
        assert.equal(heap.size(), 0);
      });

      it('multiple nodes', () => {
        const heap = new MaxHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.remove(37), 1);
        assert.equal(heap.size(), 2);
      });

      it('restores heap property and puts values in correct place', () => {
        const heap = new MaxHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.remove(57), 0);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 42);
        assert.equal(heap.left(0), 25);

        assert.equal(heap.right(0), 30);
      });
    });

    describe('#updateValue()', () => {
      it('update values that are in the heap', () => {
        const heap = new MaxHeap({ array: [32, 15, 12, 42] });
        const newIndex = heap.updateValue(42, 14);
        assert.equal(heap.valueAt(newIndex), 14);
        assert(heap.isValid());
      });
      it('returns false for values that are not there', () => {
        const heap = new MaxHeap({ array: [32, 15, 12, 47] });
        assert.equal(heap.updateValue(0, 31), false);
      });
    });
  });

  describe('Min', () => {
    describe('contructor works with', () => {
      it('zero nodes', () => {
        const heap = new MinHeap();
        assert.equal(heap.size(), 0);
      });

      it('single node', () => {
        const heap = new MinHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it('multiple nodes', () => {
        const heap = new MinHeap({ array: [32, 15, 12, 47] });
        assert.equal(heap.size(), 4);
        assert.equal(heap.peek(), 12);
      });

      it('works on new arrays that are random and non-sorted', () => {
        const array = dsalgo.utils.makeRandomArray({
          precision: 0,
        });

        const heap = new MinHeap({ array });

        assert(heap.isValid());
      });
    });

    describe('#insert()', () => {
      it('single node', () => {
        const heap = new MinHeap();
        heap.insert(42);
        assert.equal(heap.peek(), 42);
        assert.equal(heap.size(), 1);
      });

      it('multiple nodes', () => {
        const heap = new MinHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.size(), 3);
        assert.equal(heap.peek(), [24]);
      });

      it('inserts values in correct place', () => {
        const heap = new MinHeap();
        heap.insert(25).insert(57).insert(42).insert(30);
        assert.equal(heap.peek(), 25);
        assert.equal(heap.left(0), 30);
        assert.equal(heap.right(0), 42);
        assert.equal(heap.left(1), 57);
        assert.equal(heap.parent(1), 25);
      });
    });

    describe('#pop()', () => {
      it('single node', () => {
        const heap = new MinHeap();
        heap.insert(42);
        assert.equal(heap.pop(), 42);
        assert.equal(heap.size(), 0);
      });

      it('multiple nodes', () => {
        const heap = new MinHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.pop(), 24);
        assert.equal(heap.size(), 2);
      });

      it('restores heap property and puts values in correct place', () => {
        const heap = new MinHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.pop(), 25);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 30);
        assert.equal(heap.left(0), 57);

        assert.equal(heap.right(0), 42);
      });
    });

    describe('#contains()', () => {
      it('should find values that are there', () => {
        const heap = new MinHeap({ array: [32, 15, 12, 47] });
        assert.equal(heap.contains(12), 0);
      });
      it('should not find values that are not there', () => {
        const heap = new MinHeap({ array: [32, 15, 12, 47] });
        assert.equal(heap.contains(0), false);
      });
    });

    describe('#remove()', () => {
      it('single node', () => {
        const heap = new MinHeap();
        heap.insert(42);
        assert.equal(heap.remove(42), 0);
        assert.equal(heap.size(), 0);
      });

      it('multiple nodes', () => {
        const heap = new MinHeap();
        heap.insert(42).insert(37).insert(24);
        assert.equal(heap.remove(37), 2);
        assert.equal(heap.size(), 2);
      });

      it('restores heap property and puts values in correct place', () => {
        const heap = new MinHeap();
        heap.insert(42).insert(57).insert(30).insert(25);

        assert.equal(heap.remove(25), 0);
        assert.equal(heap.size(), 3);

        assert.equal(heap.peek(), 30);
        assert.equal(heap.left(0), 57);

        assert.equal(heap.right(0), 42);
      });
    });

    describe('#updateValue()', () => {
      it('update values that are in the heap', () => {
        const heap = new MinHeap({ array: [32, 15, 12, 42] });
        const newIndex = heap.updateValue(42, 14);
        assert(heap.isValid());
        assert.equal(heap.valueAt(newIndex), 14);
      });
      it('returns false for values that are not there', () => {
        const heap = new MinHeap({ array: [32, 15, 12, 47] });
        assert.equal(heap.updateValue(0, 31), false);
      });
    });
  });

  describe('Custom', () => {
    it('throws an error if you do not supply a comparison function', () => {
      assert.throws(() => {
        // its for a test
        // eslint-disable-next-line no-new
        new CustomHeap();
      }, /comparision function for a custom binary heap/);
    });
  });
});

