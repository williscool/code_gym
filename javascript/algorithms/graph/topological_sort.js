// https://en.wikipedia.org/wiki/Topological_sorting#Tarjan.27s_algorithm
//
// http://algs4.cs.princeton.edu/42digraph/Topological.java.html
// http://www.cs.cornell.edu/courses/cs2112/2012sp/lectures/lec24/lec24-12sp.html
//
// TODO: when I es6ify this also do this problem http://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/

var dsalgo = require('../../utilities.js').default;
var dfsToArray = require('./dfs.js').default.recursive_to_array;

function TopologicalSort(graph){

  if(graph.hasCycle()) throw new Error("graph is cyclic. toposort only works on DAGs");
  // topo sort is actually reverse of the post order
  return dfsToArray(graph, "post").reverse();
}

module.exports = TopologicalSort;
