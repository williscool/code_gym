import dsalgo from '../../utilities';
import SPW from './shortest_path_walker';
import PriorityQueueTypes from '../../data_structures/priority_queue';

/**
 * Implements dijkstra's algorithm
 *
 * http://en.wikipedia.org/wiki/Dijkstra's_algorithm
 *
 * Djikstra is literally a bfs with a goal. Finding the shortest path from a start vertex
 *
 * So at each iteration instead of visiting all vertices we visit the next one with the lowest cost edge
 *
 * other sources
 * http://algs4.cs.princeton.edu/44sp/
 * http://stackoverflow.com/questions/9255620/why-does-dijkstras-algorithm-use-decrease-key
 * https://gabormakrai.wordpress.com/2015/02/11/experimenting-with-dijkstras-algorithm/
 * https://github.com/gabormakrai/dijkstra-performance
 *
 * @module djikstra
 */

const {
  binaryHeap: BinaryHeapPQ,
  binomialHeap: BinomialHeapPQ,
  fibonacciHeap: FibonacciHeapPQ,
} = PriorityQueueTypes;

/**
 * The Naive version of Dijkstra's algo
 *
 * lightly influenced by
 * https://github.com/gabormakrai/dijkstra-performance/blob/master/Dijkstra.md
 *
 * "Dijkstra's original algorithm does not use a min-priority queue and runs in time O(V^2)"
 *
 * That statement on the wikipedia article is actually technically false.
 *
 * The operation done on line 15 in the pseudocode http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
 *
 * "u ← vertex in Q with min dist[u]"
 *
 * is actually the same operation as a priority queue but it is a naive and unoptimized one
 *
 * being that it is always going to look for the shortest distance in the queue
 * but in doing so needs to scan all elements each time
 *
 * also hindsight 20/20 this is also just a naive index priority queue.
 * so I could add a set that keeps track what nodes are still left to visit to the naive pq is and use the same interface as the other heaps
 *
 * but ill leave it for the nostalgia of writing a naive pq djikstra from scratch because it took me so long to figure that out lol
 *
 * sidebar I really hate that so many people try to jump to teaching/ writing the most efficient version of an algorithm or data structure
 *
 * it robs the learner of the opportunity to learn the insights that lead the the optimal versions... but I digress
 *
 * Time Complexity: |V^2|
 *
 * @prop {array} info array of objects describing each vertex, like
 *     [{distance: _, predecessor: _ }]
 *
 * @class NaiveDijkstra
 */
class NaiveDijkstra {
  /**
   * Creates an instance of NaiveDijkstra.
   *
   * @param {any} graph graph to traverse
   * @param {any} startVertex vertex to start traversal from
   * @memberof NaiveDijkstra
   */
  constructor(graph, startVertex) {
    this.source = startVertex;

    if (graph.order() < 1) throw new Error("come on dog there's no nodes in this graph.");

    const info = [];
    const queueSet = dsalgo.utils.simpleSet();

    info[startVertex] = {
      distance: 0,
      predecessor: null,
    };

    for (let i = 0; i < graph.order(); i += 1) {
      if (i !== startVertex) {
        info[i] = {
          distance: Number.POSITIVE_INFINITY,
          predecessor: null,
        };
      }

      // same as enqueue in other implemenations
      queueSet[i] = true;
    }

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
      const minIndex = NaiveDijkstra.findMinIndex(info, queueSet);
      const u = minIndex;

      // this is due to another thing that is TERRIBLY explained in the wiki article
      // on subsequent iterations you dont want to reconsider this vertex again
      delete queueSet[minIndex];

      for (let j = 0; j < graph.adjacency_list[u].length; j += 1) {
        const v = graph.adjacency_list[u][j];
        // the distance traveled so far plus the cost of traveling to this new vertex from the current
        const alt = info[u].distance + graph.getEdgeWeight(u, v);

        if (alt < info[v].distance) {
          info[v].distance = alt;
          info[v].predecessor = u;
        }
      }
    }

    this.info = info;
  }
  /**
   * This is a naive prority queue implemented on the queue set created as a part of the naive Dijkstra
   *
   * I wrote this and the naive version of Dijkstra before I figure out that the cake was a lie.. erm
   *
   * Dijkstra's orginal algorithm use's naive pq with a set to exlude already visted vertices.
   *
   * Now I don't want to delete it because it took me a lot of time to figure out how to code from wikipedia
   *
   * so sue me :P
   *
   * @param {array} array to find smallest value in
   * @param {Object} vertexHash hash of visted verticies
   * @returns {number} index of value with lowest priority
   */
  static findMinIndex(array, vertexHash) {
    let lowest = Number.POSITIVE_INFINITY;
    let index = -1;

    array.forEach((val, i) => {
      // if this vertex has not been visited and the distance is the new lowest
      if (vertexHash[i] === true && (val.distance < lowest)) {
        index = i;
        lowest = val.distance;
      }
    });

    if (index === -1) {
      throw new Error('index set to negative one in findMinIndex. This should not happen!');
    }

    return index;
  }
}

/**
 * Walks the path found by one of the Dijkstra implementation's
 *
 * It is added to the prototype chain of the the implementations
 *
 * Used to be a part of this module but was factored out because bellman ford use's the same logic
 *
 * It's function is explained in the module that exports it
 *
 * @param {any} targetVertex vertex to terminate path in
 * @returns {array|boolean} array of verts in the shortest path if there is a path from start to target. false if not
 */
function shortestPath(targetVertex) {
  return SPW(this.info, this.source, targetVertex);
}

