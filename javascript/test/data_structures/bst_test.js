var assert = require('assert');
var BST = require('../../data_structures/bst/binary_search_tree.js');

describe('Binary Search Tree', function() {

  describe('#add()', function() {

    it("single node", function() {
      var bst = new BST();
      bst.add(42);
      assert.equal(bst.root.value, [42]);
      assert.equal(bst.size(), 1);
    });

    it("multiple nodes", function() {
      var bst = new BST();
      bst.add(42).add(37);
      assert.equal(bst.size(), 2);
      assert.equal(bst.root.value, [42]);
    });

    it("drops duplicates", function() {
      var bst = new BST();
      bst.add(42).add(37).add(37).add(37);
      assert.equal(bst.size(), 2);
      assert.equal(bst.root.value, [42]);
    });

    it("inserts values in correct place", function() {
      var bst = new BST();
      bst.add(42).add(57).add(25);
      assert.equal(bst.root.value, [42]);
      assert.equal(bst.root.right.value, [57]);
      assert.equal(bst.root.left.value, [25]);
    });
  });

  describe('#contains()', function() {
    var bst = new BST();
    it("finds values correctly", function() {
      var bst = new BST();
      bst.add(42);
      assert.equal(bst.contains(42), true);
      assert.equal(bst.contains(10), false);
    });
  });

  describe('#remove()', function() {

    it("one node", function() {
      var bst = new BST();
      bst.add(42);
      bst.remove(42);
      assert.equal(bst.size(), 0);
    });

    it("two nodes", function() {
      var bst = new BST();
      bst.add(42).add(57);
      bst.remove(42);
      assert.equal(bst.size(), 1);
      assert.equal(bst.root.value, 57);
    });

    it("remove root", function() {
      var bst = new BST();
      bst.add(42).add(57).add(25);
      bst.remove(42);
      assert.equal(bst.size(), 2);
      assert.equal(bst.root.value, 25);
      assert.equal(bst.root.right.value, 57);
    });

    it("remove root of subtree with 2 children", function() {
      var bst = new BST();
      bst.remove(42);
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      bst.remove(70);
      var right_subtree_root = bst.root.right;
      assert.equal(right_subtree_root.value, 67);
      assert.equal(right_subtree_root.right.value, 80);
    });
  });

  describe('#toArray and #traverse() in order', function() {
    var bst = new BST();
    bst.add(60).add(45).add(70).add(65).add(67).add(80);
    it("returns array in correct order", function() {
      assert.deepEqual(bst.toArray(), [45, 60, 65, 67, 70, 80]);
    });
  });

  describe('#size()', function() {
    var bst = new BST();
    bst.add(60).add(45).add(70).add(65).add(67).add(80);
    it("return correct number of elements", function() {
      assert.equal(bst.size(), 6);
    });
  });

  describe('#traverse()', function() {

    describe('pre order', function() {
      var bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      it("returns array in correct order", function() {
        assert.deepEqual(bst.toArray("pre"), [60, 45, 70, 65, 67, 80]);
      });
    });

    describe('post order', function() {
      var bst = new BST();
      bst.add(60).add(45).add(70).add(65).add(67).add(80);
      it("returns array in correct order", function() {
        assert.deepEqual(bst.toArray("post"), [45, 67, 65, 80, 70, 60]);
      });
    });

    describe('level order', function() {
      describe("walks tree in level order", function() {
        it("with no nodes", function() {
          var bst = new BST();
          assert.deepEqual(bst.toArray("level"), []);
        });
        it("with one node", function() {
          var bst = new BST();
          bst.add(60);
          assert.deepEqual(bst.toArray("level"), [60]);
        });
        it("with multple nodes", function() {
          var bst = new BST();
          bst.add(60).add(45).add(70).add(65).add(67).add(80);
          assert.deepEqual(bst.toArray("level"), [60, 45, 70, 65, 80, 67]);
        });
      });
    });

  });

  describe('#height()', function() {
    it("returns correct tree height", function() {
      it("with no nodes", function() {
        var bst = new BST();
        assert.equal(bst.height(), 0);
      });
      it("with one node", function() {
        var bst = new BST();
        bst.add(60);
        assert.equal(bst.height(), 1);
      });
      it("with multple nodes", function() {
        var bst = new BST();
        bst.add(60).add(45).add(70).add(65).add(67).add(80);
        assert.equal(bst.height(), 4);
      });
    });
  });


});

