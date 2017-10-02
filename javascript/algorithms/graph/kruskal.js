import dsalgo from '../../utilities';
import Graph from '../../data_structures/graph';
import QueueTypes from '../../data_structures/queue';
import UnionFindTypes from '../../algorithms/graph/uf';
import PriorityQueueTypes from '../../data_structures/priority_queue';

const UF = UnionFindTypes.weighted_quick_union_with_path_compression;
const Queue = QueueTypes.doubly_linked_list;
const BinaryHeapPQ = PriorityQueueTypes.binaryHeap;

/**
 * http://en.wikipedia.org/wiki/Kruskal%27s_algorithm
 *
 * Kruskal's algorithm processes the edges in order of their weight values (smallest to largest),
 * taking for the MST (coloring black) each edge that does not form a cycle with edges previously added, stopping after adding V-1 edges.
 *
 * The Kruskal class represents a data type for computing a minimum spanning tree in an edge-weighted graph.
 *
 * The edge weights can be positive, zero, or negative and need not be distinct. If the graph is not connected, it computes a minimum spanning forest,
 * which is the union of minimum spanning trees in each connected component.
 *
 * http://algs4.cs.princeton.edu/43mst/
 * inspired by http://algs4.cs.princeton.edu/43mst/KruskalMST.java.html
 *
 * @property {number} weight the weight of a minimum spanning tree
 * @property {Queue} mst a queue with the edges of the mst
 * @param {any} graph graph to traversal
 */
class Kruskal {
  constructor(graph) {
    if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.");

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

    // add all of the edges in the graph into the pq
    this.graph.edgeSetList().forEach((edgeKey) => {
      this.pq.enqueue(edgeKey, this.graph.getEdgeWeightByKey(edgeKey));
    });

    const uf = new UF({ N: this.graph.order() });

    while (this.pq.size() > 0 && (this.mst.length < graph.order() - 1)) {
      const currentEdgeKey = this.pq.dequeue();

      let v = Graph.edgeKeyVertexFrom(currentEdgeKey);
      let w = Graph.edgeKeyVertexTo(currentEdgeKey);

      // need to make sure these are numbers
      v = dsalgo.utils.makeNumberUnlessNaN(v);
      w = dsalgo.utils.makeNumberUnlessNaN(w);

      if (!uf.connected(v, w)) { // if v w does not create a cycle
        uf.union(v, w); // merge v and w components
        this.mst.enqueue(currentEdgeKey); // add the edge between them to mst
        this.weight = this.weight + this.graph.getEdgeWeight(v, w);
      }
    }
  }
}

export default Kruskal;
