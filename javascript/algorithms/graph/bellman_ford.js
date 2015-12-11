//  https://en.wikipedia.org/wiki/Bellman–Ford_algorithm
//
// http://algs4.cs.princeton.edu/44sp/BellmanFordSP.java.html
// http://www.geeksforgeeks.org/dynamic-programming-set-23-bellman-ford-algorithm/

var dsalgo = require('../../utilities.js').dsalgo;
var Queue = require('../../data_structures/queue.js').doubly_linked_list;
var SPW = require('./shortest_path_walker.js');

function BF(graph, start_vertex) {
  this.source = start_vertex;

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  var info = [];
  var onQuene = dsalgo.utils.simpleSet();
  // predecessor == edgeTo in sedgwick && wayne

  for (var i = 0; i < graph.order(); i++) {
    info[i] = {
      distance: Number.POSITIVE_INFINITY,
      predecessor: null
    };
  }

  info[start_vertex].distance = 0;

  var queue = new Queue();
  queue.enqueue(start_vertex);
  onQuene[start_vertex] = true;


  while (queue.length > 0) {

    var v = queue.dequeue();
    onQuene[v] = false;

   // now we are in relax
   
   for (var k = 0; k < graph.adjacency_list[v].length; k++) {
      var w = graph.adjacency_list[v][k];

      var alt = info[v].distance + graph.get_edge_weight(v, w);

      if (info[w].distance > alt) { // if the old distance is greater

        info[w].distance = alt;
        info[w].predecessor = v;

        if(!onQuene[w]){
          queue.enqueue(w);
          onQuene[w] = true;
        }
      }
    }

  }

  this.info = info;
}

var shortestPath = function(target_vertex) {
    return SPW(this.info, this.source, target_vertex);
};

BF.prototype.shortest_path = shortestPath;

module.exports = BF
