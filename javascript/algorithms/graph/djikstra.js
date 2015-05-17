// http://en.wikipedia.org/wiki/Dijkstra's_algorithm
// http://algs4.cs.princeton.edu/44sp/

var dsalgo = require('../../utilities.js').dsalgo;

var naiveDijkstra = function (graph, start_vertex, target_vertex) {
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
  // is actually the same operation as a priority quene but it is a naive and unoptimized one
  // being that it is always going to look for the shortest distance in the queue
  
  if (graph.order() < 1) return Error("come on dog there's no nodes in this graph.")

  var info = [];
  var queueSet = dsalgo.utils.simpleSet();

  info[start_vertex] = {distance: 0, predecessor:null};

  for(var i = 0; i < graph.order() ; i++) {
    if(i != start_vertex ){
      info[i] = {distance: Number.POSITIVE_INFINITY, predecessor:null};
    } 
    
    queueSet[i] = true;
  }

  var findMinIndex = function(array, vertexHash){

    var lowest = Number.POSITIVE_INFINITY;
    var index = -1;

    array.forEach(function(val, i){
      // if this vertex has not been visited and the distance is the new lowest
      if(vertexHash[i] === true && (val.distance < lowest)){
        index = i; 
        lowest = val.distance;
      } 
    })

    if(index == -1){
      // this means everything else was pos infinity. just return the next vertex in the set
      //return Object.keys(vertexHash)[0];
      throw new Error("index set to negative one in findMinIndex. This should not happen!")
    }

    return index;
  };

  while(Object.keys(queueSet).length > 0) {

   // fun fact that is TERRIBLY (that is not at all) explained in wikipedia article
   //
   // at the first iteration of this function after you've added everything to the quene 
   // the distance in the distance info array of all the verticies is POSITIVE_INFINITY
   //
   // EXCEPT ONE which is our source vertex.
   // 
   // So which vertex does this loop start with?... of course its the source
   //
   // (I later noticed its mentioned in a comment beside the pseudocode on that line but still not well explained lol)

   // u starts at the source vertex
   var min_index = findMinIndex(info,queueSet);
   var u = min_index;

   // this is due to another thing that is TERRIBLY explained in the wiki article
   // on subsequent iterations you dont want to reconsider this vertex again
   delete queueSet[min_index];
  
    for(var i = 0; i < graph.adjacency_list[u].length ; i++){
        var v = graph.adjacency_list[u][i];
        var alt = info[u].distance + graph.get_edge_weight(u,v);

        if(alt < info[v].distance){
            
            info[v].distance = alt;
            info[v].predecessor = u;
        }
        
    } 

  }

  this.info = info;
};

var shortestPath = function(target_vertex) {

  if(!this.info) throw new Error("dude I need a graph traversal to work with");

   if(!this.info[target_vertex]){
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

   while(currVertInfo) {

     list.push(currVertInfo); 

     // need this break for the case of having added the source who has no predecessor
     //
     // ahem. in js 0 == false so if zero is a vertex 
     // that can be checked that could fuck things up with out a proper defined check
     
     if(currVertInfo.predecessor === null) break;

     var nextVertInfo = this.info[currVertInfo.predecessor];
     nextVertInfo.vertex = currVertInfo.predecessor;

     currVertInfo = nextVertInfo;
   }

   // if there is no path to source return false
   // just checks if the last vertex we end up at is the source or not
   if(currVertInfo.vertex !== this.source) return false;

   // reverse our array as it is in backwards order since we added to end of array and not beginning
   list.reverse();

   var path_info = dsalgo.utils.simpleSet();

   path_info.order = [];

   // unforunately now this will all go to hell if there is a vertex named order 
   // but for our academic purposes of just learning how this algorithm works that is ok
   list.forEach(function(val){
      var vert = val.vertex;
      delete val.vertex;
      path_info.order.push(vert);
      path_info[vert] = val;
   });

   return path_info;
}

naiveDijkstra.prototype.shortest_path = shortestPath;

module.exports.naive = naiveDijkstra;
