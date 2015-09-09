// http://en.wikipedia.org/wiki/Disjoint-set_data_structure
// http://algs4.cs.princeton.edu/15uf/
var dsalgo = require('../../utilities.js').dsalgo;
var util = require("util");

function quickFindUF(thingy) {

  if (!dsalgo.utils.isDefined(thingy))
    throw new Error("need number of sites or a connections string to properly initalize component_id array");

  var N, connections;

  if (typeof thingy === "number") {
    N = thingy;
  } else {
    connections = thingy;
  }

  // component_id === id from sedgewick and wayne implementation
  this.component_id = [];
  this.count = 0;

  if (N) this.initalize_component_array(N);

  if (connections) this.add_from_text(connections);
}


quickFindUF.prototype.initalize_component_array = function(N) {
  // init empty UF data structure with N isolated components
  for (var i = 0; i < N; i++) this.component_id[i] = i;
  this.count = N;
};

quickFindUF.prototype.validate = function(p) {
  var num_sites = this.component_id.length;
  if (p < 0 || p > num_sites)
    throw new Error("site " + p + " is not a valid site. as it is not between 0 and the number of sites which is " + num_sites);
};

quickFindUF.prototype.find = function(p) {
  // returns the id for the component contanining site p
  this.validate(p);
  return this.component_id[p];
};


quickFindUF.prototype.connected = function(p, q) {
  this.validate(p);
  this.validate(q);
  return this.component_id[p] === this.component_id[q];
};

quickFindUF.prototype.union = function(p, q) {

  if (this.connected(p, q)) return;
  var pid = this.component_id[p];

  for (var i = 0; i < this.component_id.length; i++) {
    if (this.component_id[i] == pid) {
      this.component_id[i] = this.component_id[q];
    }
  }

  this.count = this.count - 1;

  return this;
};

// http://algs4.cs.princeton.edu/15uf/images/quick-union-overview.png
// https://www.youtube.com/watch?v=Il3Ro8yGENE
function quickUnionUF(thingy) {

  // this data structure / algorithm sucks it could devolve both find and union into O(n) very quickly for densely connected components if a connection tree gets large
  // probably useful to keep a seperate data structure with the roots of trees so you can access those in constant time
  // but fine for our academic purposes

  if (!dsalgo.utils.isDefined(thingy))
    throw new Error("need number of sites or a connections string to properly initalize parent array");

  var N, connections;

  if (typeof thingy === "number") {
    N = thingy;
  } else {
    connections = thingy;
  }

  this.parent = [];
  if (N) this.initalize_component_array(N);
  if (connections) this.add_from_text(connections);
}

quickUnionUF.prototype.initalize_component_array = function(N) {
  // init empty UF data structure with N isolated components
  for (var i = 0; i < N; i++) this.parent[i] = i;
  this.count = N;
};

quickUnionUF.prototype.validate = function(p) {
  var num_sites = this.parent.length;
  if (p < 0 || p > num_sites)
    throw new Error("site " + p + " is not a valid site. as it is not between 0 and the number of sites which is " + num_sites);
};

quickUnionUF.prototype.find = function(p) {
  // returns the id for the component contanining site p
  // obviously O(n)

  this.validate(p);
  while (p != this.parent[p]) {
    p = this.parent[p];
  }

  return p;
};


quickUnionUF.prototype.connected = function(p, q) {
  return this.find(p) === this.find(q);
};

quickUnionUF.prototype.union = function(p, q) {

  var rootP = this.find(p);
  var rootQ = this.find(q);

  if (rootP === rootQ) return;

  this.parent[rootP] = rootQ;

  this.count = this.count - 1;
  return this;
};

function weightedQuickUnionUF(thingy) {

  if (!dsalgo.utils.isDefined(thingy))
    throw new Error("need number of sites or a connections string to properly initalize parent array");

  var N, connections;

  if (typeof thingy === "number") {
    N = thingy;
  } else {
    connections = thingy;
  }

  this.parent = [];
  this.size = [];
  if (N) this.initalize_component_array(N);
  if (connections) this.add_from_text(connections);
}

util.inherits(weightedQuickUnionUF, quickUnionUF);

weightedQuickUnionUF.prototype.initalize_component_array = function(N) {
  // init empty UF data structure with N isolated components
  for (var i = 0; i < N; i++) {
    this.parent[i] = i;
    this.size[i] = i;
  }
  this.count = N;
};

// https://www.youtube.com/watch?v=R45MPl59MC0
weightedQuickUnionUF.prototype.union = function(p, q) {

  var rootP = this.find(p);
  var rootQ = this.find(q);

  if (rootP === rootQ) return;

  if (this.size[rootP] < this.size[rootQ]) {

    this.parent[rootP] = rootQ;
    this.size[rootQ] = this.size[rootQ] + this.size[rootP];

  } else {

    this.parent[rootQ] = rootP;
    this.size[rootP] = this.size[rootP] + this.size[rootQ];
  }

  this.count = this.count - 1;
  return this;
};

function weightedQuickUnionPathCompressionUF(thingy) {
  // https://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor
  weightedQuickUnionUF.call(this, thingy);
}

util.inherits(weightedQuickUnionPathCompressionUF, weightedQuickUnionUF);

weightedQuickUnionPathCompressionUF.prototype.find = function(p) {
  this.validate(p);
  // look for root start at the site we are given
  var root = p;
  while (root != this.parent[root]) {
    root = this.parent[root];
  }

  // take all the other nodes along the path and connect them to the root of the tree
  while (p != root) {
    var newP = this.parent[p];
    this.parent[p] = root;
    p = newP;
  }

  return root;
};

function weightedQuickUnionPathHalvingUF(thingy) {
  // https://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor
  weightedQuickUnionUF.call(this, thingy);
}

util.inherits(weightedQuickUnionPathHalvingUF, weightedQuickUnionUF);

weightedQuickUnionPathHalvingUF.prototype.find = function(p) {
  this.validate(p);

  // this version makes each node in the tree point to its grandparent
  while (p != this.parent[p]) {
    this.parent[p] = this.parent[this.parent[p]];
    p = this.parent[p];
  }

  return p;
};

var add_site_from_text = function(list) {
  // i.e. http://algs4.cs.princeton.edu/15uf/tinyUF.txt

  var context = this;
  var rest_of_list = list.trim().split("\n");

  var num_sites = rest_of_list.shift();

  this.initalize_component_array(num_sites);

  rest_of_list.forEach(function(line) {
    var info = line.split(" ");
    var p = dsalgo.utils.makeNumberUnlessNaN(info[0]);
    var q = dsalgo.utils.makeNumberUnlessNaN(info[1]);

    if (context.connected(p, q)) return; // return === continue in a js forEach

    context.union(p, q);
  });
};

quickFindUF.prototype.add_from_text = add_site_from_text;
quickUnionUF.prototype.add_from_text = add_site_from_text;
weightedQuickUnionUF.prototype.add_from_text = add_site_from_text;
weightedQuickUnionPathCompressionUF.prototype.add_from_text = add_site_from_text;
weightedQuickUnionPathHalvingUF.prototype.add_from_text = add_site_from_text;

module.exports = {
  quick_find: quickFindUF,
  quick_union: quickUnionUF,
  weighted_quick_union: weightedQuickUnionUF,
  weighted_quick_union_with_path_compression: weightedQuickUnionPathCompressionUF,
  weighted_quick_union_with_path_halving: weightedQuickUnionPathHalvingUF
};
