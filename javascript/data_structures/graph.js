import dsalgo from '../utilities';
import UnionFindTypes from '../algorithms/graph/uf';
import cycleCheckerUtils from '../algorithms/graph/cycle_detection';

const UF = UnionFindTypes.weighted_quick_union_with_path_compression;
const cycleChecker = cycleCheckerUtils.dfsish;

/**
 * A object to represent graphs
 *
 * http://en.wikipedia.org/wiki/Graph_theory#Graph
 * @class Graph
 *
 * @prop {Object} config configuration object for the Graph
 * @prop {boolean} config.enable_matrices whether or not to enable the matrix representations of graphs
 * @prop {boolean} config.directed whether or not to this is a directed graph
 * @prop {number} config.max_size maximum size of the graph only used with enable_matricies to max zero fill the 2d arrays properly
 * @prop {number} config.adjList input adjacency_list to build a graph from
 * @prop {number} config.ewg input edge weighted digraph text representation to build a graph from. deprecated in favor of graphData
 * @prop {boolean} config.reverse_adjacency_lists reverse the order of the adjacency lists
 * @prop {number} config.graphData input text representation to build a graph from
 * @prop {array} adjacency_list the represetation of the same name. a 2d array of which vertices are connected 2 each other
 */
class Graph {
  /**
   * Creates an instance of Graph.
   *
   * So at first I was going to back the graph with each of the four major representations
   * coming from seperate class like objects but then I thought why?
   *
   * Why not just do it all at once and disable the ones I dont plan to use much by default
   * that is what is going on in this constructor here
   *
   * @param {boolean} directed set directed to false unless its explicity set to true
   * @memberof Graph
   */
  constructor({
    enable_matrices = false, // eslint-disable-line camelcase
    directed = false,
    max_size,
    adjList,
    ewg,
    reverse_adjacency_lists,
    graphData,
  } = {}) {
    this.config = {
      enable_matrices,
      directed,
      max_size,
      adjList,
      ewg,
      reverse_adjacency_lists,
      graphData,
    };

    this.directed = this.config.directed;

    this.verts = dsalgo.utils.simpleSet();
    this.edges = dsalgo.utils.simpleSet();

    this.adjacency_list = [];
    this.edge_list = [];

    // the matrices can use ALOT of memory on large graphs
    // so we disable them unless they are explicity enabled
    if (this.config.enable_matrices) {
      if (!this.config.max_size) {
        // without this we couldnt set enough zeros and the represention
        // could end up not properly representing the graph
        throw new Error('You must set a maximum size of graph you want to be able to represent.');
      }

      this.adjacency_matrix = [];
      this.edge_matrix = [];

      const size = this.config.max_size;
      for (let i = 0; i < size; i += 1) {
        this.adjacency_matrix[i] = dsalgo.utils.simpleArrayFill(0, size);
        this.edge_matrix[i] = dsalgo.utils.simpleArrayFill(0, size);
      }
    }

    if (this.config.adjList) {
      this.addFromAdjacencyList(this.config.adjList);
    }

    if (this.config.ewg) {
      this.addFromGraphData(this.config.ewg);
    }

    if (this.config.graphData) {
      this.addFromGraphData(this.config.graphData);
    }
  }

  /**
   * Builds a graph from a text representation of the form used in sedgwick && wayne's algorithms textbook
   *
   * i.e. http://algs4.cs.princeton.edu/44sp/tinyEWD.txt
   *
   * @param {any} txt the text representation of the graph
   * @memberof Graph
   */
  addFromGraphData(txt) {
    const restOfList = txt.trim().split('\n');

    // Get rid of the first 2 lines we dont need because dynamic arrays

    // We never use this becasue my Graph object dynamically computes it
    // but still need to discard it so that the rest of the logic looks at the right lines
    // const num_vertices = restOfList.shift();
    restOfList.shift();

    // We never use this becasue my Graph object dynamically computes it. same as vertices
    // const numEdges = restOfList.shift();
    restOfList.shift();

    restOfList.forEach((line) => {
      // match non white space instead of trying to get rid of white space
      // http://stackoverflow.com/questions/14912502/how-do-i-split-a-string-by-whitespace-and-ignoring-leading-and-trailing-whitespa
      const info = line.match(/\S+/g);
      const from = info[0];
      const to = info[1];

      // NOTE:
      // im (ab)using the fact that this will be undefined in the unwieghted graph depictions
      // so I dont have add an unweighted or weighted flag to the graph object.
      // making a not in case it blows up in my face yet again
      const weight = parseFloat(info[2]);

      const u = dsalgo.utils.makeNumberUnlessNaN(from);
      const v = dsalgo.utils.makeNumberUnlessNaN(to);

      // u aka from and v aka to
      this.addEdge(u, v, weight);
    });

    // Why is this here?
    // because I base a lot of my test cases for my graph algorithms off of the
    // excellent digraph section of the website for sedgwick && wayne's algorithms textbook
    //
    // http://algs4.cs.princeton.edu/42digraph/
    //
    // The digraph object they use [1] depends on another object called a BAG [2]
    //
    // and while techically the ordering of vertices in the adjacency list of a graph is arbitrary that
    // data structure happens to read them off in the opposite order they were added to it
    //
    // so to match their output for testing I added this
    //
    // [1] http://algs4.cs.princeton.edu/42digraph/Digraph.java.html
    // [2] http://algs4.cs.princeton.edu/13stacks/Bag.java.html

    if (this.config.reverse_adjacency_lists) {
      this.adjacency_list.forEach((arr) => {
        arr.reverse();
      });
    }
  }

