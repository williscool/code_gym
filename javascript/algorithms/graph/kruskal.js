// http://en.wikipedia.org/wiki/Kruskal%27s_algorithm
// http://algs4.cs.princeton.edu/43mst/

var dsalgo = require('../../utilities.js').default;
var UF = require('../../algorithms/graph/uf.js').weighted_quick_union_with_path_halving;

var Queue = require('../../data_structures/queue.js').default.doubly_linked_list;
var binaryHeapPQ = require('../../data_structures/priority_queue.js').binaryHeap;

var Graph = require('../../data_structures/graph.js').default;

// inspired by http://algs4.cs.princeton.edu/43mst/KruskalMST.java.html
function Kruskal(graph) {

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  this.graph = graph;
  this.weight = 0;
  this.mst = new Queue();
  this.marked = dsalgo.utils.simpleSet();

  // min priority queue
  this.pq = new binaryHeapPQ({
    comp: (a, b) => {
      if (a.priority != b.priority) return a.priority <= b.priority;

      // break value ties with insertion order
      return a.order < b.order;
    }
  });

  var ctx = this;
  this.graph.edgeSetList().forEach(function(edgeKey) {
    ctx.pq.enqueue(edgeKey, ctx.graph.getEdgeWeightByKey(edgeKey));
  });

  var uf = new UF({N: this.graph.order()});

  while (this.pq.size() > 0 && (this.mst.length < graph.order() - 1)) {

    var current_edgeKey = this.pq.dequeue();

    var v = Graph.edgeKeyVertexFrom(current_edgeKey);
    var w = Graph.edgeKeyVertexTo(current_edgeKey);

    // need to make sure these are numbers
    v = dsalgo.utils.makeNumberUnlessNaN(v);
    w = dsalgo.utils.makeNumberUnlessNaN(w);

    if (!uf.connected(w, v)) {
      uf.union(v, w);
      this.mst.enqueue(current_edgeKey);
      this.weight = this.weight + this.graph.getEdgeWeight(v, w);
    }

  }

}

module.exports = Kruskal;
