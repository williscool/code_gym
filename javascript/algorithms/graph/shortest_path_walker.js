// walks calculates shortest paths
// based on the info object my graph traversals return
var dsalgo = require('../../utilities.js').dsalgo;

function shortestPath(info, source, target_vertex) {

  if (!info)
    throw new Error("dude I need a graph traversal to work with");

  if (!info[target_vertex]) {
    // vertex isn't in the list period so there is no shortest path to it
    return false;
  }

  var currVertInfo = info[target_vertex];
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

    var nextVertInfo = info[currVertInfo.predecessor];
    nextVertInfo.vertex = currVertInfo.predecessor;

    currVertInfo = nextVertInfo;
  }

  // if there is no path to source return false
  // just checks if the last vertex we end up at is the source or not
  if (currVertInfo.vertex !== source) return false;

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

module.exports = shortestPath;
