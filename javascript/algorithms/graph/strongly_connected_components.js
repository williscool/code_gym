// https://en.wikipedia.org/wiki/Strongly_connected_component

var dsalgo = require('../../utilities.js').default;
var TC = require('./transitive_clousure.js');

function naiveSCC(graph){

  var v;
  var component_id = dsalgo.utils.simpleSet();

  // intially every vert is in its own comp
  for(v in graph.vertexList()) {
    component_id [v] = v;
  }

  var reachable = TC(graph);

  graph.vertexList().forEach(function (v){

    graph.vertexList().forEach(function (w){

      if(reachable[v][w] && reachable[w][v]){
        component_id[v] = w;
      }

    });

  });

  var compSet = dsalgo.utils.simpleSet();

  for(v in graph.vertexList()) {
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

var DFSContainer = require('./dfs.js').default;
var DFS = DFSContainer.recursive;
var dfsToArray = DFSContainer.recursive_to_array;

function kosarajuSharirSCC(graph){

  // Step 1. Do the reverse post order traversal of the reverse of the graph
  var rpoOfReverseGraph = dfsToArray(graph.reverse(), "post").reverse();

  var marked =  dsalgo.utils.simpleSet();
  var component_id = dsalgo.utils.simpleSet();

  var count = 1;

  // 2. dfs in the order of the rpoOfReverseGraph and add components to id
  rpoOfReverseGraph.forEach(function(v){

    if (marked[v]) return;

    DFS(graph, v, marked, function(v,w) {
      component_id[v] = count;
    }, "pre");

    count++;

  });

  // print it out
  var compSet = dsalgo.utils.simpleSet();

  for(var v in graph.vertexList()) {
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
  brute_force: naiveSCC,
  kosaraju_sharir: kosarajuSharirSCC
};
