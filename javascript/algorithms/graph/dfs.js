// http://en.wikipedia.org/wiki/Depth-first_search

module.exports.DFS = {};

var dsalgo = require('../../utilities.js').dsalgo;
var Stack = require('../../data_structures/stack/stack_with_array.js');

module.exports.DFS.iterative = function (graph, start_vertex) {
  
  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.")

  var visiting = 0;
  var info = [];
  
  for(var i = 0; i < graph.order() ; i++) {
    info[i] = {distance: null, predecessor:null, visitedOrder:null, isVisited: false};
  }

  info[start_vertex] = {distance: 0, predecessor:null, visitedOrder:visiting, isVisited: false}

  var stack = new Stack();

  stack.push(start_vertex);

  while(!stack.isEmpty()) {

    var v = stack.pop();

    if(info[v].isVisited === false) {
        info[v].isVisited = true;
        visiting += 1;
        info[v].visitedOrder = visiting;

      // so this takes some explaining we add the adjacent nodes in reverse order why?
      // so that the left most node is at the top of the stack
      
      for(var i = graph.adjacency_list[v].length - 1; i >= 0; i--){
        var w = graph.adjacency_list[v][i];

        if(info[w].isVisited === false) {
          info[w].distance = info[v].distance + 1;
          info[w].predecessor = v;
          stack.push(w);    
        } 
      } 
    }
  
        
  }

  return info;
};

// inspired by
// https://github.com/adlawson/search-algorithms/blob/master/javascript/dfs.js
module.exports.DFS.recursive = function (graph, v, visited, fn) {
  var DFS = module.exports.DFS.recursive;

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.")

  if(visited[v] === true) return;

  visited[v] = true;

  for(var i in graph.adjacency_list[v]) {

    var w = graph.adjacency_list[v][i];

    if(visited[w] !== true) {
      fn(v,w);
      DFS(graph, w, visited,fn);
    }

  } 

};

module.exports.DFS.recursive_info = function (graph, start_vertex) {
    var info = [];
    for(var i = 0; i < graph.order() ; i++) {
      info[i] = {distance: null, predecessor:null, visitedOrder:null, isVisited: false};
    }
    var visiting = 1;

    info[start_vertex] = {distance: 0, predecessor:null, visitedOrder:visiting, isVisited: true}

    var DFS = module.exports.DFS.recursive;

    DFS(graph, start_vertex, Object.create(null), function(v,w){
        visiting += 1;
        info[w] = {distance: info[v].distance + 1, predecessor:v, visitedOrder:visiting, isVisited: true}
    });

    return info;
};
