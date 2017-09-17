//  https://en.wikipedia.org/wiki/Bellman–Ford_algorithm
//
// http://algs4.cs.princeton.edu/44sp/BellmanFordSP.java.html
// http://www.geeksforgeeks.org/dynamic-programming-set-23-bellman-ford-algorithm/

var dsalgo = require('../../utilities.js').default;
var Queue = require('../../data_structures/queue.js').default.doubly_linked_list;
var SPW = require('./shortest_path_walker.js').default;
var Graph = require('../../data_structures/graph.js').default;

function BF(graph, start_vertex) {
  this.source = start_vertex;
  this.cost = 0;
  this.hasNegativeCycle = false;
  this.negative_cycles = [];

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


  while (queue.length > 0 && !this.hasNegativeCycle) {

    var v = queue.dequeue();
    onQuene[v] = false;

   // now we are in relax

   for (var k = 0; k < graph.adjacency_list[v].length; k++) {
      var w = graph.adjacency_list[v][k];

      var alt = info[v].distance + graph.getEdgeWeight(v, w);

      if (info[w].distance > alt) { // if the old distance is greater

        info[w].distance = alt;
        info[w].predecessor = v;

        if(!onQuene[w]){
          queue.enqueue(w);
          onQuene[w] = true;
        }
      }

      if(dsalgo.utils.mod(this.cost++, graph.order()) === 0) {

        // we've relax edges more times than the number of verticies in the graphs times.
        //
        // this means there could be a negative cycle
        // lets look for it
        //
        // http://cs.stackexchange.com/questions/6919/getting-negative-cycle-using-bellman-ford
        //
        // Negative-Weight Cycle Algorithms - Xiuzhen Huang
        // http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.86.1981&rep=rep1&type=pdf

        var possibleCycleGraph = new Graph({
          directed: true
        });

        Object.keys(info).forEach(function(vName){
          var pred = info[vName].predecessor;
          if(dsalgo.utils.isDefined(pred) && pred !== null){
            var weight = graph.getEdgeWeight(pred, vName);
            possibleCycleGraph.addEdge(pred, vName, weight);
          }
        });

        var cycles = possibleCycleGraph.cycles();
        if(cycles.length > 0){
          this.hasNegativeCycle = true;
          this.negative_cycles = cycles;
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

module.exports = BF;
