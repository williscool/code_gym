// https://en.wikipedia.org/wiki/Cycle_(graph_theory)#Cycle_detection
//
// http://www.geeksforgeeks.org/detect-cycle-in-a-graph/

var dsalgo = require('../../utilities.js').dsalgo;

// checks for if a cycle exists and returns true if so. if not it returns false
//
// this algorithm is bascically dfs but it short circuts if it finds a cycle

function directedDFSCycleCheck(graph, v, visited, recRecordKeeper) {

  if (!dsalgo.utils.isDefined(visited[v]) || visited[v] === false) {

    visited[v] = true;
    recRecordKeeper[v] = true;

    for (var i in graph.adjacency_list[v]) {
      var w = graph.adjacency_list[v][i];

      if (visited[w] !== true && directedDFSCycleCheck(graph, w, visited, recRecordKeeper)) {
        return true; 
      } else if (recRecordKeeper[w] === true){
        return true;
      }
    }
  } 

  recRecordKeeper[v] = false;
  return false; 
}

// http://www.geeksforgeeks.org/detect-cycle-undirected-graph/
function undirectedDFSCycleCheck(graph, v, visited, parent) {
  visited[v] = true;

  for (var i in graph.adjacency_list[v]) {
    var w = graph.adjacency_list[v][i];

    if (visited[w] !== true) {
      if (undirectedDFSCycleCheck(graph, w, visited, v)) {
        return true; 
      }
    } else if (w != parent){
      return true;
    }
  }

  return false; 
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

    var cycleChecker;
    var sentinal;

    if(graph.directed) {
      cycleChecker = directedDFSCycleCheck;
      sentinal = dsalgo.utils.simpleSet();
    } else {
      cycleChecker = undirectedDFSCycleCheck;
      sentinal = null;
    }

    if(dsalgo.utils.isDefined(start_vertex)){
      return cycleChecker(graph, start_vertex, dsalgo.utils.simpleSet(), sentinal );
    } else {
      // if there is no explicit start vertex set try them all
      for (var i in graph.vertex_list()) {
        if (cycleChecker(graph, i, dsalgo.utils.simpleSet(), sentinal)) return true;
      }
      return false;
    }
  } 

};
