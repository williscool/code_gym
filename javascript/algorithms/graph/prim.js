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
function lazyPrimMST (graph, start_vertex){

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
 
lazyPrimMST.prototype.scan = function (v) {
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

lazyPrimMST.prototype.prim = function (start_vertex) {
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

// inspired by  http://algs4.cs.princeton.edu/43mst/PrimMST.java.html
function eagerPrimMST (graph, start_vertex){

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.")

  this.graph = graph;
  this.weight = 0;
  this.mst = new Queue();
  this.vertexPQOrder = new Queue();

  this.marked = dsalgo.utils.simpleSet(); // will use this to store insertion order now. so boolean checks must be careful for 0 == false
  this.edgeTo = dsalgo.utils.simpleSet();
  this.distTo = dsalgo.utils.simpleSet();

  // init distance to all verticies to pos infinity
  var ctx = this;
  this.graph.vertex_list().forEach(function(val){
     ctx.distTo[val] = Number.POSITIVE_INFINITY;
  });

  // min priority queue
  this.pq = new binaryHeapPQ(function (a,b) {
    if (a.priority != b.priority) return a.priority <= b.priority;

    // break value ties with insertion order
    return a.order < b.order;
  });

  // return the PrimMST after prim function of first vertex if given a start_vertex
  if(dsalgo.utils.isDefined(start_vertex)){
    this.prim(start_vertex);
    
    this.buildMSTQueue();
    return this;
  }

  // if we get this return the PrimMST object after scanning all the verticies
  // this will give us a spanning forest
  this.graph.vertex_list().forEach(function(val){
     if(!dsalgo.utils.isDefined(ctx.marked[val])) ctx.prim(val);
  });

  this.buildMSTQueue();
}

eagerPrimMST.prototype.buildMSTQueue = function () {

  // this takes a bit of explaining
  // you see in javascript there is no guarantee on the order elements from objects get enumerated in
  // so I used this vertex order queue to read back the edges as the order the corresponding vertices were added
  var ctx = this;
  this.vertexPQOrder.forEach(function(v){
    if(!dsalgo.utils.isDefined(ctx.edgeTo[v])) return; // if vertex has no edge to itself
    var edge_key = ctx.edgeTo[v];
    ctx.mst.enqueue(edge_key);
    ctx.weight = ctx.weight + ctx.graph.get_edge_weight_by_key(edge_key);
  });
}
 
eagerPrimMST.prototype.prim = function (start_vertex) {

  this.distTo[start_vertex] = 0;
  this.pq.enqueue(start_vertex , this.distTo[start_vertex]);

  while (this.pq.size() > 0) {
    var current_vertex = this.pq.dequeue();
    this.scan(current_vertex);
  }

  return this.mst;
};

eagerPrimMST.prototype.scan = function (v) {

    if(!dsalgo.utils.isDefined(this.marked[v])){
      this.marked[v] = this.vertexPQOrder.length; 
      this.vertexPQOrder.enqueue(v);
      // needed to keep track of when we inserted a vertex to update priority later
    };

    for(var i = 0; i < this.graph.adjacency_list[v].length ; i++){

      var w = this.graph.adjacency_list[v][i];

      if(dsalgo.utils.isDefined(this.marked[w])) continue;

      var edge_key = this.graph.edge_key(v,w);
      var edge_weight = this.graph.get_edge_weight_by_key(edge_key);

      if ( edge_weight < this.distTo[w]) {
        this.distTo[w] = edge_weight;
        this.edgeTo[w] = edge_key;

        if (dsalgo.utils.isDefined(this.marked[w])){ // if we have encountered this vertex before and thus it is in the pq
          this.pq.changePriority(w, this.distTo[w], this.marked[w])
        } else {
          this.pq.enqueue(w, this.distTo[w]) 
        }
      }

    } 
};

module.exports = {
  lazy : lazyPrimMST,
  eager : eagerPrimMST
};
