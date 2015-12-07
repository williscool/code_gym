// https://en.wikipedia.org/wiki/Cycle_(graph_theory)#Cycle_detection
//
// http://www.geeksforgeeks.org/detect-cycle-in-a-graph/

var dsalgo = require('../../utilities.js').dsalgo;

// checks for if a cycle exists and returns an array representing the cycle if so. if not it returns an empty array
//
// this algorithm is bascically dfs but it short circuts if it finds a cycle
//
// http://www.geeksforgeeks.org/detect-cycle-undirected-graph/
// http://www.geeksforgeeks.org/detect-cycle-in-a-graph/
//
// updated to be more like http://algs4.cs.princeton.edu/41graph/Cycle.java.html
//
// doesnt short circut
//
function DFSCycleCheck(graph, v, parent, visited, edgeTo) {
  visited[v] = true;

  for (var i in graph.adjacency_list[v]) {
    var w = graph.adjacency_list[v][i];

    if (visited[w] !== true) {

      edgeTo[w] = v;
      DFSCycleCheck(graph, w, v, visited, edgeTo);

    } else if (w != parent){

      var cycle = [];
      // while x isDefined and not w
      for (var x = v; x && x != w; x = edgeTo[x]) {
        cycle.push(x); 
      }
      cycle.push(w); 
      cycle.push(v); 
      return cycle;
    }
  }

  return []; 
}

// http://algs4.cs.princeton.edu/41graph/Cycle.java.html
function selfLoop(graph) {

  for (var v in graph.vertex_list()) {
      for (var i = 0; i < graph.adjacency_list[v].length; i++) {
        var w = graph.adjacency_list[v][i];
        if( v == w){
          var loop = [];
          loop.push(v);
          loop.push(v);
          return loop;
        } 
      }
  }

  return []; 
}

// http://algs4.cs.princeton.edu/41graph/Cycle.java.html
// so my Graph data stucture is designed to support one parallel edge for each edge between graph nodes in an undirected graph
// so to assess if there are parallel edges in mine you need to count how many times you see an edge and if its more than 2 there is a parallel edge
function parallelEdges(graph) {
  var seenEdge = dsalgo.utils.simpleSet();

  for (var v in graph.vertex_list()) {
      for (var i = 0; i < graph.adjacency_list[v].length; i++) {
        var w = graph.adjacency_list[v][i];
        if(!dsalgo.utils.isDefined(seenEdge[graph.edge_key(v,w)])){
          seenEdge[graph.edge_key(v,w)] = 0;
        } 
        if (seenEdge[graph.edge_key(v,w)] > 2) {
          var cycle = [];
          cycle.push(v);
          cycle.push(w);
          cycle.push(v);
          return cycle;
        } 
        seenEdge[graph.edge_key(v,w)]++;
      }
  }
  return []; 
}

module.exports = {
  utils: {
    selfLoop: selfLoop,
    hasSelfLoop: function(graph){
      return selfLoop(graph).length > 0;
    },
    parallelEdges: parallelEdges,
    hasParallelEdges: function(graph){
      return parallelEdges(graph).length > 0;
    },
  },
  dfsish: function(graph, start_vertex) {

    if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

    if(dsalgo.utils.isDefined(start_vertex)){
      return DFSCycleCheck(graph, start_vertex, null, dsalgo.utils.simpleSet(), dsalgo.utils.simpleSet());
    } else {
      // if there is no explicit start vertex set try them all
      for (var i in graph.vertex_list()) {
        var cycles = DFSCycleCheck(graph, i, null, dsalgo.utils.simpleSet(), dsalgo.utils.simpleSet());
        if ( cycles.length > 0) return cycles;
      }
      return [];
    }

  } 

};
