// https://en.wikipedia.org/wiki/Cycle_(graph_theory)#Cycle_detection
//
// http://www.geeksforgeeks.org/detect-cycle-in-a-graph/

var dsalgo = require('../../utilities.js').default;
var onStack; // used to keep track of nodes we looked at before in directed graph version of dfs cyclecheck

// checks for if a cycle exists and returns an array representing the cycle if so. if not it returns an empty array
//
// this algorithm is bascically dfs but it short circuts if it finds a cycle
//
// http://www.geeksforgeeks.org/detect-cycle-undirected-graph/
// http://www.geeksforgeeks.org/detect-cycle-in-a-graph/
//
// updated to be more like http://algs4.cs.princeton.edu/41graph/Cycle.java.html
//
// so inspired by this http://stackoverflow.com/questions/8935323/detecting-cycles-of-a-graphmaybe-directed-or-undirected-in-haskell
//
// I went looking for a better solution than having side effects
//
// so inspired by these
//
// http://matt.might.net/articles/by-example-continuation-passing-style/
// http://www.2ality.com/2012/06/continuation-passing-style.html
//
// I thought about the way my dfs pass a function to show display the order the nodes were visited in
//
// and I ended up with an algorithm that finds the first cycle reachable from each vertex. pretty neat
//
// I could use a side effect array inside of the DFS to check if we've found one cycle to determine if we've already found one but that would defeat the not having a side effect purpose lol
//
function DFSCycleCheck(graph, v, parent, visited, edgeTo, fn) {
  visited[v] = true;
  if(graph.directed) onStack[v] = true;

  for (var i in graph.adjacency_list[v]) {
    var w = graph.adjacency_list[v][i];

    if (visited[w] !== true) {

      edgeTo[w] = v;
      DFSCycleCheck(graph, w, v, visited, edgeTo, fn);

    } else if ( (!graph.directed && w != parent) || (graph.directed && onStack[w] === true) ){

      var cycle = [];
      // while x isDefined and not w
      for (var x = v; x && x != w; x = edgeTo[x]) {
        cycle.push(x);
      }
      cycle.push(w);
      cycle.push(v);
      fn(cycle);
      return cycle;
    }
  }

  if(graph.directed) onStack[v] = false;
  return fn([]);
}

// http://algs4.cs.princeton.edu/41graph/Cycle.java.html
function selfLoop(graph) {

  for (var v in graph.vertex_list()) {
      for (var i = 0; i < graph.adjacency_list[v].length; i++) {
        var w = graph.adjacency_list[v][i];
        if( v == w){
          var loop = [];
          loop.push(v);
          loop.push(v);
          return loop;
        }
      }
  }

  return [];
}

// http://algs4.cs.princeton.edu/41graph/Cycle.java.html
// so my Graph data stucture is designed to support one parallel edge for each edge between graph nodes in an undirected graph
// so to assess if there are parallel edges in mine you need to count how many times you see an edge and if its more than 2 there is a parallel edge
function parallelEdges(graph) {
  var seenEdge = dsalgo.utils.simpleSet();

  for (var v in graph.vertex_list()) {
      for (var i = 0; i < graph.adjacency_list[v].length; i++) {
        var w = graph.adjacency_list[v][i];
        if(!dsalgo.utils.isDefined(seenEdge[graph.edge_key(v,w)])){
          seenEdge[graph.edge_key(v,w)] = 0;
        }
        if (seenEdge[graph.edge_key(v,w)] > 2) {
          var cycle = [];
          cycle.push(v);
          cycle.push(w);
          cycle.push(v);
          return cycle;
        }
        seenEdge[graph.edge_key(v,w)]++;
      }
  }
  return [];
}

module.exports = {
  utils: {
    selfLoop: selfLoop,
    hasSelfLoop: function(graph){
      return selfLoop(graph).length > 0;
    },
    parallelEdges: parallelEdges,
    hasParallelEdges: function(graph){
      return parallelEdges(graph).length > 0;
    },
  },
  dfsish: function(graph, start_vertex) {

    if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

    // couldnt figure out how to do this functionally :(
    // all the stuff from googling "dfs directed graph cycle haskell"
    // is over my head lol
    if(graph.directed) onStack = dsalgo.utils.simpleSet();

    var cycles = [];

    var cycleAdder = function cycleAdder(possibleCycle){
      if(graph.directed) possibleCycle.reverse(); // if the graph is directed we pushed the nodes of the cycle on in reversed order. if not it dont matter since the graph aint directed
      if(possibleCycle.length > 0) cycles.push(possibleCycle);
    };

    if(dsalgo.utils.isDefined(start_vertex)){

       DFSCycleCheck(graph, start_vertex, null, dsalgo.utils.simpleSet(), dsalgo.utils.simpleSet(), cycleAdder);

    } else {

      // if there is no explicit start vertex set try them all
      for (var i in graph.vertex_list()) {
         DFSCycleCheck(graph, i, null, dsalgo.utils.simpleSet(), dsalgo.utils.simpleSet(), cycleAdder);
      }

    }

    return cycles;
  }

};
