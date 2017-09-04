// http://en.wikipedia.org/wiki/Breadth-first_search

// https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/breadth-first-search-and-its-uses
// http://en.wikipedia.org/wiki/Breadth-first_search
//
// Great article on asymptotic analysis of this algorithm and graph algos in general
// https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/a/analysis-of-breadth-first-search

/*
 * Performs a breadth-first search on a graph
 * @param {Graph} graph - Graph object from which we access an adjancency list
 * @returns {array} Array of objects describing each vertex, like
 *     [{distance: _, predecessor: _ }]
 */

// this and the other graph algorithms probably make more sense as a part of the graph object
// then their own seperate clasy things but its a nice way to keep the code seperate
// and not make that any bigger

// fun observation level order traversing a binary search tree is a depth first search
// but for depth first search on a graph a node can be connected to more than 2 other nodes

var Queue = require('../../data_structures/queue.js').default.doubly_linked_list;

function BFS(graph, start_vertex, fn) {
  this.start_vertex = start_vertex;
  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  this.info = [];

  for (var i = 0; i <= graph.order(); i++) {
    this.info[i] = {
      distance: null,
      predecessor: null
    };
  }

  this.info[start_vertex].distance = 0;

  var queue = new Queue();
  queue.enqueue(start_vertex);


  // Traverse the graph

  // As long as the queue is not empty:
  //  Repeatedly dequeue a vertex v from the queue.
  //
  //  For each neighbor w of v that has not been visited:
  //     Set distance to 1 greater than v's distance
  //     Set predecessor to v
  //     Enqueue w

  while (queue.length > 0) {

    var v = queue.dequeue();

    if(fn && fn(v)) {
      // early exit condition
      break;
    }

    for (var j = 0; j < graph.adjacency_list[v].length; j++) {
      var w = graph.adjacency_list[v][j];

      if (this.info[w].distance === null) {

        this.info[w].distance = this.info[v].distance + 1;
        this.info[w].predecessor = v;
        queue.enqueue(w);
      }

    }

  }

  return this;
}

BFS.prototype.reconstruct_path = function(goal){

  var current = goal;
  var path = [current];

  while(current !== this.start_vertex){
    current = this.info[current].predecessor;
    path.push(current);
  }

  return path.reverse();
};

module.exports = BFS;
