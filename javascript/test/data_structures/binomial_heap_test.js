import assert from 'assert';
import BinomialHeap from '../../data_structures/heap/binomial_heap';

describe('Binomial Heap', () => {
  describe('contructor works', () => {
    it('at all', () => {
      const heap = new BinomialHeap();
      assert.equal(heap.size, 0);
    });
  });

  describe('#insert()', () => {
    it('single node', () => {
      const heap = new BinomialHeap();
      heap.insert(42);
      assert.equal(heap.peek().key, 42);
      assert.equal(heap.size, 1);
    });

    it('multiple nodes', () => {
      const heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.size, 3);
      assert.equal(heap.peek().key, [24]);
    });

    it('inserts values in correct binomial tree order', () => {
      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      const heap = new BinomialHeap();
      heap.insert(25).insert(57).insert(42).insert(30);

      // peek always returns min but its not guarenteed to be the root of the tree
      // unless you store a seperate pointer to it in your implmentation which I have not
      const min = heap.peek();

      assert.equal(min.key, 25);
      assert.equal(min.child.key, 30);
      assert.equal(min.child.child.key, 42);
      assert.equal(min.child.sibling.key, 57);
    });
  });

  describe('pop()', () => {
    it('single node', () => {
      const heap = new BinomialHeap();
      heap.insert(42);
      assert.equal(heap.pop().key, 42);
      assert.equal(heap.size, 0);
    });

    it('multiple nodes', () => {
      const heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it('even more modes', () => {
      const heap = new BinomialHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25)
        .insert(57)
        .insert(39)
        .insert(30);
      assert.equal(heap.pop().key, 24);
      assert.equal(heap.peek().key, 25);
      assert.equal(heap.size, 6);
      assert.equal(heap.pop().key, 25);
      assert.equal(heap.size, 5);
    });

    it('restores heap property and puts values in correct place', () => {
      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      const heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      const oldMin = heap.pop();
      const min = heap.peek();

      assert.equal(oldMin.key, 25);
      assert.equal(min.key, 30);
      assert.equal(min.sibling.key, 42);
      assert.equal(min.sibling.child.key, 57);
    });
  });

  describe('#decreaseKey()', () => {
    it("reduces a node's key value", () => {
      const heap = new BinomialHeap();
      heap.insert(42);

      const node = heap.root;

      heap.decreaseKey(node, 17);

      assert.equal(node.key, 17);
    });
    it('moves value properly when heap property is violated', () => {
      const heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      let nodeForDecrease = heap.root.child.child; // node with key 57 at this point
      assert.equal(nodeForDecrease.key, 57);

      // for some reason you get a stale reference to the object
      // the one time I dont want javascript to work on a new copy it does :/
      //
      nodeForDecrease = heap.decreaseKey(nodeForDecrease, 29);

      assert.equal(nodeForDecrease.key, 29);
      assert.equal(heap.root.child.child.key, 42);
    });
  });

  describe('remove()', () => {
    it('single node', () => {
      const heap = new BinomialHeap();
      heap.insert(42);
      assert(heap.remove(heap.root));
      assert.equal(heap.size, 0);
    });

    it('multiple nodes', () => {
      const heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert(heap.remove(heap.root));
      assert.equal(heap.peek().key, 37);
      assert.equal(heap.size, 2);
    });

    it('even more modes', () => {
      const heap = new BinomialHeap();
      heap.insert(24).insert(37).insert(42)
        .insert(25)
        .insert(57)
        .insert(39)
        .insert(30);
      assert(heap.remove(heap.root));
      assert.equal(heap.peek().key, 24);
      assert.equal(heap.size, 6);
    });

    it('restores heap property and puts values in correct place', () => {
      const heap = new BinomialHeap();
      heap.insert(42).insert(57).insert(30).insert(25);

      // https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html
      const nodeForRemove = heap.root.child.child;

      assert.equal(nodeForRemove.key, 57);
      assert(heap.remove(nodeForRemove));

      const min = heap.peek();
      const root = heap.root;

      assert.equal(min.key, 25);
      assert.equal(root.key, 30);
      assert.equal(root.sibling.key, 25); // see how the minimum aint necessarily the root?
      assert.equal(root.sibling.child.key, 42);
    });

    it('throws an error when why try to remove something that IS NOT a binomial heap node from the tree', () => {
      const heap = new BinomialHeap();
      heap.insert(42).insert(37).insert(24);
      assert.throws(() => {
        assert(heap.remove('something that is totally not whats supposed to go in this function'));
      }, /valid BinomHeapNode/);
    });
  });
});

