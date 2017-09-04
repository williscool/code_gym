// http://en.wikipedia.org/wiki/Depth-first_search

var dsalgo = require('../../utilities.js').default;
var Stack = require('../../data_structures/stack.js').default.array;

var iterative = function(graph, start_vertex) {

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  var visiting = 0;
  var info = [];

  for (var i = 0; i < graph.order(); i++) {
    info[i] = {
      distance: null,
      predecessor: null,
      visitedOrder: null,
      isVisited: false
    };
  }

  info[start_vertex] = {
    distance: 0,
    predecessor: null,
    visitedOrder: visiting,
    isVisited: false
  };

  var stack = new Stack();

  stack.push(start_vertex);

  while (!stack.isEmpty()) {

    var v = stack.pop();

    if (info[v].isVisited === false) {
      info[v].isVisited = true;
      visiting += 1;
      info[v].visitedOrder = visiting;

      // so this takes some explaining we add the adjacent nodes in reverse order why?
      // so that the left most node is at the top of the stack

      for (var j = graph.adjacency_list[v].length - 1; j >= 0; j--) {
        var w = graph.adjacency_list[v][j];

        if (info[w].isVisited === false) {
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
var recursive = function(graph, v, visited, fn, order) {
  var DFS = recursive;
  var altOrder = dsalgo.utils.isDefined(order) && (order != "in");
  var w;

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  visited[v] = true;

  if(altOrder && order == "pre") fn(v, w);

  for (var i in graph.adjacency_list[v]) {

    w = graph.adjacency_list[v][i];

    if (visited[w] !== true) {
      if(!altOrder) fn(v, w);
      DFS(graph, w, visited, fn, order);
    }

  }

  if(altOrder && order == "post") fn(v, w);
};

var recursive_info = function(graph, start_vertex) {
  var info = [];
  for (var i = 0; i < graph.order(); i++) {
    info[i] = {
      distance: null,
      predecessor: null,
      visitedOrder: null,
      isVisited: false
    };
  }
  var visiting = 1;

  info[start_vertex] = {
    distance: 0,
    predecessor: null,
    visitedOrder: visiting,
    isVisited: true
  };

  var DFS = recursive;

  DFS(graph, start_vertex, Object.create(null), function(v, w) {
    visiting += 1;
    info[w] = {
      distance: info[v].distance + 1,
      predecessor: v,
      visitedOrder: visiting,
      isVisited: true
    };
  });

  return info;
};


function recursivetoArray(graph, orderName) {
  var DFS = recursive;
  var order = [];
  var marked =  dsalgo.utils.simpleSet();

  graph.vertex_list().forEach(function (vertexLabel){
    vertexLabel = dsalgo.utils.makeNumberUnlessNaN(vertexLabel);

    if (marked[vertexLabel]) return;

    DFS(graph, vertexLabel, marked, function(v,w) {
      order.push(v);
    }, orderName);

    });

  return order;
}


module.exports = {
  iterative: iterative,
  recursive: recursive,
  recursive_info : recursive_info,
  recursive_to_array : recursivetoArray
};