NaiveDijkstra.prototype.shortestPath = shortestPath;

/**
 * Implements Dijkstra's algorithm with a min heap
 *
 * Generic object that excepts a heap as a parameter
 *
 * Time Complexity: Dependant on the heap implementation
 *
 * @class HeapPQDijkstra
 */
class HeapPQDijkstra {
  /**
   * Creates an instance of HeapPQDijkstra.
   *
   * @param {any} graph the graph the traversal is on
   * @param {any} startVertex the vertex to start traversing from
   * @param {any} heapQueue the heap to use to get the minimum value
   * @param {any} earlyExitCondition a condition to stop traversing before total completion
   * @param {any} heuristicFn a heuristic to add the value's used in the A* version of Dijkstra
   * @memberof HeapPQDijkstra
   */
  constructor(graph, startVertex, heapQueue, earlyExitCondition, heuristicFn) {
    if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

    if (!heapQueue) return Error('Cannot function without a heap implementation');

    const queue = heapQueue;
    const info = [];
    info[startVertex] = {
      distance: 0,
      predecessor: null,
    };

    for (let i = 0; i < graph.order(); i += 1) {
      if (i !== startVertex) {
        info[i] = {
          distance: Number.POSITIVE_INFINITY,
          predecessor: null,
        };
      }

      queue.enqueue(i, info[i].distance);
    }

    while (queue.size() > 0) {
      // u starts at the source vertex
      // because of course it is the lowest value in our min heap at the start of the algorithm

      const u = HeapPQDijkstra.valueIfObject(queue.dequeue());

      if (earlyExitCondition && earlyExitCondition(u)) {
        // early exit condition
        break;
      }

      for (let k = 0; k < graph.adjacency_list[u].length; k += 1) {
        const v = graph.adjacency_list[u][k];
        // the distance traveled so far plus the cost of traveling to this new vertex from the current
        let alt = info[u].distance + graph.getEdgeWeight(u, v);

        if (heuristicFn) alt += heuristicFn(v);

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

    this.source = startVertex;
    this.info = info;

    return this;
  }

  static valueIfObject(a) {
    // to handle my data structures that return value objects
    if (dsalgo.utils.isDefined(a.value)) return a.value;
    return a;
  }
}

/**
 * Implements Dijkstra's algorithm with a binary heap
 *
 * Time Complexity: (|E| + |V|) log |V|
 *
 * @class BinaryHeapPQDijkstra
 */
class BinaryHeapPQDijkstra extends HeapPQDijkstra {
  /**
   * Creates an instance of BinaryHeapPQDijkstra.
   *
   * @param {any} graph the graph the traversal is on
   * @param {any} startVertex the vertex to start traversing from
   * @param {any} earlyExitCondition a condition to stop traversing before total completion
   * @param {any} heuristicFn a heuristic to add the value's used in the A* version of Dijkstra
   * @memberof BinaryHeapPQDijkstra
   */
  constructor(graph, startVertex, earlyExitCondition, heuristicFn) {
    // min priority queue
    const queue = new BinaryHeapPQ({
      comp: (a, b) => {
        if (a.priority !== b.priority) return a.priority <= b.priority;

        // break value ties with insertion order
        // remember djikstra is greedy so it would always pick first anyway
        return a.order < b.order;
      },
    });

    super(graph, startVertex, queue, earlyExitCondition, heuristicFn);
  }
}

BinaryHeapPQDijkstra.prototype.shortestPath = shortestPath;


/**
 * Implements Dijkstra's algorithm with a binomial heap
 *
 * Time Complexity: (|E| + |V|) log |V|
 *
 * @class BinomialHeapPQDijkstra
 */
class BinomialHeapPQDijkstra extends HeapPQDijkstra {
  /**
   * Creates an instance of BinomialHeapPQDijkstra.
   *
   * @param {any} graph the graph the traversal is on
   * @param {any} startVertex the vertex to start traversing from
   * @memberof BinomialHeapPQDijkstra
   */
  constructor(graph, startVertex) {
    // min priority queue with binomial heap
    const queue = new BinomialHeapPQ({
      comp: (a, b) => {
        if (a.key !== b.key) return a.key <= b.key;
        return a.value.order < b.value.order;
      },
    });

    super(graph, startVertex, queue);
  }
}

BinomialHeapPQDijkstra.prototype.shortestPath = shortestPath;

/**
 * Implements Dijkstra's algorithm with a fibbonccci heap
 *
 * Time Complexity: |E| + |V| log |V|
 *
 * @class FibonacciHeapPQDijkstra
 */
class FibonacciHeapPQDijkstra extends HeapPQDijkstra {
  /**
   * Creates an instance of FibonacciHeapPQDijkstra.
   *
   * @param {any} graph the graph the traversal is on
   * @param {any} startVertex the vertex to start traversing from
   * @memberof FibonacciHeapPQDijkstra
   */
  constructor(graph, startVertex) {
    // min priority queue with fibonacci heap
    const queue = new FibonacciHeapPQ({
      comp: (a, b) => {
        if (a.key !== b.key) return a.key <= b.key;
        return a.value.order < b.value.order;
      },
    });

    super(graph, startVertex, queue);
  }
}

FibonacciHeapPQDijkstra.prototype.shortestPath = shortestPath;

export default {
  naive: NaiveDijkstra,
  binaryHeapPQ: BinaryHeapPQDijkstra,
  binomialHeapPQ: BinomialHeapPQDijkstra,
  fibonacciHeapPQ: FibonacciHeapPQDijkstra,
};

