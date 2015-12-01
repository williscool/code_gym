var assert = require('assert');
var cartesianProduct = require('../../math/cartesian_product.js');

it("Generate the cartesian_product of sets", function() {
    assert.deepEqual(cartesianProduct([1,2], [10,20]), [[1,10],[1,20],[2,10],[2,20]]);
});