  /**
   * Go through list and add vertices and edges
   *
   * Doing Object.keys allows us to easily support non integer node names too
   * but we will coerce them into numbers if we can
   * @param {[][]} list the input adjacency_list
   * @memberof Graph
   */
  addFromAdjacencyList(list) {
    Object.keys(list).forEach((from) => {
      const u = dsalgo.utils.makeNumberUnlessNaN(from);

      if (list[from].length === 0) {
        // this is a vertex with no edges connected to it.
        // add it to vertex list but dont connect it anywhere
        this.addVertex(from);
      } else {
        // so here you want to use the actual values in the array and not Object.keys
        // why? because those are the indexes of this array not the values in them
        list[from].forEach((to) => {
          const v = dsalgo.utils.makeNumberUnlessNaN(to);
          // u aka from and v aka to
          this.addEdge(u, v);
        });
      }
    });
  }
  /**
   * Adds a vertex to the graph unless a vertex with the same name exists already
   *
   * Then inits its adjacency_list
   *
   * @param {any} val the name of the input vertex
   * @returns this
   * @memberof Graph
   */
  addVertex(val) {
    this.verts[val] = true;

    // init its adjacency list to empty unless its already there
    if (!dsalgo.utils.isDefined(this.adjacency_list[val])) {
      this.adjacency_list[val] = [];
    }

    return this;
  }

  /**
   * Just used to standardize the string used to deliniate edges
   *
   * defaults to ','
   *
   * i.e. for an edge from 0 to 1
   *
   * "0,1"
   *
   * @static
   * @returns {string}
   * @memberof Graph
   */
  static edgeKeySplitStringFn() {
    return ',';
  }

  /**
   * Returns the text representation used to describe the edge between the from and to vertex
   *
   * i.e. for an edge from 0 to 1
   *
   * "0,1"
   *
   * @param {any} from the originating node of this edge
   * @param {any} to the terminating node of this edge
   * @returns {string}
   * @memberof Graph
   */
  edgeKey(from, to) {
    let keyArr = [from, to];

    if (!this.directed) {
      // if the graph is not a directed graph we will always refer to
      // the vertex with lowest sorted value first
      keyArr = keyArr.sort();
    }

    return keyArr.join(Graph.edgeKeySplitStringFn());
  }

  /**
   * Returns the orginating vertex of the input edgeKey
   *
   * @static
   * @param {string} edgeKey string of edge to get vertex from
   * @returns {any}
   * @memberof Graph
   */
  static edgeKeyVertexFrom(edgeKey) {
    return edgeKey.split(Graph.edgeKeySplitStringFn())[0];
  }

  /**
   * Returns the terminating vertex of the input edgeKey
   *
   * @static
   * @param {string} edgeKey string of edge to get vertex from
   * @returns {any}
   * @memberof Graph
   */
  static edgeKeyVertexTo(edgeKey) {
    return edgeKey.split(Graph.edgeKeySplitStringFn())[1];
  }

