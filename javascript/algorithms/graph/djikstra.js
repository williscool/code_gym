// http://en.wikipedia.org/wiki/Dijkstra's_algorithm
//
// other sources
// http://algs4.cs.princeton.edu/44sp/
// http://stackoverflow.com/questions/9255620/why-does-dijkstras-algorithm-use-decrease-key
// https://gabormakrai.wordpress.com/2015/02/11/experimenting-with-dijkstras-algorithm/
// https://github.com/gabormakrai/dijkstra-performance

var dsalgo = require('../../utilities.js').default;
var SPW = require('./shortest_path_walker.js');

var naiveDijkstra = function(graph, start_vertex) {
  this.source = start_vertex;
  // lightly influenced by
  // https://github.com/gabormakrai/dijkstra-performance/blob/master/Dijkstra.md

  // "Dijkstra's original algorithm does not use a min-priority queue and runs in time O(V^2)"
  //
  // That statement on the wikipedia article is actually technically false.
  //
  // The operation done on line 15 in the pseudocode http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
  //
  // "u ← vertex in Q with min dist[u]"
  //
  // is actually the same operation as a priority queue but it is a naive and unoptimized one
  // being that it is always going to look for the shortest distance in the queue
  //
  // also hindsight 20/20 this is also just a naive index priority queue.
  // so I could add a set that keeps track what nodes are still left to visit to the naive pq is and use the same interface as the other heaps
  //
  // but ill leave it for the nostalgia of writing a naive pq djikstra
  //
  // sidebar I really hate that so many people try to jump to teaching/ writing the most efficient version of an algorithm or data structure
  //
  // it robs the learner of the opportunity to learn the insights that lead the the optimal versions... but I digress

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  var info = [];
  var queueSet = dsalgo.utils.simpleSet();

  info[start_vertex] = {
    distance: 0,
    predecessor: null
  };

  for (var i = 0; i < graph.order(); i++) {
    if (i != start_vertex) {
      info[i] = {
        distance: Number.POSITIVE_INFINITY,
        predecessor: null
      };
    }

    queueSet[i] = true;
  }

  var findMinIndex = function(array, vertexHash) {

    var lowest = Number.POSITIVE_INFINITY;
    var index = -1;

    array.forEach(function(val, i) {
      // if this vertex has not been visited and the distance is the new lowest
      if (vertexHash[i] === true && (val.distance < lowest)) {
        index = i;
        lowest = val.distance;
      }
    });

    if (index == -1) {
      // this means everything else was pos infinity. just return the next vertex in the set
      //return Object.keys(vertexHash)[0];
      throw new Error("index set to negative one in findMinIndex. This should not happen!");
    }

    return index;
  };

  while (Object.keys(queueSet).length > 0) {

    // fun fact that is TERRIBLY (that is not at all) explained in wikipedia article
    //
    // at the first iteration of this function after you've added everything to the queue
    // the distance in the distance info array of all the verticies is POSITIVE_INFINITY
    //
    // EXCEPT ONE which is our source vertex.
    //
    // So which vertex does this loop start with?... of course its the source
    //
    // (I later noticed its mentioned in a comment beside the pseudocode on that line but still not well explained lol)

    // u starts at the source vertex
    var min_index = findMinIndex(info, queueSet);
    var u = min_index;

    // this is due to another thing that is TERRIBLY explained in the wiki article
    // on subsequent iterations you dont want to reconsider this vertex again
    delete queueSet[min_index];

    for (var j = 0; j < graph.adjacency_list[u].length; j++) {
      var v = graph.adjacency_list[u][j];
      var alt = info[u].distance + graph.getEdgeWeight(u, v);

      if (alt < info[v].distance) {

        info[v].distance = alt;
        info[v].predecessor = u;
      }

    }

  }

  this.info = info;
};

var shortestPath = function(target_vertex) {
    return SPW(this.info, this.source, target_vertex);
};

naiveDijkstra.prototype.shortest_path = shortestPath;

var valueIfObject = function(a) {
  // to handle my data structures that return value objects
  if (dsalgo.utils.isDefined(a.value)) return a.value;
  return a;
};

