// http://en.wikipedia.org/wiki/Dijkstra's_algorithm
//
// other sources
// http://algs4.cs.princeton.edu/44sp/
// http://stackoverflow.com/questions/9255620/why-does-dijkstras-algorithm-use-decrease-key
// https://gabormakrai.wordpress.com/2015/02/11/experimenting-with-dijkstras-algorithm/
// https://github.com/gabormakrai/dijkstra-performance

var dsalgo = require('../../utilities.js').dsalgo;

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
      var alt = info[u].distance + graph.get_edge_weight(u, v);

      if (alt < info[v].distance) {

        info[v].distance = alt;
        info[v].predecessor = u;
      }

    }

  }

  this.info = info;
};

var shortestPath = function(target_vertex) {

  if (!this.info)
    throw new Error("dude I need a graph traversal to work with");

  if (!this.info[target_vertex]) {
    // vertex isn't in the list period so there is no shortest path to it
    return false;
  }

  var currVertInfo = this.info[target_vertex];
  // need to keep track of the vertex in the list. 
  // it wont be at its corresponding index in the array
  //
  // i.e. {vertex:6, distance: "1.51", predecessor: 3}
  //
  // also js is pass by reference so it would mute the orginal info object anyway unless we deep cloned
  // so might as well just embrace that and delete it later

  currVertInfo.vertex = target_vertex;

  var list = [];

  // would have used unshift but its O(n) each time
  // http://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript#comment1453625_1590262
  // https://github.com/v8/v8/blob/master/src/array.js#L662
  //
  // faster to just reverse the array at the end

  while (currVertInfo) {

    list.push(currVertInfo);

    // need this break for the case of having added the source who has no predecessor
    //
    // ahem. in js 0 == false so if zero is a vertex 
    // that can be checked that could fuck things up with out a proper defined check

    if (currVertInfo.predecessor === null) break;

    var nextVertInfo = this.info[currVertInfo.predecessor];
    nextVertInfo.vertex = currVertInfo.predecessor;

    currVertInfo = nextVertInfo;
  }

  // if there is no path to source return false
  // just checks if the last vertex we end up at is the source or not
  if (currVertInfo.vertex !== this.source) return false;

  // reverse our array as it is in backwards order since we added to end of array and not beginning
  list.reverse();

  var path_info = dsalgo.utils.simpleSet();

  path_info.order = [];

  // unforunately now this will all go to hell if there is a vertex named order 
  // but for our academic purposes of just learning how this algorithm works that is ok
  list.forEach(function(val) {
    var vert = val.vertex;
    delete val.vertex;
    path_info.order.push(vert);
    path_info[vert] = val;
  });

  return path_info;
};

naiveDijkstra.prototype.shortest_path = shortestPath;

var valueIfObject = function(a) {
  // to handle my data structures that return value objects
  if (dsalgo.utils.isDefined(a.value)) return a.value;
  return a;
};

var heapPQDijkstra = function(graph, start_vertex, heapQueue) {

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

    for (var k = 0; k < graph.adjacency_list[u].length; k++) {
      var v = graph.adjacency_list[u][k];
      var alt = info[u].distance + graph.get_edge_weight(u, v);

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
        queue.changePriority(v, alt, v);
      }

    }

  }

  return {
    sv: start_vertex,
    nfo: info
  };
};

var binaryHeapPQ = require('../../data_structures/priority_queue.js').priorityQueue.binaryHeap;

var binaryHeapPQDijkstra = function(graph, start_vertex) {
  // min priority queue
  var queue = new binaryHeapPQ(function(a, b) {
    if (a.priority != b.priority) return a.priority <= b.priority;

    // break value ties with insertion order
    // remember djikstra is greedy so it would always pick first anyway
    return a.order < b.order;
  });

  var obj = heapPQDijkstra(graph, start_vertex, queue);

  this.source = obj.sv;
  this.info = obj.nfo;
};

binaryHeapPQDijkstra.prototype.shortest_path = shortestPath;

var binomialHeapPQ = require('../../data_structures/priority_queue.js').priorityQueue.binomialHeap;

var binomialHeapPQDijkstra = function(graph, start_vertex) {
  // min priority queue with binomial heap
  var queue = new binomialHeapPQ(function(a, b) {
    if (a.key != b.key) return a.key <= b.key;
    return a.value.order < b.value.order;
  });

  var obj = heapPQDijkstra(graph, start_vertex, queue);

  this.source = obj.sv;
  this.info = obj.nfo;
};

binomialHeapPQDijkstra.prototype.shortest_path = shortestPath;

var fibonacciHeapPQ = require('../../data_structures/priority_queue.js').priorityQueue.fibonacciHeap;

var fibonacciHeapPQDijkstra = function(graph, start_vertex) {
  // min priority queue with fibonacci heap
  var queue = new fibonacciHeapPQ(function(a, b) {
    if (a.key != b.key) return a.key <= b.key;
    return a.value.order < b.value.order;
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

