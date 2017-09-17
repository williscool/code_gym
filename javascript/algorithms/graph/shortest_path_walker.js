import dsalgo from '../../utilities';

/**
 * Walks shortest paths
 *
 * based on the info object from my graph traversals return
 *
 * Just follows the predecessor chain of a target vertex back to source if possible
 *
 * returns false if not possible
 *
 * Returns information of about the traversal order an cost if possible
 *
 * @param {any} info
 * @param {any} source
 * @param {any} targetVertex
 * @returns {array|boolean}
 */
function shortestPath(info, source, targetVertex) {
  if (!info) throw new Error('dude I need a graph traversal to work with');

  if (!info[targetVertex]) {
    // vertex isn't in the list period so there is no shortest path to it
    return false;
  }

  let currVertInfo = info[targetVertex];
  // need to keep track of the vertex in the list.
  // it wont be at its corresponding index in the array
  //
  // i.e. {vertex:6, distance: "1.51", predecessor: 3}
  //
  // also js is pass by reference so it would mute the orginal info object anyway unless we deep cloned
  // so might as well just embrace that and delete it later

  currVertInfo.vertex = targetVertex;

  const list = [];

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

    const nextVertInfo = info[currVertInfo.predecessor];
    nextVertInfo.vertex = currVertInfo.predecessor;

    currVertInfo = nextVertInfo;
  }

  // if there is no path to source return false
  // just checks if the last vertex we end up at is the source or not
  if (currVertInfo.vertex !== source) return false;

  // reverse our array as it is in backwards order since we added to end of array and not beginning
  list.reverse();

  const pathInfo = dsalgo.utils.simpleSet();

  pathInfo.order = [];

  // unforunately now this will all go to hell if there is a vertex named order
  // but for our academic purposes of just learning how this algorithm works that is ok

  // One could also simply return an object with the satelite data of the traversal in one field
  // and the path of the traversal in another. but again this is just for funsies and to learn so f dat

  list.forEach((val) => {
    const vert = val.vertex;
    // TODO: figure out why this next line in necssary
    delete val.vertex; // eslint-disable-line no-param-reassign

    pathInfo.order.push(vert);
    pathInfo[vert] = val;
  });

  return pathInfo;
}

export default shortestPath;
