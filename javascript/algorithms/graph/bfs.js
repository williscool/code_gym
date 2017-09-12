import QueueTypes from '../../data_structures/queue';

const Queue = QueueTypes.doubly_linked_list;

/**
 * http://en.wikipedia.org/wiki/Breadth-first_search
 *
 * https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/breadth-first-search-and-its-uses
 * http://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Great article on asymptotic analysis of this algorithm and graph algos in general
 * https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/analysis-of-breadth-first-search
 *
 * Performs a breadth-first search on a graph
 *
 * this and the other graph algorithms probably make more sense as a part of the graph object
 * then their own seperate clasy things but its a nice way to keep the code seperate
 * and not make that any bigger
 *
 * fun observation level order traversing a binary search tree is a breadth first search
 * but for breadth first search on a graph a node can be connected to more than 2 other nodes
 *
 * Time Complexity O(V + E)
 *
 * @class BFS
 */
class BFS {
  /**
   * Creates an instance of Breadth First Search.
   *
   * @param {Graph} graph Graph object from which we access an adjancency list
   * @param {any} startVertex the vertex in the graph to start the traversal from
   * @param {Function} fn optional early exit condition for the traversal. usually that a goal vertex is reached
   * @returns {array} Array of objects describing each vertex, like
   *     [{distance: _, predecessor: _ }]
   * @memberof BFS
   */
  constructor(graph, startVertex, fn) {
    this.startVertex = startVertex;
    if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

    this.info = [];

    for (let i = 0; i <= graph.order(); i += 1) {
      this.info[i] = {
        distance: null,
        predecessor: null,
      };
    }

    this.info[startVertex].distance = 0;

    const queue = new Queue();
    queue.enqueue(startVertex);

    // Traverse the graph

    // As long as the queue is not empty:
    //  Repeatedly dequeue a vertex v from the queue.
    //
    //  For each neighbor w of v that has not been visited:
    //     Set distance to 1 greater than v's distance
    //     Set predecessor to v
    //     Enqueue w

    while (queue.length > 0) {
      const v = queue.dequeue();

      if (fn && fn(v)) {
        // early exit condition
        break;
      }

      for (let j = 0; j < graph.adjacency_list[v].length; j += 1) {
        const w = graph.adjacency_list[v][j];

        if (this.info[w].distance === null) {
          this.info[w].distance = this.info[v].distance + 1;
          this.info[w].predecessor = v;
          queue.enqueue(w);
        }
      }
    }

    return this;
  }

  /**
   * Reconstructs the path the traversal followed.
   *
   * Works by starting at the input goal vertex of this bfs and
   *
   * working back through its predecessor chain to the startVertex
   *
   * @param {any} goal vertex the bfs terminated in
   * @returns {array}
   * @memberof BFS
   */
  reconstructPath(goal) {
    let current = goal;
    const path = [current];

    while (current !== this.startVertex) {
      current = this.info[current].predecessor;
      path.push(current);
    }

    return path.reverse();
  }
}

export default BFS;