var heapPQDijkstra = function(graph, start_vertex, heapQueue, early_exit_condition, heuristicFn) {

  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

  var queue = heapQueue;
  var info = [];
  info[start_vertex] = {
    distance: 0,
    predecessor: null
  };

  for (var i = 0; i < graph.order(); i++) {
    if (i != start_vertex) {
      info[i] = {
        distance: Number.POSITIVE_INFINITY,
        predecessor: null
      };
    }

    queue.enqueue(i, info[i].distance);
  }

  while (queue.size() > 0) {

    // u starts at the source vertex
    // because of course it is the lowest value in our min heap at the start of the algorithm

    var u = valueIfObject(queue.dequeue());

    if(early_exit_condition && early_exit_condition(u)) {
      // early exit condition
      break;
    }

    for (var k = 0; k < graph.adjacency_list[u].length; k++) {
      var v = graph.adjacency_list[u][k];
      var alt = info[u].distance + graph.getEdgeWeight(u, v);

      if(heuristicFn) alt = alt + heuristicFn(v);

      if (alt < info[v].distance) {

        info[v].distance = alt;
        info[v].predecessor = u;

        // in my pq implementation you can change up or down
        // but in djikstra you only ever decrease priority
        //
        // also usefully each vertex is named the order its inserted in
        // you could also keep that in the info array if you were using non number keys
        //
        // Also fun fact a 2007 paper from UT (djikstra's long time post) says doing decreaseKey
        // doesn't perform as well on many graphs wonder what their implementation was?
        // havent had time to read it yet
        //
        // http://stackoverflow.com/a/18540646/511710
        //
        // another interesting critique of decreaseKey / changePriority
        // http://www.redblobgames.com/pathfinding/posts/reprioritize.html
        queue.changePriority(v, alt, v);
      }

    }

  }

  return {
    sv: start_vertex,
    nfo: info
  };
};

var binaryHeapPQ = require('../../data_structures/priority_queue.js').binaryHeap;

var binaryHeapPQDijkstra = function(graph, start_vertex, early_exit_condition, heuristicFn) {
  // min priority queue
  var queue = new binaryHeapPQ({
    comp: (a, b) => {
      if (a.priority != b.priority) return a.priority <= b.priority;

      // break value ties with insertion order
      // remember djikstra is greedy so it would always pick first anyway
      return a.order < b.order;
    }
  });

  var obj = heapPQDijkstra(graph, start_vertex, queue, early_exit_condition, heuristicFn);

  this.source = obj.sv;
  this.info = obj.nfo;
};

binaryHeapPQDijkstra.prototype.shortest_path = shortestPath;

var binomialHeapPQ = require('../../data_structures/priority_queue.js').binomialHeap;

var binomialHeapPQDijkstra = function(graph, start_vertex) {
  // min priority queue with binomial heap
  var queue = new binomialHeapPQ({
    comp: (a, b) => {
      if (a.key != b.key) return a.key <= b.key;
      return a.value.order < b.value.order;
    }
  });

  var obj = heapPQDijkstra(graph, start_vertex, queue);

  this.source = obj.sv;
  this.info = obj.nfo;
};

binomialHeapPQDijkstra.prototype.shortest_path = shortestPath;

var fibonacciHeapPQ = require('../../data_structures/priority_queue.js').fibonacciHeap;

var fibonacciHeapPQDijkstra = function(graph, start_vertex) {
  // min priority queue with fibonacci heap
  var queue = new fibonacciHeapPQ({
    comp: (a, b) => {
      if (a.key != b.key) return a.key <= b.key;
      return a.value.order < b.value.order;
    }
  });

  var obj = heapPQDijkstra(graph, start_vertex, queue);

  this.source = obj.sv;
  this.info = obj.nfo;
};

fibonacciHeapPQDijkstra.prototype.shortest_path = shortestPath;

module.exports = {
  naive: naiveDijkstra,
  binaryHeapPQ: binaryHeapPQDijkstra,
  binomialHeapPQ: binomialHeapPQDijkstra,
  fibonacciHeapPQ: fibonacciHeapPQDijkstra
};