  /**
   * Given an input edgeKey and vertex... return the other vertex on this edge
   *
   * @static
   * @param {any} edgeKey input edge
   * @param {any} v input vertex
   * @returns {any}
   * @memberof Graph
   */
  static edgeKeyOtherVertex(edgeKey, v) {
    const u = Graph.edgeKeyVertexFrom(edgeKey);
    const w = Graph.edgeKeyVertexTo(edgeKey);

    // this function used to (ab)use type coersion. its now more sane with an explicit change to a string..
    //
    // but im just leaving the old comment and code cuz it was clever and for nostalgia
    //
    // (ab)using the type coersion because they will be strings coming from the edgeKeyVertex* functions
    // making a note of this in case is blows up in my face
    //
    // if (v == u) return w;
    // if (v == w) return u;

    // convert v to string and check which its equiv to
    const stringV = v.toString();

    if (stringV === u) return w;
    if (stringV === w) return u;

    return false;
  }

  /**
   * Is there an edge between these two verticies?
   *
   * @param {any} from the originating node of this edge
   * @param {any} to the terminating node of this edge
   *
   * @returns
   * @memberof Graph
   */
  edgePresent(from, to) {
    // isDef check is necessary now that edge weights are supported. because in js 0 == false
    return dsalgo.utils.isDefined(this.edges[this.edgeKey(from, to)]);
  }

  /**
   * Used to set the weight of an edge
   *
   * @param {any} from the originating node of this edge
   * @param {any} to the terminating node of this edge
   * @param {number} weight the weight of the vertex
   * @returns this
   * @memberof Graph
   */
  setEdgeWeight(from, to, weight) {
    // support setting edge weights on edges that have already been added to a graph
    if (this.edgePresent(from, to)) {
      this.edges[this.edgeKey(from, to)] = weight;
    }

    return this;
  }

  /**
   * Return the weight of an edge from its key
   *
   * @param {string} key input edgeKey
   * @returns
   * @memberof Graph
   */
  getEdgeWeightByKey(key) {
    const from = Graph.edgeKeyVertexFrom(key);
    const to = Graph.edgeKeyVertexTo(key);

    if (this.edgePresent(from, to)) {
      return this.edges[this.edgeKey(from, to)];
    }

    return undefined;
  }

  /**
   * Return the weight of an edge between 2 verticies
   *
   * @param {any} from the originating node of this edge
   * @param {any} to the terminating node of this edge
   * @returns
   * @memberof Graph
   */
  getEdgeWeight(from, to) {
    // support getting edge weights on edges
    if (this.edgePresent(from, to)) {
      return this.edges[this.edgeKey(from, to)];
    }

    return undefined;
  }

