import StackTypes from '../../data_structures/stack';
import dsalgo from '../../utilities';

const Stack = StackTypes.array;

/**
 * Iterative version of DFS
 *
 * Very similar to BFS but uses a stack instead of a queue
 *
 * From wikipedia Pseudocode:
 *
 *  1  procedure DFS-iterative(G,v):
 *  2    let S be a stack
 *  3    S.push(v)
 *  4    while S is not empty
 *  5        v = S.pop()
 *  6        if v is not labeled as discovered:
 *  7            label v as discovered
 *  8            for all edges from v to w in G.adjacentEdges(v) do
 *  9                S.push(w)
 *
 * @param {Graph} graph input graph to tranverse
 * @param {any} startVertex vertex to start the traversal from
 * @returns {array} Array of objects describing each vertex, like
 *     [{distance: _, predecessor: _ }]
 */
function iterative(graph, startVertex) {
  if (graph.order() < 1) throw new Error("come on dog there's no nodes in this graph.");

  let visiting = 0;
  const info = [];

  for (let i = 0; i < graph.order(); i += 1) {
    info[i] = {
      distance: null,
      predecessor: null,
      visitedOrder: null,
      isVisited: false,
    };
  }

  info[startVertex] = {
    distance: 0,
    predecessor: null,
    visitedOrder: visiting,
    isVisited: false,
  };

  const stack = new Stack();

  stack.push(startVertex);

  while (!stack.isEmpty()) {
    const v = stack.pop();

    if (info[v].isVisited === false) {
      info[v].isVisited = true;
      visiting += 1;
      info[v].visitedOrder = visiting;

      // so this takes some explaining we add the adjacent nodes in reverse order why?
      // so that the left most node is at the top of the stack

      for (let j = graph.adjacency_list[v].length - 1; j >= 0; j -= 1) {
        const w = graph.adjacency_list[v][j];

        if (info[w].isVisited === false) {
          info[w].distance = info[v].distance + 1;
          info[w].predecessor = v;
          stack.push(w);
        }
      }
    }
  }

  return info;
}

/**
 * Recursive version of DFS
 *
 * From the wikipedia Pseudocode:
 *
 * 1  procedure DFS(G,v):
 * 2    label v as discovered
 * 3    for all edges from v to w in G.adjacentEdges(v) do
 * 4        if vertex w is not labeled as discovered then
 * 5            recursively call DFS(G,w)
 *
 * inspired by
 * https://github.com/adlawson/search-algorithms/blob/master/javascript/dfs.js
 *
 * @param {Graph} graph input graph to tranverse
 * @param {any} v the current vertex being visited
 * @param {Object} visited a set to mark all of the visited nodes
 * @param {any} fn function to call when a vertex is visited
 * @param {string} order order to traver graph in. must be in, post, or pre order
 */
function recursive(graph, v, visited, fn, order = 'in') {
  const DFS = recursive;
  const altOrder = (order !== 'in');
  let w;

  if (graph.order() < 1) throw new Error("come on dog there's no nodes in this graph.");

  // necessary to use the input visted set to know which overall nodes have been visited in all stack frames
  // eslint-disable-next-line no-param-reassign
  visited[v] = true;

  if (altOrder && order === 'pre') fn(v, w);

  for (let i = 0; i <= graph.adjacency_list[v].length - 1; i += 1) {
    w = graph.adjacency_list[v][i];

    if (visited[w] !== true) {
      if (!altOrder) fn(v, w);
      DFS(graph, w, visited, fn, order);
    }
  }

  if (altOrder && order === 'post') fn(v, w);
}

/**
 * Because of the recursive calls in the recursive version of DFS
 *
 * if you try to return the traversal info the DFS will exit too early
 *
 * and you wont be able to observe all of the verticies being visited
 *
 * This function works by passing a function to recursive DFS and having it called on each visitation
 *
 * To allow you to examine the order verticies were visited in
 *
 * @param {Graph} graph input graph to tranverse
 * @param {any} startVertex from which to start graph traversal
 * @returns {array} Array of objects describing each vertex, like
 *     [{distance: _, predecessor: _ }]
 */
function recursiveInfo(graph, startVertex) {
  const info = [];
  for (let i = 0; i < graph.order(); i += 1) {
    info[i] = {
      distance: null,
      predecessor: null,
      visitedOrder: null,
      isVisited: false,
    };
  }

  let visiting = 1;

  info[startVertex] = {
    distance: 0,
    predecessor: null,
    visitedOrder: visiting,
    isVisited: true,
  };

  const DFS = recursive;

  DFS(graph, startVertex, dsalgo.utils.simpleSet(), (v, w) => {
    visiting += 1;
    info[w] = {
      distance: info[v].distance + 1,
      predecessor: v,
      visitedOrder: visiting,
      isVisited: true,
    };
  });

  return info;
}

/**
 * This function is similar to recursiveInfo
 *
 * but builds an array with the traversal order of the nodes in the graph at each visitation
 *
 * @param {any} graph input graph
 * @param {any} orderName order type to traverse the graph in
 * @returns {array} array of verts in graph traversal order
 */
function recursivetoArray(graph, orderName) {
  const DFS = recursive;
  const order = [];
  const marked = dsalgo.utils.simpleSet();

  graph.vertexList().forEach((vLabel) => {
    const vertexLabel = dsalgo.utils.makeNumberUnlessNaN(vLabel);

    if (marked[vertexLabel]) return;

    DFS(graph, vertexLabel, marked, (v) => {
      order.push(v);
    }, orderName);
  });

  return order;
}

/**
 * http://en.wikipedia.org/wiki/Depth-first_search
 *
 * Depth first search implementations
 * @module DFS
 */
export default {
  iterative,
  recursive,
  recursive_info: recursiveInfo,
  recursive_to_array: recursivetoArray,
};
