// http://en.wikipedia.org/wiki/Graph_theory#Graph
//
// So at first I was going to back the graph with each of the four major representations
// coming from seperate class like objects but then I thought why?
//
// Why not just do it all at once and disable the ones I dont plan to use much by default
// that is what is going on here
var dsalgo = require('../utilities.js').dsalgo;

function Graph(conf) {
  this.config = conf || {enable_matrices: false, directed: false};

  this.directed = this.config.directed;

  // set directed to false unless its explicity set to true
  if(conf && !conf.directed === true) this.config.directed = false;

  this.verts = dsalgo.utils.simpleSet();
  this.edges = dsalgo.utils.simpleSet();
  
  this.adjacency_list = [];
  this.edge_list = [];

  // the matrices can use ALOT of memory
  // so we disable them unless they are explicity enabled

  if(conf && !conf.enable_matrices === true) this.config.enable_matrices = false;

  if(this.config.enable_matrices){

    if(!this.config.max_size) {
      // without this we couldnt set enough zeros and the represention 
      // could end up not properly representing the graph
      throw new Error("You must set a maximum size of graph you want to be able to represent.")
    }

    this.adjacency_matrix = [] ;
    this.edge_matrix = [];

    var size = this.config.max_size;
    for(var i = 0; i < size; i++){
      this.adjacency_matrix[i] = dsalgo.utils.simpleArrayFill(0,size);
      this.edge_matrix[i] = dsalgo.utils.simpleArrayFill(0,size);
    }
  }

  if(this.config.adjList) {
     this.add_from_adjacency_list(this.config.adjList) ;
  }

  if(this.config.ewd) {
     this.add_from_ewd(this.config.ewd);
  }

}

Graph.prototype.add_from_ewd = function(list){
  // i.e. http://algs4.cs.princeton.edu/44sp/tinyEWD.txt
  
  var context = this;
  var rest_of_list = list.trim().split("\n");

  // Get rid of the first 2 lines we dont need because dynamic arrays
  var num_vertices = rest_of_list.shift();
  var num_edges = rest_of_list.shift();

  rest_of_list.forEach(function(line){
    var info = line.split(" ");
    var from = info[0];
    var to = info[1];
    var weight = parseFloat(info[2]);

    var u = dsalgo.utils.makeNumberUnlessNaN(from);
    var v = dsalgo.utils.makeNumberUnlessNaN(to);
    // u aka from and v aka to
    
    context.add_edge(u,v,weight);
  });
}

Graph.prototype.add_from_adjacency_list = function(list){
  // go through list and add vertices and edges
  
  var context = this;

  // doing Object.keys allows us to easily support non integer node names too
  // but we will coerce them into numbers if we can

  Object.keys(list).forEach(function(from){
    var u = dsalgo.utils.makeNumberUnlessNaN(from);

      if(list[from].length === 0) {

        // this is a vertex with no edges connected to it.
        // add it to vertex list but dont connect it anywhere
        context.add_vertex(from);

      } else{

        // so here you want to use the actual values in the array and not Object.keys
        // why? because those are the indexes of this array not the values in them
        list[from].forEach(function(to){
            var v = dsalgo.utils.makeNumberUnlessNaN(to);
            // u aka from and v aka to
            context.add_edge(u,v);
        });
      }
  });
}
 
/// for if you want to add a vertex that is not connected to anything
Graph.prototype.add_vertex = function(val){
  this.verts[val] = true;

  // init its adjacency list to empty unless its already there
  if(!dsalgo.utils.isDefined(this.adjacency_list[val])) this.adjacency_list[val] = [];

  return this;
}

Graph.prototype.edge_key = function(from, to){
  if(this.directed){
    return [from,to].join("");
  }
  return [from,to].sort().join("");
};

Graph.prototype.edge_present = function(from, to){
  // is there an edge between these two?
  //
  // this is necessary now that edge weights are supported. because in js 0 == false
  return dsalgo.utils.isDefined(this.edges[this.edge_key(from,to)]);
};

Graph.prototype.set_edge_weight = function(from, to, weight){
  // support setting edge weights on edges that have already been added to a graph
  if(this.edge_present(from,to)){
    this.edges[this.edge_key(from,to)] = weight;
  } 

  return this;
};

Graph.prototype.get_edge_weight = function(from, to){
  // support setting edge weights on edges that have already been added to a graph
  if(this.edge_present(from,to)){
    return this.edges[this.edge_key(from,to)];
  } 
};

Graph.prototype.add_edge = function(from, to, weight, opts){
  // in a directed graph an edge from -> to does not imply and edge to -> from
  // updated to account for this

  var options = opts  || {allow_parallel: false}
  var edge_key = this.edge_key(from,to);
 
  if (!this.config.directed && !options.allow_parallel && this.edge_present(from,to)){
    // quit this whole function so we dont duplicate anything.
    return this;
  }
  
  // add vertices to the list if they didnt exist already
  this.add_vertex(from);
  this.add_vertex(to);

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
  if(!this.directed) this.adjacency_list[to].push(from);

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
  if(this.config.enable_matrices){
    this.adjacency_matrix[from][to] = 1; 
    if(!this.directed) this.adjacency_matrix[to][from] = 1;
  }

  /*
   * var edge_list = [ [0, 1], [0, 2], [0, 3], [2, 3]];
   *
   * */
 
  this.edge_list.push([from,to]);

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


  if(this.config.enable_matrices){
    // if you wanted to decouple the representations of edge list and matrix
    // obviously you could use a seperate counter but I never intend to use them seperately
    // so this is fine
    var n = this.edge_list.length - 1; 

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
   * very similar to add_edge from the boost c++ library
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

  this.edges[edge_key] = true;
  if(dsalgo.utils.isDefined(weight)) this.edges[edge_key] = weight;

  /* final notes: 
   *
   * 1. here are some other nifty graph data structures you could use
   *
   * http://en.wikipedia.org/wiki/Sparse_matrix#Yale
   *
   * */

  return this;
}

Graph.prototype.vertex_out_degree = function(vert){

  if (dsalgo.utils.isDefined(this.verts[vert])) {
    var count = 0;
    if (dsalgo.utils.isDefined(this.adjacency_list[vert])) {
      count = this.adjacency_list[vert].length;
    }
    return count;
  }

  return  false;
}

Graph.prototype.vertex_in_degree = function(vert) {
  var count = 0;

  if (dsalgo.utils.isDefined(this.verts[vert])) {

    this.adjacency_list.forEach(function(current_vert_list){
      if (current_vert_list.indexOf(vert) > -1) count++;
    });

    return count;
  }

  return  false;
}

Graph.prototype.vertex_list = function(){
  return Object.keys(this.verts);
}

// number of verts
Graph.prototype.order = function(){
  return this.vertex_list().length;
}

// number of edges
Graph.prototype.size = function(){
  return this.edge_list.length;
}

module.exports = Graph;
