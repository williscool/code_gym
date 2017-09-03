/**
 * A Binary Search Tree Node from now on BST
 *
 * @class Node
 * @property {number} value - the value held at this node of the binary search tree
 * @property {Object} left - a reference to the object that represent's the left child of this BST node
 * @property {Object} left - a reference to the object that represent's the right child of this BST node
 */
class Node {
  /**
   * Creates an instance of Node.
   * with the value of val
   *
   * @param {any} val
   * @memberof Node
   */
  constructor(val) {
    this.left = null;
    this.right = null;
    this.value = val;
  }
}

module.exports = Node;
