// https://en.wikipedia.org/wiki/Strongly_connected_component

var dsalgo = require('../../utilities.js').dsalgo;
var DFS = require('./dfs.js').recursive;
var TC = require('./transitive_clousure.js');

function naiveSCC(graph){

  var component_id = dsalgo.utils.simpleSet();

  // intially every vert is in its own comp
  for(var v in graph.vertex_list()) {
    component_id [v] = v;
  }

  var reachable = TC(graph);

  graph.vertex_list().forEach(function (v){

    graph.vertex_list().forEach(function (w){

      if(reachable[v][w] && reachable[w][v]){
        component_id[v] = w;
      }
       
    });
     
  });

  var compSet = dsalgo.utils.simpleSet();
  
  for(var v in graph.vertex_list()) {
    if( !dsalgo.utils.isDefined(compSet[component_id[v]])) compSet[component_id[v]] = [];
    v = dsalgo.utils.makeNumberUnlessNaN(v);
    compSet[component_id[v]].push(v);
  }

  var components = [];

  for (var comp in compSet){
    components.push(compSet[comp]);
  }

  return components;
} 

// TODO: in the future do the more in clever faster ones that only need one dfs
// https://en.wikipedia.org/wiki/Strongly_connected_component#Algorithms

module.exports = {
  naive: naiveSCC
};
