/* eslint newline-per-chained-call: 0 */
/* eslint max-len: 0 */
// very useful to look at the add chains all on one line
// to make sure you added the values to the bst in the order you meant to
import assert from 'assert';
import BST from '../../data_structures/bst/binary_search_tree';
import Node from '../../data_structures/bst/node';

describe('Binary Search Tree', () => {
  describe('#add()', () => {
    it('single node', () => {
      const bst = new BST();
      bst.add(42);
      assert.equal(bst.root.value, [42]);
      assert.equal(bst.size(), 1);
    });

    it('multiple nodes', () => {
      const bst = new BST();
      bst.add(42).add(37);
      assert.equal(bst.size(), 2);
      assert.equal(bst.root.value, [42]);
    });

    it('drops duplicates', () => {
      const bst = new BST();
      bst.add(42).add(37).add(37).add(37);
      assert.equal(bst.size(), 2);
      assert.equal(bst.root.value, [42]);
    });

    it('inserts values in correct place', () => {
      const bst = new BST();
      bst.add(42).add(57).add(25);
      assert.equal(bst.root.value, [42]);
      assert.equal(bst.root.right.value, [57]);
      assert.equal(bst.root.left.value, [25]);
    });
  });

  describe('#contains()', () => {
    it('finds values correctly', () => {
      const bst = new BST();
      bst.add(42);
      assert.equal(bst.contains(42), true);
      assert.equal(bst.contains(10), false);
    });
  });

  describe('#remove()', () => {
    it('one node', () => {
      const bst = new BST();
      bst.add(42);
      bst.remove(42);
      assert.equal(bst.size(), 0);
    });

    it('two nodes', () => {
      const bst = new BST();
      bst.add(42).add(57);
      bst.remove(42);
      assert.equal(bst.size(), 1);
      assert.equal(bst.root.value, 57);
    });

    it('remove root', () => {
      const bst = new BST();
      bst.add(42).add(57).add(25);
      bst.remove(42);
      assert.equal(bst.size(), 2);
      assert.equal(bst.root.value, 25);
      assert.equal(bst.root.right.value, 57);
    });

    it('remove root of subtree with 2 children', () => {
      const bst = new BST();
      bst.remove(42);
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      bst.remove(70);
      const rightSubtreeRoot = bst.root.right;
      assert.equal(rightSubtreeRoot.value, 67);
      assert.equal(rightSubtreeRoot.right.value, 80);
    });
  });

  describe('#toArray and #traverse() in order', () => {
    const bst = new BST();
    bst.add(60).add(45).add(70).add(65).add(67).add(80);
    it('returns array in correct order', () => {
      assert.deepEqual(bst.toArray(), [45, 60, 65, 67, 70, 80]);
    });
  });

  describe('#size()', () => {
    const bst = new BST();
    bst.add(60).add(45).add(70).add(65).add(67).add(80);
    it('return correct number of elements', () => {
      assert.equal(bst.size(), 6);
    });
  });

  describe('#traverse()', () => {
    describe('pre order', () => {
      const bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      it('returns array in correct order', () => {
        assert.deepEqual(bst.toArray('pre'), [60, 45, 70, 65, 67, 80]);
      });
    });

    describe('post order', () => {
      const bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      it('returns array in correct order', () => {
        assert.deepEqual(bst.toArray('post'), [45, 67, 65, 80, 70, 60]);
      });
    });

    describe('level order', () => {
      describe('walks tree in level order', () => {
        it('with no nodes', () => {
          const bst = new BST();
          assert.deepEqual(bst.toArray('level'), []);
        });
        it('with one node', () => {
          const bst = new BST();
          bst.add(60);
          assert.deepEqual(bst.toArray('level'), [60]);
        });
        it('with multple nodes', () => {
          const bst = new BST();
          bst.add(60).add(45).add(70).add(65).add(67).add(80);
          assert.deepEqual(bst.toArray('level'), [60, 45, 70, 65, 80, 67]);
        });
      });
    });
  });

  describe('#height()', () => {
    it('returns correct tree height', () => {
      it('with no nodes', () => {
        const bst = new BST();
        assert.equal(bst.height(), 0);
      });
      it('with one node', () => {
        const bst = new BST();
        bst.add(60);
        assert.equal(bst.height(), 1);
      });
      it('with multple nodes', () => {
        const bst = new BST();
        bst.add(60).add(45).add(70).add(65).add(67).add(80);
        assert.equal(bst.height(), 4);
      });
    });
  });

  describe('#isValid()', () => {
    it('recursive', () => {
      const bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      assert.equal(bst.isValid(), true);
    });

    it('iterative', () => {
      const bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      // instance invokation
      assert.equal(bst.isValidIterative(), true);
      // static invokation
      assert.equal(BST.isBSTValidIterative(bst.root), true);
    });
  });

  describe('#findLargest()', () => {
    it('iterative', () => {
      const bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      // instance invokation
      assert.equal(bst.findLargest().value, 80);
      // static invokation
      assert.equal(BST.findLargestAtNode(bst.root).value, 80);
    });
  });

  describe('#findSecondLargest()', () => {
    it('iterative', () => {
      const bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      assert.equal(bst.findSecondLargest().value, 70);
    });
  });

  describe('#balance()', () => {
    it('creates a sorted linked list aka a vine from the tree', () => {
      const bst = new BST();
      // http://www.radford.edu/~mhtay/ITEC360/webpage/Lecture/06_p2_new.pdf
      bst.add(5).add(10).add(20).add(15).add(30).add(25).add(23).add(28).add(23).add(40);
      assert.deepEqual(bst.toArray('level'), [5, 10, 20, 15, 30, 25, 40, 23, 28]);

      const pseudoRoot = new Node(null);
      pseudoRoot.right = bst.root;
      BST.makeSortedLinkedList(pseudoRoot);
      assert.deepEqual(bst.toArray('level'), [5, 10, 15, 20, 23, 25, 28, 30, 40]);
    });

    it('balances the tree', () => {
      const bst = new BST();
      // http://www.radford.edu/~mhtay/ITEC360/webpage/Lecture/06_p2_new.pdf
      bst.add(5).add(10).add(20).add(15).add(30).add(25).add(23).add(28).add(23).add(40);
      bst.balance();
      assert.deepEqual(bst.toArray('level'), [25, 20, 30, 10, 23, 28, 40, 5, 15]);
    });
  });
});

