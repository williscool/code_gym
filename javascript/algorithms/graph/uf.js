// http://en.wikipedia.org/wiki/Disjoint-set_data_structure
// http://algs4.cs.princeton.edu/15uf/
var dsalgo = require('../../utilities.js').dsalgo;

function quickFindUF(thingy) {

  if(!dsalgo.utils.isDefined(thingy)) throw new Error("need number of sites or a connections string to properly initalize component_id array");

  var N,connections;

  if(typeof thingy === "number"){
    N = thingy;
  } else {
    connections = thingy; 
  }

  // component_id === id from sedgewick and wayne implementation
  this.component_id = [];
  this.count = 0;

  if(N) this.initalize_component_array(N);

  if(connections) this.add_from_text(connections);
}


quickFindUF.prototype.initalize_component_array = function(N){
  // init empty UF data structure with N isolated components
  for(var i=0; i < N; i++) this.component_id[i] = i;
  this.count = N;
}

quickFindUF.prototype.validate = function(p){
  var num_sites = this.component_id.length;
  if(p < 0 || p > num_sites) throw new Error("site " + p + " is not a valid site. as it is not between 0 and the number of sites which is " + num_sites);
}

quickFindUF.prototype.find = function(p){
  // returns the id for the component contanining site p
  this.validate(p);
  return this.component_id[p];
}


quickFindUF.prototype.connected = function(p,q){
  this.validate(p);
  this.validate(q);
  return this.component_id[p] === this.component_id[q];
}

quickFindUF.prototype.union = function(p,q){

  if(this.connected(p,q)) return;
  var pid = this.component_id[p];

  for(var i = 0; i < this.component_id.length; i++) {
    if(this.component_id[i] == pid){
      this.component_id[i] = this.component_id[q];
    } 
  }
  
  this.count = this.count - 1;

  return this;
}

quickFindUF.prototype.add_from_text = function(list){
  // i.e. http://algs4.cs.princeton.edu/15uf/tinyUF.txt
  
  var context = this;
  var rest_of_list = list.trim().split("\n");

  var num_sites = rest_of_list.shift();

  this.initalize_component_array(num_sites);

  rest_of_list.forEach(function(line){
    var info = line.split(" ");
    var p = dsalgo.utils.makeNumberUnlessNaN(info[0]);
    var q = dsalgo.utils.makeNumberUnlessNaN(info[1]);

    if (context.connected(p,q)) return; // return === continue in a js forEach

    context.union(p,q);
  });
}


module.exports = {
  quick_find: quickFindUF 
}
