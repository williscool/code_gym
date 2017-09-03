import QueueTypes from '../queue';
import StackTypes from '../stack';
import Node from './node';

const Queue = QueueTypes.doubly_linked_list;
const Stack = StackTypes.array;

/**
 * Workin Binary Search Tree (BST)
 *
 * add / remove / travese in, pre, and post order
 *
 * treats duplicates as an already added value and does nothing with them
 *
 *
 * https://github.com/nzakas/computer-science-in-javascript
 * http://www.cs.usfca.edu/~galles/visualization/BST.html
 *
 * google: javascript binary tree github
 *
 * @TODO fun interview style question to code for later
 *
 * print a binary search tree representation with / \ and such
 *
 * https://en.wikipedia.org/wiki/Binary_search_tree
 *
 * @class BST
 * @property {Node} root - the root node of the BST
 */
class BST {
  constructor() {
    this.root = null;
  }

  /**
   * Adds value to BST
   *
   * Time Complexity: O(log(n))
   * Space Complexity: O(1)
   *
   * cleaner version inspired by here
   *
   * @param {number} value - value to check if in BST
   * @returns this
   * @memberof BST
   */
  add(value) {
    let current;

    if (this.root === null) {
      this.root = new Node(value);
    }

    current = this.root;

    while (current != null) {
      if (value < current.value) {
        // if no left, then new node goes on lef
        if (current.left === null) {
          current.left = new Node(value);
          break;
        } else {
          current = current.left;
        }
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = new Node(value);
          break;
        } else {
          current = current.right;
        }
      } else {
        break;
      } // value is equal to an existing value so do nothing
    }

