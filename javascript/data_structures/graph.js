// http://en.wikipedia.org/wiki/Graph_theory#Graph
//
// So at first I was going to back the graph with each of the four major representations
// coming from seperate class like objects but then I thought why?
//
// Why not just do it all at once and disable the ones I dont plan to use much by default
// that is what is going on here
var dsalgo = require('../utilities.js').dsalgo;

function Graph(conf) {
  this.config = conf || {enable_matrices: false}; // will add disable flags here later

  // ghetto set http://stackoverflow.com/a/18890005/511710
  this.verts = Object.create(null);
  this.edges = Object.create(null);
  
  this.adjacency_list = [];
  this.edge_list = [];

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

  // TODO: support adj list in the constructor as well

}

Graph.prototype.build_from_adjacency_list = function(list){
  // travese list and call add_edge for each

}
 
/// for if you want to add a vertex that is not connected to anything
Graph.prototype.add_vertex = function(val){
  this.verts[val] = true;
}

// TODO: avoid duplicates like [0,1] [1,0] with a set
//
// http://www.quora.com/What-are-the-various-approaches-you-can-use-to-build-adjacency-list-representation-of-a-undirected-graph-having-time-complexity-better-than-O-V-*-E-and-avoiding-duplicate-edges
// http://stackoverflow.com/a/18890005/511710
// https://github.com/mbostock/d3/blob/master/src/arrays/set.js#L10

Graph.prototype.add_edge = function(from, to){
 
  // add vertices to the list if they didnt exist already
  this.verts[from] = true;
  this.verts[to] = true;

  // init all our lists if they aren't defined up here so the rest of the code reads cleaner;
  if(!dsalgo.utils.isDefined(this.adjacency_list[from])) this.adjacency_list[from] = [];
  if(!dsalgo.utils.isDefined(this.adjacency_list[to])) this.adjacency_list[to] = [];

  // This function can produce a graph represented in four different ways
  //
  // from here http://bigocheatsheet.com/#graphs
  //
  // - adjacency list 
  // - adjacency matrix
  // - edge list
  // - incidence matrix
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
  this.adjacency_list[to].push(from);

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
    this.adjacency_matrix[to][from] = 1;
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

  /* final notes: 
   *
   * 1. this version does not support edges having a cost. 
   *
   * here's how I would do that though. I would sort the name of the keys by their utf-8 order
   * then store them as a string key in a set. The value of that key would be the cost of the edge
   *
   * 2. here are some other nifty graph data structures you could use
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
