// http://en.wikipedia.org/wiki/Depth-first_search

var Stack = require('../../data_structures/stack/stack_with_array.js');

module.exports = function (graph, start_vertex) {
  
  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.")

  var visiting = 0;
  var info = [];
  
  for(var i = 0; i < graph.order() ; i++) {
    info[i] = {distance: 0, predecessor:null, visitedOrder:null, isVisited: false};
  }

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