    return this;
  }

  /**
   * Check if a value is in the BST
   *
   * can optionally return the node with the value or a bool for if it was found
   *
   * Time Complexity: O(log(n))
   *
   * @param {number} value
   * @param {boolean} returnNodeModeParam
   * @returns {Object|boolean}
   * @memberof BST
   */
  contains(value, returnNodeModeParam) {
    const returnNodeMode = returnNodeModeParam || false;

    let found = false;
    let current = this.root;
    let parent = null;

    while (!found && current) {
      // if the value is less than the current node's, go left
      if (value < current.value) {
        parent = current;
        current = current.left;

        // if the value is greater than the current node's, go right
      } else if (value > current.value) {
        parent = current;
        current = current.right;

        // value equal, it was found
      } else if (returnNodeMode) {
        found = [current, parent];
      } else {
        found = true;
      }
    }

    // only proceed if the node was found
    return found;
  }

  /**
   * Remove value from BST
   *
   * Time Complexity: O(log(n))
   *
   * @param {number} value
   * @returns this
   * @memberof BST
   */
  remove(value) {
    let parent = null;
    let childCount;
    let replacement;
    let replacementParent;
    const found = this.contains(value, true);

    // no need to look to remove node if it wasn't found
    if (found) { // http://james.padolsey.com/javascript/truthy-falsey/
      const current = found[0];
      parent = found[1];

      // figure out how many children
      childCount = (current.left ? 1 : 0) + (current.right ? 1 : 0);

      // special case: the value is at the root
      if (current === this.root) {
        switch (childCount) {
          // no children, just erase the root
          case 0:
            this.root = null;
            break;

            // one child, use one as the root
          case 1:
            this.root = (!current.right ? current.left : current.right);
            break;

            // two children, little work to do
          case 2:

            // new root will be the old root's left child...maybe
            replacement = this.root.left;

            // find the right-most leaf node to be the real new root
            while (replacement.right) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            // it's not the first node on the left
            if (replacementParent) {
              // remove the new root from it's previous position
              replacementParent.right = replacement.left;

              // give the new root all of the old root's children
              replacement.right = this.root.right;
              replacement.left = this.root.left;
            } else {
              // just assign the children
              replacement.right = this.root.right;
            }

            // officially assign new root
            this.root = replacement;

            // no default
        }

        // non-root values
      } else {
        switch (childCount) {
          // no children, just remove it from the parent
          case 0:
            // if the current value is less than its parent's, null out the left pointer
            if (current.value < parent.value) {
              parent.left = null;

              // if the current value is greater than its parent's, null out the right pointer
            } else {
              parent.right = null;
            }
            break;

            // one child, just reassign to parent
          case 1:
            // if the current value is less than its parent's, reset the left pointer
            if (current.value < parent.value) {
              parent.left = (!current.left ? current.right : current.left);

              // if the current value is greater than its parent's, reset the right pointer
            } else {
              parent.right = (!current.left ? current.right : current.left);
            }
            break;

            // two children, a bit more complicated
          case 2:

            // reset pointers for new traversal
            replacement = current.left;
            replacementParent = current;

            // find the right-most node
            while (replacement.right) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            replacementParent.right = replacement.left;

            // assign children to the replacement
            replacement.right = current.right;
            replacement.left = current.left;

            // place the replacement in the right spot
            if (current.value < parent.value) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }

            // no default
        }
      }
    }

    return this;
  }

  /**
   * Traverses a BST
   *
   * These are all depth first searches
   *
   * https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search_2
   *
   * You can pass a function that will operate on the values at the nodes in traversal order
   *
   * You can specify an order also
   *
   * "in", "post", or "pre" ordered traversals
   *
   * Time Complexity: O(n)
   *
   * http://en.wikipedia.org/wiki/Tree_traversal
   * http://btv.melezinek.cz/binary-search-tree.html
   *
   * @param {any} fn
   * @param {string} order
   * @returns this
   * @memberof BST
   */
  traverse(fn, order) {
    /**
     *
     * Traverses the tree in increasing numerical order
     *
     * Obviously this returns the tress values in sorted order
     *
     * https://en.wikipedia.org/wiki/Tree_traversal#In-order
     *
     * @param {Node} node
     */
    function inOrder(node) {
      if (node) {
        // traverse the left subtree
        if (node.left !== null) {
          inOrder(node.left);
        }

        // call the fn method on this node
        fn.call(this, node);

        // traverse the right subtree
        if (node.right !== null) {
          inOrder(node.right);
        }
      }
    }

    /**
     * Pre Order BST traversal
     *
     * useful for storing as it makes it possible to restore the tree to its orginally parsed state
     * http://leetcode.com/2010/09/saving-binary-search-tree-to-file.html
     *
     * https://en.wikipedia.org/wiki/Tree_traversal#Pre-order
     * @param {Node} node - the node we are traversing from
     */
    function preOrder(node) {
      if (node) {
        // call the fn method on this node
        fn.call(this, node);

        // traverse the left subtree
        if (node.left !== null) {
          preOrder(node.left);
        }

        // traverse the right subtree
        if (node.right !== null) {
          preOrder(node.right);
        }
      }
    }

    /**
     * Post order traversal
     *
     * https://en.wikipedia.org/wiki/Tree_traversal#Post-order
     *
     * Useful for deleting a deleting a tree completely
     *
     * https://softwareengineering.stackexchange.com/questions/186667/usefulness-of-pre-and-post-order-traversal-of-binary-trees
     * @param {Node} node - the node we are traversing from
     */
    function postOrder(node) {
      if (node) {
        // traverse the left subtree
        if (node.left !== null) {
          postOrder(node.left);
        }

        // traverse the right subtree
        if (node.right !== null) {
          postOrder(node.right);
        }

        // call the fn method on this node
        fn.call(this, node);
      }
    }

    /**
     * Level order or Breadth First Search (BFS) of a BST
     *
     * https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search_2
     *
     * @param {Node} node - the node we are traversing from
     */
    function levelOrder(node) {
      if (node) {
        const queue = new Queue();
        queue.enqueue(node);

        while (queue.length > 0) {
          const cur = queue.peek();

          // add left child to queue if it exists
          if (cur.left !== null) {
            queue.enqueue(cur.left);
          }

          // add left child to queue if it exists
          if (cur.right !== null) {
            queue.enqueue(cur.right);
          }

          // call the fn method on current node
          fn.call(this, cur);

          // remove the current node from the queue
          queue.dequeue();
        }
      }
    }

    // start with the root
    if (order === 'pre') {
      preOrder(this.root);
    } else if (order === 'post') {
      postOrder(this.root);
    } else if (order === 'level') {
      levelOrder(this.root);
    } else {
      // default to in Order
      inOrder(this.root);
    }

    return this;
  }
  /**
   * Transforms BST into Array in specified traversal order
   *
   * "pre", "post", or "in" order
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @param {string} order
   * @returns {number} result
   * @memberof BST
   */
  toArray(order) {
    const result = [];

    this.traverse((node) => {
      result.push(node.value);
    }, order);

    return result;
  }
  /**
   * Return how many nodes are in the tree
   *
   * You could also implement this as a traversal and count as you go to save space if you wanted
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @returns {number} length
   * @memberof BST
   */
  size() {
    return this.toArray().length;
  }
  /**
   * Returns the number of levels of nodes in the tree
   *
   * @returns {number}
   * @memberof BST
   */
  height() {
    return this.heightFromNode(this.root);
  }
  /**
   * Returns the number of levels of nodes in the tree from this starting node
   *
   * @param {Node} node - starting node
   * @returns {number}
   * @memberof BST
   */
  heightFromNode(node) {
    if (!node) {
      return 0;
    }
    const lheight = this.height(node.left);
    const rheight = this.height(node.right);

    let returnHeight;

    if (lheight > rheight) {
      returnHeight = (lheight + 1);
    } else {
      returnHeight = (rheight + 1);
    }

    return returnHeight;
  }

  /**
   * String representation of the array of this BST
   *
   * @returns {string}
   * @memberof BST
   */
  toString() {
    return this.toArray().toString();
  }


  /**
   * Checks if the BST is valid
   *
   * https://www.interviewcake.com/question/ruby/bst-checker
   *
   * Always make this initial call with MIN (Number.NEGATIVE_INFINITY) AND MAX (Number.POSTIVE_INFINITY) int
   *
   *  or would need to add if(!upperBound && !lowerBound) check
   *
   * @param {any} currentNode
   * @param {any} lowerBound
   * @param {any} upperBound
   * @returns
   * @memberof BST
   */
  isBSTValid(currentNode, lowerBound, upperBound) {
    if (currentNode === null) return true;

    if (currentNode.value > lowerBound && currentNode.value < upperBound) {
      return this.isBSTValid(currentNode.left, lowerBound, currentNode.value) &&
        this.isBSTValid(currentNode.right, currentNode.value, upperBound);
    }

    // didnt recurse so return false
    return false;
  }

  /**
   * Iterative version of checking if a banary search tree is valid
   *
   * @static
   * @param {any} root
   * @returns
   * @memberof BST
   */
  static isBSTValidIterative(root) {
    const nodeStack = new Stack();
    nodeStack.push([root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]);

    let nodeInfoArr;
    let currentNode;
    let lowerBound;
    let upperBound;

    while (!nodeStack.isEmpty()) {
      nodeInfoArr = nodeStack.pop();

      currentNode = nodeInfoArr[0];
      lowerBound = nodeInfoArr[1];
      upperBound = nodeInfoArr[2];

      if (currentNode.value > lowerBound && currentNode.value < upperBound) {
        if (currentNode.left) {
          nodeStack.push([currentNode.left, lowerBound, currentNode.value]);
        }
        if (currentNode.right) {
          nodeStack.push([currentNode.right, currentNode.value, upperBound]);
        }
      } else {
        return false;
      }
    }

    return true;
  }

  /**
   * Instance Method of valid check for BST
   *
   * @returns
   * @memberof BST
   */
  isValid() {
    return this.isBSTValid(this.root,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY);
  }

  /**
   * instance method of iterative valid BST check
   *
   * @returns
   * @memberof BST
   */
  isValidIterative() {
    return BST.isBSTValidIterative(this.root);
  }

  /**
   * Find the larget node in the subtree starting at the input node
   *
   * @static
   * @param {Node} currentNode
   * @returns
   * @memberof BST
   */
  static findLargestAtNode(cn) {
    let currentNode = cn;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode;
  }

  /**
   * Find the largest node in this tree instance
   *
   * @returns
   * @memberof BST
   */
  findLargest() {
    return BST.findLargestAtNode(this.root);
  }

  // https://www.interviewcake.com/question/ruby/second-largest-item-in-bst

  /**
   * Find the second largest node in a tree instance
   *
   * @returns
   * @memberof BST
   */
  // dont know that you could do this with return at the end
  // without finagling that would make it dramatically less readable
  // eslint-disable-next-line consistent-return
  findSecondLargest() {
    let currentNode = this.root;

    while (currentNode.right) {
      // node is parent of largest node and the largest node has no children
      if (currentNode.right !== null &&
          currentNode.right.right === null
          && currentNode.right.left === null) {
        return currentNode;
      }

      // current is largest and it has a left subtree. so whatever is the largest of that tree is second largest
      if (currentNode.left !== null && currentNode.right === null) {
        return BST.findLargestAtNode(currentNode.left);
      }

      currentNode = currentNode.right;
    }
  }
  /**
   * Balance the BST
   *
   * https://en.wikipedia.org/wiki/Day%E2%80%93Stout%E2%80%93Warren_algorithm
   * http://www.geekviewpoint.com/java/bst/dsw_algorithm
   * http://penguin.ewu.edu/~trolfe/DSWpaper/
   * https://en.wikipedia.org/wiki/Tree_rotation
   *
   * degenerate tree == one where the nodes only have one child
   * http://cobweb.cs.uga.edu/~eileen/2720/Notes/BST.ppt
   * http://www.radford.edu/~mhtay/ITEC360/webpage/Lecture/06_p2_new.pdf
   *
   * https://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees
   *
   * page 252 of Data Structures and Algorithms in Java
   * https://github.com/DChaushev/Advanced-Data-Structures/blob/master/Day-Stout-Warren/src/BinarySearchTree.java
   * http://web.eecs.umich.edu/~qstout/pap/CACM86.pdf
   * http://courses.cs.vt.edu/cs2604/spring05/mcpherson/note/BalancingTrees.pdf
   *
   * @memberof BST
   */
  balance() {
    if (root !== null) {
      let pseudoRoot = new Node(null);
      pseudoRoot.right = this.root;
      BST.makeSortedLinkedList(pseudoRoot); // aka backbone, aka vine, or tree_to_vine
      BST.makeCompleteBinaryTree(pseudoRoot, this.size()); // aka vine to tree
      this.root = pseudoRoot.right;
      pseudoRoot = null;
    }
  }
  /**
   * Makes a BST tree a sorted linked list
   *
   * Used in the process of balancing a BST
   *
   * @static
   * @param {Node} startNode
   * @memberof BST
   */
  static makeSortedLinkedList(startNode) {
    let tail = startNode;
    let rest = tail.right;

    while (rest !== null) {
      if (rest.left === null) {
        tail = rest;
        rest = rest.right;
      } else {
        const temp = rest.left;
        rest.left = temp.right;
        temp.right = rest;
        rest = temp;
        tail.right = temp;
      }
    }
  }
  /**
   * Makes a tree that was turned into a sorted linked list into complete binary tree
   *
   * A complete binary tree is a binary tree in which every level,
   * except possibly the last, is completely filled, and all nodes are as far left as possible.
   *
   * http://web.cecs.pdx.edu/~sheard/course/Cs163/Doc/FullvsComplete.html
   * @static
   * @param {Node} startNode
   * @param {number} size
   * @memberof BST
   */
  static makeCompleteBinaryTree(startNode, size) {
    // aka greatestPowerOf2LessThanN
    let newSize = size;
    const numLeaves = newSize +
     (1 -
      (2 **
        (Math.floor(
          Math.log(size + 1) / Math.log(2)))));
    this.compress(startNode, numLeaves);

    newSize -= numLeaves;

    while (newSize > 1) {
      newSize >>= 1; // eslint-disable-line no-bitwise
      this.compress(startNode, newSize);
    }
  }
  /**
   * @TODO really figure out wtf this does
   *
   * honestly idk what this does lol
   *
   * But I think it it puts input number of nodes on a row of the BST
   *
   * used in the course of making the sorted linkedlist version of it into a complete binary tree
   *
   * @static
   * @param {Node} startNode
   * @param {number} count
   * @memberof BST
   */
  static compress(startNode, count) {
    let scanner;
    let child;
    scanner = startNode;

    for (let i = 0; i < count; i += 1) {
      child = scanner.right;
      scanner.right = child.right;
      scanner = scanner.right;
      child.right = scanner.left;
      scanner.left = child;
    }
  }
}

module.exports = BST;
