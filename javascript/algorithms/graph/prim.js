// http://en.wikipedia.org/wiki/Prim%27s_algorithm
// http://algs4.cs.princeton.edu/43mst/
//
// The naive version of prim just uses a naive priority queue 
// (a linear search through the array of edge costs)
// to pick the next edge with the smallest cost 
//
// not particularly interesting being that I already wrote an naive pq

var dsalgo = require('../../utilities.js').dsalgo;

var Queue = require('../../data_structures/queue.js').doubly_linked_list;
var binaryHeapPQ = require('../../data_structures/priority_quene.js').priorityQueue.binaryHeap;

// inspired by http://algs4.cs.princeton.edu/43mst/LazyPrimMST.java.html
function PrimMST (graph, start_vertex){

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.")

  this.graph = graph;
  this.weight = 0;
  this.mst = new Queue();
  this.marked = dsalgo.utils.simpleSet();

  // min priority queue
  this.pq = new binaryHeapPQ(function (a,b) {
    if (a.priority != b.priority) return a.priority <= b.priority;

    // break value ties with insertion order
    return a.order < b.order;
  });

  // return the PrimMST after prim function of first vertex if given a start_vertex
  if(dsalgo.utils.isDefined(start_vertex)){
    this.prim(start_vertex);
    return this;
  }

  // if we get this return the PrimMST object after scanning all the verticies
  // this will give us a spanning forest
  var ctx = this;
  this.graph.vertex_list().forEach(function(val){
     if(!ctx.marked[val]) ctx.prim(val);
  });

}
 
PrimMST.prototype.scan = function (v) {
  if(!this.marked[v]){
    this.marked[v] = true;

    for(var i = 0; i < this.graph.adjacency_list[v].length ; i++){

      var w = this.graph.adjacency_list[v][i];

      if(!this.marked[w]){

        var edge_key = this.graph.edge_key(v,w);

        this.pq.enqueue(edge_key, this.graph.get_edge_weight(v,w));
      } 
    } 
  } 
};

PrimMST.prototype.prim = function (start_vertex) {
  this.scan(start_vertex);

  while (this.pq.size() > 0){
    var current_edge_key = this.pq.dequeue();

    var v = this.graph.edge_key_vertex_from(current_edge_key);
    var w = this.graph.edge_key_vertex_to(current_edge_key);

    if (this.marked[v] && this.marked[w]) continue; // skip this loop iteration

    this.mst.enqueue(current_edge_key);
    this.weight = this.weight + this.graph.get_edge_weight(v,w);

    if (!this.marked[v]) this.scan(v);
    if (!this.marked[w]) this.scan(w); 
  }

  return this.mst;
};

module.exports = PrimMST;
