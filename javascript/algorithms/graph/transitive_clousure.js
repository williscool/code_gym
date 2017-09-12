// https://en.wikipedia.org/wiki/Transitive_closure#In_graph_theory
//
// http://algs4.cs.princeton.edu/42digraph/TransitiveClosure.java.html
//
//
// TODO: for funsies print out the table of whats reachable like in TransitiveClosure.java

var dsalgo = require('../../utilities.js').default;
var DFS = require('./dfs.js').default.recursive;

function TransitiveClosure(graph){

  var tc = dsalgo.utils.simpleSet();

  graph.vertexList().forEach(function (start_vertex){

    tc[start_vertex] = {};

    DFS(graph, start_vertex, tc[start_vertex], function(v,w){ });

  });

  return tc;
}

module.exports = TransitiveClosure;