  /**
   * Adds an edge to the graph optionally with weight
   *
   * This function can produce a graph represented in four different ways
   *
   * from here http://bigocheatsheet.com/#graphs
   *
   * - adjacency list
   * - adjacency matrix
   * - edge list
   * - incidence matrix
   *
   * also I later added an edge set to support not making duplicate edges
   *
   * The examples shown inline implementation are based on first graph from here
   *
   * http://en.wikipedia.org/wiki/Incidence_matrix#Undirected_and_directed_graphs
   * http://en.wikipedia.org/wiki/Incidence_matrix#/media/File:Labeled_undirected_graph.svg
   *
   * switched to 0 indexed of course
   *
   * @param {any} from the originating node of this edge
   * @param {any} to the terminating node of this edge
   * @param {number} weight the weight of this edge
   * @param {any} opts options about this edge
   * @param {any} opts.allow_parallel should parallel edges be allowed in this graph
   * @returns this for chaining
   * @memberof Graph
   */
  addEdge(from, to, weight, opts) {
    // in a directed graph an edge from -> to does not imply and edge to -> from
    // updated to account for this

    const options = opts || {
      allow_parallel: false,
    };
    const edgeKey = this.edgeKey(from, to);

    if (!this.directed && !options.allow_parallel && this.edgePresent(from, to)) {
      // quit this whole function so we dont duplicate anything.
      return this;
    }

    // add vertices to the list if they didnt exist already
    this.addVertex(from);
    this.addVertex(to);

    /* i.e
     *   var adjacency_list = [
     *       [1,2,3],
     *       [0],
     *       [0,3],
     *       [0,2]
     *    ];
     * */

    this.adjacency_list[from].push(to);
    if (!this.directed) this.adjacency_list[to].push(from);

    /*
     *  var adjacency_matrix = [
     *     [0,1,1,1],
     *     [1,0,0,0],
     *     [1,0,0,1],
     *     [1,0,1,0]
     *   ];
     * */

    // flip the bits on
    if (this.config.enable_matrices) {
      this.adjacency_matrix[from][to] = 1;
      if (!this.directed) {
        this.adjacency_matrix[to][from] = 1;
      }
    }

    /*
     * var edge_list = [ [0, 1], [0, 2], [0, 3], [2, 3]];
     * */

    // I could add a better flag for this one but I only use along with the matrices
    //
    // Also I could use the edge hash to generate this every time but then its O(n) each time its called
    if (this.config.enable_matrices) {
      this.edge_list.push([from, to]);
    }

    /*
     * Incidence Matrix or what I call an edge matrix
     *
     * row is vertex. column is edge in this representation
     *
     * and remember [row,column] therefore [vertex, edge]
     *
     * var edge_matrix = [
     *     [1,1,1,0],
     *     [1,0,0,0],
     *     [0,1,0,1],
     *     [0,0,1,1]
     *  ];
     *
     * */

    // so you need to know which numbered edge you are working with to make this work
    // there are severals ways to go about knowing that.
    //
    // 1. know all the edges ahead of time and add them in order increasing n by 1 everytime
    // 2. store seperately the number as you go
    // 3, find it out when you add that next.
    //
    // Finding it out when you add the next would require you knowing the length of the largest
    // which is waaaay more computationally expensive than just keeping a count

    if (this.config.enable_matrices) {
      // if you wanted to decouple the representations of edge list and matrix
      // obviously you could use a seperate counter but I never intend to use them seperately
      // so this is fine
      const n = this.edge_list.length - 1;

      // remember arrays are 0 indexed but we already pushed the new edge to
      // edge_list so we need to account for that

      this.edge_matrix[to][n] = 1;
      this.edge_matrix[from][n] = 1;
    }

    /* edge hash for handling duplicates aka graphs that do not support parallel edges
     *
     * to avoid duplicates like [0,1] [1,0] with a set
     *
     * http://www.quora.com/What-are-the-various-approaches-you-can-use-to-build-adjacency-list-representation-of-a-undirected-graph-having-time-complexity-better-than-O-V-*-E-and-avoiding-duplicate-edges
     *
     * here's how we sort the name of the keys by their "string Unicode code points" https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     *
     * then store them as a string key in a set.
     *
     * The value of that key could be the cost of the edge but for now merely stores existance
     *
     * very similar to addEdge from the boost c++ library
     *
     * http://www.boost.org/doc/libs/1_58_0/libs/graph/doc/adjacency_list.html
     *
     * would have liked to link to so similar code in the boost library
     *   but I dont understand C++ well enough to know what the fuck is going on in there lol
     *
     * var edge_set =  {"0,1":true, "0,2":true, "0,3":true, "2,3":true};
     *
     * later updated to support edges having weights
     *
     * ala {"0,1":10}
     *
     * YAY!
     *
     * */

    this.edges[edgeKey] = true;

    if (dsalgo.utils.isDefined(weight)) {
      this.edges[edgeKey] = weight;
    } else if (dsalgo.utils.isDefined(this.config.default_weight)) {
      this.edges[edgeKey] = this.config.default_weight;
    }

    /* final notes:
     *
     * 1. here are some other nifty graph data structures you could use
     *
     * http://en.wikipedia.org/wiki/Sparse_matrix#Yale
     *
     * */

    return this;
  }

  /**
   * Number of vertices adjacent to this vertex with the edge terminating in them
   *
   * https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree
   *
   * Put another way specfically in the context of a directed graph its the number of head ends adjacent to a vertex
   *
   * In the context of an undirected graph in degree == out degree
   *
   * Works by checking this vertex's adjaceny_list to see how many vertices are in it
   *
   * Time Complexity: O(1)
   *
   * Because checking length of an array is constant. If it wasn't obi this would be O(V)
   *
   * @param {any} vert there vertex to check for out degree
   * @returns {number|boolean}
   * @memberof Graph
   */
  vertexOutDegree(vert) {
    if (dsalgo.utils.isDefined(this.verts[vert])) {
      let count = 0;
      if (dsalgo.utils.isDefined(this.adjacency_list[vert])) {
        count = this.adjacency_list[vert].length;
      }
      return count;
    }

    return false;
  }

  /**
   * Number of vertices adjacent to this vertex with the edge terminating in it
   *
   * https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree
   *
   * Put another way specfically in the context of a directed graph its the number of tail ends adjacent to a vertex
   *
   * In the context of an undirected graph in degree == out degree
   *
   * Works by checking every vertex in the graph to see if the input vertex is in their adjacency_list
   *
   * Time Complexity: O(V)
   *
   * @param {any} vert there vertex to check for in degree
   * @returns {number|boolean}
   * @memberof Graph
   */
  vertexInDegree(vert) {
    let count = 0;

    if (dsalgo.utils.isDefined(this.verts[vert])) {
      this.adjacency_list.forEach((currentVertList) => {
        if (currentVertList.indexOf(vert) > -1) count += 1;
      });

      return count;
    }

    return false;
  }

