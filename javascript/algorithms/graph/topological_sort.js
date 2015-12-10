// https://en.wikipedia.org/wiki/Topological_sorting#Tarjan.27s_algorithm
//
// http://algs4.cs.princeton.edu/42digraph/Topological.java.html
// http://www.cs.cornell.edu/courses/cs2112/2012sp/lectures/lec24/lec24-12sp.html

var dsalgo = require('../../utilities.js').dsalgo;
var dfsToArray = require('./dfs.js').recursive_to_array;

function TopologicalSort(graph){

  if(graph.hasCycle()) throw new Error("graph is cyclic. toposort only works on DAGs");
  // topo sort is actually reverse of the post order
  return dfsToArray(graph, "post").reverse();
} 

module.exports = TopologicalSort;
