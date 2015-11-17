var assert = require('assert');
var RCfns = require('../../../algorithms/dynamic_programming/rod_cutting.js');

Object.keys(RCfns).forEach(function(key) {
  it(key +  " Rod Cutting Problem", function() {
    var rodCutting = RCfns[key];
    assert.deepEqual(rodCutting([1, 5, 8, 9, 10, 17, 17, 20]), 22 );
    assert.deepEqual(rodCutting([0,1, 5, 8, 9, 10, 17, 17, 20, 24, 30]), 30 );
  });
});
