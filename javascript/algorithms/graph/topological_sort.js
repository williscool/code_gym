// https://en.wikipedia.org/wiki/Topological_sorting#Tarjan.27s_algorithm
//
// http://algs4.cs.princeton.edu/42digraph/Topological.java.html
// http://www.cs.cornell.edu/courses/cs2112/2012sp/lectures/lec24/lec24-12sp.html

var dsalgo = require('../../utilities.js').dsalgo;
var DFS = require('./dfs.js').recursive;

function TopologicalSort(graph){

  if(graph.hasCycle()) throw new Error("graph is cyclic. toposort only works on DAGs");

  // used to check if we've visited a vertex before so we don;t call DFS again for no reason
  var marked = dsalgo.utils.simpleSet();
  var order = [];
  
  graph.vertex_list().forEach(function (key){
    key = dsalgo.utils.makeNumberUnlessNaN(key);
    
    if (marked[key]) return;

    DFS(graph, key, marked, function(v,w) {
      order.push(v);
    }, "post");
     
  });

  // topo sort is actually reverse of the post order
  return order.reverse();
} 

module.exports = TopologicalSort;
