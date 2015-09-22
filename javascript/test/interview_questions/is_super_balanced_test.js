var assert = require('assert');
var BST = require('../../data_structures/bst/binary_search_tree.js');
var isSuperBalanced = require('../../interview_questions/is_super_balanced.js');

describe('Super balanced Question', function() {
  // used this viz to help https://www.cs.usfca.edu/~galles/visualization/BST.html
  it("works", function() {
    var bst = new BST();
    bst.add(60).add(45).add(70).add(65).add(67).add(80);
    assert.equal(isSuperBalanced(bst), false);

    bst.remove(67);
    assert.equal(isSuperBalanced(bst), true);
  });
});
