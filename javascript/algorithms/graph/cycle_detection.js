// https://en.wikipedia.org/wiki/Cycle_(graph_theory)#Cycle_detection

var dsalgo = require('../../utilities.js').dsalgo;

// checks for if a cycle exists and returns true if so. if not it returns false
//
// this algorithm is bascically dfs but it short circuts if it finds a cycle

function dfsCycleCheck(graph, v, visited, recRecordKeeper) {

  if (!dsalgo.utils.isDefined(visited[v]) || visited[v] === false) {

    visited[v] = true;
    recRecordKeeper[v] = true;

    for (var i in graph.adjacency_list[v]) {
      var w = graph.adjacency_list[v][i];

      if (visited[w] !== true && dfsCycleCheck(graph, w, visited, recRecordKeeper)) {
        return true; 
      } else if (recRecordKeeper[w] === true){
        return true;
      }
    }
  } 

  recRecordKeeper[v] = false;
  return false; 
}

module.exports = {
  dfsish: function(graph, start_vertex){
    if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

    if(dsalgo.utils.isDefined(start_vertex)){
      return dfsCycleCheck(graph, start_vertex, dsalgo.utils.simpleSet(), dsalgo.utils.simpleSet());
    } else {
      // if there is no explicit start vertex set try them all
      for (var i in graph.vertex_list()) {
        if (dfsCycleCheck(graph, i, dsalgo.utils.simpleSet(), dsalgo.utils.simpleSet())) return true;
      }
      return false;
    }
  } 
};
