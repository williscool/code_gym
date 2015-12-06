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

module.exports = {
  dfsish: function(graph, start_vertex){

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
