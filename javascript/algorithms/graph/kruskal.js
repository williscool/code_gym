// http://en.wikipedia.org/wiki/Kruskal%27s_algorithm
// http://algs4.cs.princeton.edu/43mst/

var dsalgo = require('../../utilities.js').dsalgo;
var UF = require('../../algorithms/graph/uf.js').weighted_quick_union_with_path_halving;

var Queue = require('../../data_structures/queue.js').doubly_linked_list;
var binaryHeapPQ = require('../../data_structures/priority_queue.js').priorityQueue.binaryHeap;

// inspired by http://algs4.cs.princeton.edu/43mst/KruskalMST.java.html
function Kruskal(graph) {

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  this.graph = graph;
  this.weight = 0;
  this.mst = new Queue();
  this.marked = dsalgo.utils.simpleSet();

  // min priority queue
  this.pq = new binaryHeapPQ(function(a, b) {
    if (a.priority != b.priority) return a.priority <= b.priority;

    // break value ties with insertion order
    return a.order < b.order;
  });

  var ctx = this;
  this.graph.edge_set_list().forEach(function(edge_key) {
    ctx.pq.enqueue(edge_key, ctx.graph.get_edge_weight_by_key(edge_key));
  });

  var uf = new UF(this.graph.order());

  while (this.pq.size() > 0 && (this.mst.length < graph.order() - 1)) {

    var current_edge_key = this.pq.dequeue();

    var v = this.graph.edge_key_vertex_from(current_edge_key);
    var w = this.graph.edge_key_vertex_to(current_edge_key);

    // need to make sure these are numbers
    v = dsalgo.utils.makeNumberUnlessNaN(v);
    w = dsalgo.utils.makeNumberUnlessNaN(w);

    if (!uf.connected(w, v)) {
      uf.union(v, w);
      this.mst.enqueue(current_edge_key);
      this.weight = this.weight + this.graph.get_edge_weight(v, w);
    }

  }

}

module.exports = Kruskal;