  /**
   * List of the verticies in the graph
   *
   * Time Complexity: O(V)
   *
   * @returns {array}
   * @memberof Graph
   */
  vertexList() {
    return Object.keys(this.verts);
  }

  /**
   * Number of Verticies in the graph
   *
   * Time Complexity: O(V)
   *
   * @returns {number}
   * @memberof Graph
   */
  order() {
    return this.vertexList().length;
  }

  /**
   * List of the edges in the graph
   *
   * Time Complexity: O(E)
   *
   * @returns {array}
   * @memberof Graph
   */
  edgeSetList() {
    return Object.keys(this.edges);
  }

  /**
   * Number of edges in the graph
   *
   * Time Complexity: O(E)
   *
   * @returns {number}
   * @memberof Graph
   */
  size() {
    return this.edgeSetList().length;
  }

  /**
   * Enumerates the vertices in the cycles of a graph
   *
   * @returns {number[][]}
   * @memberof Graph
   */
  cycles() {
    return cycleChecker(this);
  }

  /**
   * If the graph has a cycle or not
   *
   * @returns {boolean}
   * @memberof Graph
   */
  hasCycle() {
    return this.cycles().length !== 0;
  }

  // TODO: when we get to connected components factor this code out into a connected components class and add the dfs version
  // go a little somthing like this
  //
  // update UF notes too

  /*
    this.vertexList().forEach(function(v){

      if (marked[v]) return;

      DFS(ctx, v, marked, function(v,w) {
        component_id[v] = count;
      });

      count++;

    });
   *
   * */

  /**
   * Returns a list of the connected components of this graph
   *
   * based on
   * http://algs4.cs.princeton.edu/41graph/CC.java.html
   *
   * @returns {[][]}
   * @memberof Graph
   */
  components() {
    const uf = new UF(this.order());

    this.edgeSetList().forEach((edgeKey) => {
      let v = Graph.edgeKeyVertexFrom(edgeKey);
      let w = Graph.edgeKeyVertexTo(edgeKey);

      v = dsalgo.utils.makeNumberUnlessNaN(v);
      w = dsalgo.utils.makeNumberUnlessNaN(w);

      uf.union(v, w);
    });

    const compSet = dsalgo.utils.simpleSet();

    // this.vertexList() uses Object.keys interntally
    // and writting too many for loops is soul sucking

    // eslint-disable-next-line no-restricted-syntax
    for (const v in this.vertexList()) {
      if (!dsalgo.utils.isDefined(compSet[uf.find(v)])) compSet[uf.find(v)] = [];
      compSet[uf.find(v)].push(v);
    }

    const components = [];

    // compSet is inited to an empty Object with Object.crete
    // then each component in it is enumerated from the this.vertexList() call
    // which again uses Object.keys interntally
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const comp in compSet) {
      components.push(compSet[comp]);
    }

    return components;
  }

  /**
   * Used to iterate over all of the edges created by each vertex's adjacency_list
   *
   * Useful utility function for reversing a graph
   *
   * @param {any} fn
   * @memberof Graph
   */
  adjacencyListIterator(fn) {
    this.vertexList().forEach((v) => {
      this.adjacency_list[v].forEach((w) => {
        fn(v, w);
      });
    });
  }

  /**
   * Returns copy of this graph that is its reverse
   *
   * Used to compute the strongly connected components in a graph
   *
   * inspire by:
   * http://algs4.cs.princeton.edu/42digraph/Digraph.java.html
   *
   * @param {any} revConf
   * @returns
   * @memberof Graph
   */
  reverse(revConf) {
    // try to use same config as this
    let confCopy = dsalgo.utils.objDeepCopy(this.config);

    // unless you want a different one
    if (dsalgo.utils.isDefined(revConf)) confCopy = revConf;

    // why? we need to add this from the object we've already created and we dont want to duplicate stuff
    if ((!revConf && this.config.adjList) || this.config.graphData) {
      delete confCopy.adjList;
      delete confCopy.graphData;
    }

    const reverse = new Graph(confCopy);

    this.adjacencyListIterator((v, w) => {
      reverse.addEdge(w, v);
    });

    return reverse;
  }
}

// TODO: would also like to add the rest check functionality from here http://algs4.cs.princeton.edu/43mst/KruskalMST.java.html
// to this.
//
// cut check for prim and kruskal
export default Graph;
