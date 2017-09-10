import dsalgo from '../utilities';
import UFTypes from '../algorithms/graph/uf';
import cycleCheckerUtils from '../algorithms/graph/cycle_detection';

const UF = UFTypes.weighted_quick_union_with_path_compression;
const cycleChecker = cycleCheckerUtils.dfsish;

/**
 * A object to represent graphs
 *
 * http://en.wikipedia.org/wiki/Graph_theory#Graph
 * @class Graph
 */
class Graph {
  //
  // So at first I was going to back the graph with each of the four major representations
  // coming from seperate class like objects but then I thought why?
  //
  // Why not just do it all at once and disable the ones I dont plan to use much by default
  // that is what is going on here
  constructor(conf) {
    this.config = conf || {
      enable_matrices: false,
      directed: false,
    };

    // set directed to false unless its explicity set to true
    if (conf && !dsalgo.utils.isDefined(conf.directed)) this.config.directed = false;
    this.directed = this.config.directed;

    this.verts = dsalgo.utils.simpleSet();
    this.edges = dsalgo.utils.simpleSet();

    this.adjacency_list = [];
    this.edge_list = [];

    // the matrices can use ALOT of memory
    // so we disable them unless they are explicity enabled

    if (conf && !dsalgo.utils.isDefined(conf.enable_matrices)) this.config.enable_matrices = false;

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

  addFromGraphData(list) {
    // i.e. http://algs4.cs.princeton.edu/44sp/tinyEWD.txt

    const restOfList = list.trim().split('\n');

    // Get rid of the first 2 lines we dont need because dynamic arrays

    // We never use this becasue my Graph object dynamically computes it
    // but still need to discard it so that the rest of the logic looks at the right lines
    // const num_vertices = restOfList.shift();
    restOfList.shift();

    // We never use this becasue my Graph object dynamically computes it. same as vertices
    // const numEdges = restOfList.shift();
    restOfList.shift();

    restOfList.forEach((line) => {
      // match non white space insted of trying to get rid of white space
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
    // so to match their out put I added this
    //
    // [1] http://algs4.cs.princeton.edu/42digraph/Digraph.java.html
    // [2] http://algs4.cs.princeton.edu/13stacks/Bag.java.html

    if (this.config.reverse_adjacency_lists) {
      this.adjacency_list.forEach((arr) => {
        arr.reverse();
      });
    }
  }

  addFromAdjacencyList(list) {
    // go through list and add vertices and edges

    // doing Object.keys allows us to easily support non integer node names too
    // but we will coerce them into numbers if we can

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

  // / for if you want to add a vertex that is not connected to anything
  addVertex(val) {
    this.verts[val] = true;

    // init its adjacency list to empty unless its already there
    if (!dsalgo.utils.isDefined(this.adjacency_list[val])) {
      this.adjacency_list[val] = [];
    }

    return this;
  }

  static edgeKeySplitStringFn() {
    return ',';
  }

  edgeKey(from, to) {
    let keyArr = [from, to];

    if (!this.directed) {
      // if the graph is not a directed graph we will always refer to
      // the vertex with lowest sorted value first
      keyArr = keyArr.sort();
    }

    return keyArr.join(Graph.edgeKeySplitStringFn());
  }

  static edgeKeyVertexFrom(edgeKey) {
    return edgeKey.split(Graph.edgeKeySplitStringFn())[0];
  }

  static edgeKeyVertexTo(edgeKey) {
    return edgeKey.split(Graph.edgeKeySplitStringFn())[1];
  }

  static edgeKeyOtherVertex(edgeKey, v) {
    const u = Graph.edgeKeyVertexFrom(edgeKey);
    const w = Graph.edgeKeyVertexTo(edgeKey);

    // (ab)using the type coersion because they will be strings coming from the edgeKeyVertex* functions
    // making a note of this in case is blows up in my face
    if (v == u) return w;
    if (v == w) return u;

    return false;
  }

  edgePresent(from, to) {
    // is there an edge between these two?
    //
    // this is necessary now that edge weights are supported. because in js 0 == false
    return dsalgo.utils.isDefined(this.edges[this.edgeKey(from, to)]);
  }

  setEdgeWeight(from, to, weight) {
    // support setting edge weights on edges that have already been added to a graph
    if (this.edgePresent(from, to)) {
      this.edges[this.edgeKey(from, to)] = weight;
    }

    return this;
  }

  getEdgeWeightByKey(key) {
    const from = Graph.edgeKeyVertexFrom(key);
    const to = Graph.edgeKeyVertexTo(key);

    if (this.edgePresent(from, to)) {
      return this.edges[this.edgeKey(from, to)];
    }

    return undefined;
  }

  getEdgeWeight(from, to) {
    // support getting edge weights on edges that have already been added to a graph
    if (this.edgePresent(from, to)) {
      return this.edges[this.edgeKey(from, to)];
    }

    return undefined;
  }

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

    // This function can produce a graph represented in four different ways
    //
    // from here http://bigocheatsheet.com/#graphs
    //
    // - adjacency list
    // - adjacency matrix
    // - edge list
    // - incidence matrix
    //
    // also I later added an edge set to support not making duplicate edges
    //
    // The examples below are based on first graph from here
    //
    // http://en.wikipedia.org/wiki/Incidence_matrix#Undirected_and_directed_graphs
    // http://en.wikipedia.org/wiki/Incidence_matrix#/media/File:Labeled_undirected_graph.svg
    //
    // switched to 0 indexed of course

    /* i.e
     *   var adjacency_list = [
     *       [1,2,3],
     *       [0],
     *       [0,3],
     *       [0,2]
     *    ];
     *
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
     *
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
     *
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
     * var edge_set =  {"01":true, "02":true, "03":true, "23":true};
     *
     * later updated to support edges having weights
     *
     * ala {"01":10}
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

  vertexList() {
    return Object.keys(this.verts);
  }

  // number of verts
  order() {
    return this.vertexList().length;
  }

  edgeSetList() {
    return Object.keys(this.edges);
  }

  // number of edges
  size() {
    return this.edgeSetList().length;
  }

  cycles() {
    return cycleChecker(this);
  }

  hasCycle() {
    return this.cycles().length !== 0;
  }


  // TODO: factor this code out into a connected components class and add the dfs versin
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

  components() {
    // based on
    // http://algs4.cs.princeton.edu/41graph/CC.java.html
    const uf = new UF(this.order());

    this.edgeSetList().forEach((edgeKey) => {
      let v = Graph.edgeKeyVertexFrom(edgeKey);
      let w = Graph.edgeKeyVertexTo(edgeKey);

      v = dsalgo.utils.makeNumberUnlessNaN(v);
      w = dsalgo.utils.makeNumberUnlessNaN(w);

      uf.union(v, w);
    });

    const compSet = dsalgo.utils.simpleSet();

    for (const v in this.vertexList()) {
      if (!dsalgo.utils.isDefined(compSet[uf.find(v)])) compSet[uf.find(v)] = [];
      compSet[uf.find(v)].push(v);
    }

    const components = [];

    for (const comp in compSet) {
      components.push(compSet[comp]);
    }

    return components;
  }


  adjacencyListIterator(fn) {
    const ctx = this;

    ctx.vertexList().forEach((v) => {
      ctx.adjacency_list[v].forEach((w) => {
        fn(v, w);
      });
    });
  }

  // http://algs4.cs.princeton.edu/42digraph/Digraph.java.html
  reverse(revConf) {
    // try to use same config as this
    let confCopy = dsalgo.utils.objDeepCopy(this.config);

    // unless you want a differnt one
    if (dsalgo.utils.isDefined(revConf)) confCopy = revConf;

    // why? we need to add this from the object we've already created and we dont want to duplicate stuff
    if (!revConf && this.config.adjList || this.config.graphData) {
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
