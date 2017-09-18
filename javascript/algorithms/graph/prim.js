import dsalgo from '../../utilities';
import QueueTypes from '../../data_structures/queue';
import Graph from '../../data_structures/graph';
import PriorityQueueTypes from '../../data_structures/priority_queue';

/**
 * http://en.wikipedia.org/wiki/Prim%27s_algorithm
 * http://algs4.cs.princeton.edu/43mst/
 *
 * Prim's algorithm works by attaching a new edge to a single growing tree at each step:
 *
 * Start with any vertex as a single-vertex tree; then add V-1 edges to it, always taking next the minimum-weight edge
 *
 * that connects a vertex on the tree to a vertex not yet on the tree (a crossing edge for the cut defined by tree vertices).
 *
 * A crossing edge is an edge that connects a vertex in one set with a vertex in the other.
 *
 * How do we (efficiently) find the crossing edge of minimal weight? this depends on the version of Prim
 *
 * The naive version of prim just uses a naive priority queue
 * (a linear search through the array of edge costs)
 * to pick the next edge with the smallest cost
 *
 * not particularly interesting being that I already wrote an naive pq
 * @module Prim
 */

const Queue = QueueTypes.doubly_linked_list;
const BinaryHeapPQ = PriorityQueueTypes.binaryHeap;

/**
 * Lazy Version of Prim's algorithm
 *
 * A crossing edge is an edge that connects a vertex in one set with a vertex in the other.
 *
 * In the lazy version of prim
 *
 * We use a priority queue to hold the crossing edges and find one of minimal weight.
 * Each time that we add an edge to the tree, we also add a vertex to the tree.
 *
 * To maintain the set of crossing edges, we need to add to the priority queue all edges from that vertex to any non-tree vertex.
 *
 * But we must do more: any edge connecting the vertex just added to a tree vertex that is already on the priority queue now becomes ineligible
 * (it is no longer a crossing edge because it connects two tree vertices).
 *
 * The lazy implementation leaves such edges on the priority queue, deferring the ineligibility test to when we remove them.
 *
 * inspired by http://algs4.cs.princeton.edu/43mst/LazyPrimMST.java.html
 *
 * @class LazyPrimMST
 */
class LazyPrimMST {
  constructor(graph, startVertex) {
    if (graph.order() < 1) throw new Error("come on dog there's no nodes in this graph.");

    this.graph = graph;
    this.weight = 0;
    this.mst = new Queue();
    this.marked = dsalgo.utils.simpleSet();

    // min priority queue
    this.pq = new BinaryHeapPQ({
      comp: (a, b) => {
        if (a.priority !== b.priority) return a.priority <= b.priority;

        // break value ties with insertion order
        return a.order < b.order;
      },
    });

    // return the PrimMST after prim function of first vertex if given a startVertex
    if (dsalgo.utils.isDefined(startVertex)) {
      this.prim(startVertex);
      return this;
    }

    // if we get this return the PrimMST object after scanning all the verticies
    // this will give us a spanning forest in an unconnected graph
    this.graph.vertexList().forEach((val) => {
      if (!this.marked[val]) this.prim(val);
    });
  }

  /**
   * Adds all edges connected to the input vertex
   * unless the other vertex on said edge has already been scanned
   *
   * @param {any} v vertex to start scan from
   * @memberof LazyPrimMST
   */
  scan(v) {
    if (!this.marked[v]) {
      this.marked[v] = true;

      this.graph.adjacency_list[v].forEach((w) => {
        if (!this.marked[w]) {
          const edgeKey = this.graph.edgeKey(v, w);

          this.pq.enqueue(edgeKey, this.graph.getEdgeWeight(v, w));
        }
      });
    }
  }

  /**
   * The prim algorithm call of the lazy version
   *
   * Starts with a `scan` of the startVertex then adds
   *
   * connected spanning tree limbs in least cost order
   *
   * @param {any} startVertex
   * @returns {Object}
   * @memberof LazyPrimMST
   */
  prim(startVertex) {
    this.scan(startVertex);

    while (this.pq.size() > 0) {
      const currentEdgeKey = this.pq.dequeue();

      const v = Graph.edgeKeyVertexFrom(currentEdgeKey);
      const w = Graph.edgeKeyVertexTo(currentEdgeKey);

      // TODO: come back and figure out why this dont work inverted to get rid of continue
      // eslint-disable-next-line no-continue
      if (this.marked[v] && this.marked[w]) continue;

      this.mst.enqueue(currentEdgeKey);
      this.weight = this.weight + this.graph.getEdgeWeight(v, w);

      if (!this.marked[v]) this.scan(v);
      if (!this.marked[w]) this.scan(w);
    }

    return this.mst;
  }
}

