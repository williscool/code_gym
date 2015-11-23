var assert = require('assert');
var dsalgo = require('../../../utilities.js').dsalgo;
var pPathFns = require('../../../algorithms/dynamic_programming/plentiful_paths.js');

var appleLocations = dsalgo.utils.multilineString(function() {
/*!
4 4
2 1
2 3
3 3
3 4
4 2
4 4
0 0
*/
});

function setupAppleArray(locations){

  var rest_of_list = locations.trim().split("\n");

  var MxNstring = rest_of_list.shift().trim().split(" ");

  var M = parseInt(MxNstring[0]);
  var N = parseInt(MxNstring[1]);

  var array = dsalgo.utils.create2Darray(N + 1);

  // Get rid of the last line we dont need because dynamic arrays
  var end_of_input = rest_of_list.pop();

  rest_of_list.forEach(function(line) {
    var info = line.split(" ");

    var m = dsalgo.utils.makeNumberUnlessNaN(info[0]);
    var n = dsalgo.utils.makeNumberUnlessNaN(info[1]);

    array[m][n] = 1;
  });

  return [array,M,N];
}

Object.keys(pPathFns).forEach(function(key) {
  it(key +  " Plentiful Paths", function() {
    var pPaths = pPathFns[key];

    var setup = setupAppleArray(appleLocations);

    var A =  setup[0];
    var m =  setup[1];
    var n =  setup[2];

    // console.log(setup)
    // console.log(A,m,n)
    assert.deepEqual(pPaths(A,m,n), 5 );
  });
});