/**
 * Eager version of prim's algorithm
 *
 * We maintain on the priority queue just one edge for each non-tree vertex: the shortest edge that connects it to the tree.
 *
 * inspired by http://algs4.cs.princeton.edu/43mst/PrimMST.java.html
 *
 * @param {any} graph
 * @param {any} startVertex
 * @returns
 */
class EagerPrimMST {
  constructor(graph, startVertex) {
    if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

    this.graph = graph;
    this.weight = 0;
    this.mst = new Queue();
    this.vertexPQOrder = new Queue();

    this.marked = dsalgo.utils.simpleSet(); // will use this to store insertion order now. so boolean checks must be careful for 0 == false
    this.edgeTo = dsalgo.utils.simpleSet();
    this.distTo = dsalgo.utils.simpleSet();

    // init distance to all verticies to pos infinity
    this.graph.vertexList().forEach((val) => {
      this.distTo[val] = Number.POSITIVE_INFINITY;
    });

    // min priority queue
    this.pq = new BinaryHeapPQ({
      comp: (a, b) => {
        if (a.priority !== b.priority) return a.priority <= b.priority;

        // break value ties with insertion order
        return a.order < b.order;
      },
    });

    // return the PrimMST after prim function of first vertex if given a startVertex
    if (dsalgo.utils.isDefined(startVertex)) {
      this.prim(startVertex);

      this.buildMSTQueue();
      return this;
    }
    // if we get to this return the PrimMST object after scanning all the verticies

    // this will give us a spanning forest in an unconnected graph
    this.graph.vertexList().forEach((val) => {
      if (!dsalgo.utils.isDefined(this.marked[val])) this.prim(val);
    });

    this.buildMSTQueue();
  }

  /**
   * Builds the minimum spanning tree
   *
   * The need for the vertex order queue takes a bit of explaining
   * you see in javascript there is no guarantee on the order elements from objects get enumerated in
   *
   * So I used this vertex order queue to read back the edges as the order the corresponding vertices were added
   *
   * To match the output of the sedgewick & wayne's implementation of this algo
   *
   * @memberof EagerPrimMST
   */
  buildMSTQueue() {
    this.vertexPQOrder.forEach((v) => {
      if (!dsalgo.utils.isDefined(this.edgeTo[v])) return; // if vertex has no edge to itself
      const edgeKey = this.edgeTo[v];
      this.mst.enqueue(edgeKey);
      this.weight += this.graph.getEdgeWeightByKey(edgeKey);
    });
  }

  /**
  * The prim algorithm call of the eager version
  *
  * Starts with a `scan` of the startVertex then adds
  * connected spanning tree limbs in least cost order
  *
  * In eager prim though the checking for marked verticies
  * is done in the scan instead of here in  the tree building phase
  *
  * @param {any} startVertex
  * @returns {Object}
  * @memberof EagerPrimMST
  */
  prim(startVertex) {
    this.distTo[startVertex] = 0;
    this.pq.enqueue(startVertex, this.distTo[startVertex]);

    while (this.pq.size() > 0) {
      const currentVertex = this.pq.dequeue();
      this.scan(currentVertex);
    }

    return this.mst;
  }

  /**
   * Adds all edges connected to the input vertex
   * unless the other vertex on said edge has already been scanned
   *
   * In the eager prim though. We are much more selective of which edge's we add to the pq at the scan step
   *
   * We seek to ensure that we th
   *
   * @param {any} v vertex to start scan from
   * @memberof EagerPrimMST
   */
  scan(v) {
    if (!dsalgo.utils.isDefined(this.marked[v])) {
      this.marked[v] = this.vertexPQOrder.length;
      this.vertexPQOrder.enqueue(v);
      // needed to keep track of when we inserted a vertex to update priority later
    }

    this.graph.adjacency_list[v].forEach((w) => {
      if (dsalgo.utils.isDefined(this.marked[w])) return; // return === continue in a forEach loop

      const edgeKey = this.graph.edgeKey(v, w);
      const edgeWeight = this.graph.getEdgeWeightByKey(edgeKey);

      // if the edge we are examining's cost is lower than another we had examined before
      if (edgeWeight < this.distTo[w]) {
        this.distTo[w] = edgeWeight;
        this.edgeTo[w] = edgeKey;

        // if we have encountered this vertex before and thus it is in the pq
        if (dsalgo.utils.isDefined(this.marked[w])) {
          // change the prority aka cost of this edge in the pq
          this.pq.changePriority(w, this.distTo[w], this.marked[w]);
        } else {
          // add this new vertex with it's edge's cost to the pq
          this.pq.enqueue(w, this.distTo[w]);
        }
      }
    });
  }
}

export default {
  lazy: LazyPrimMST,
  eager: EagerPrimMST,
};
