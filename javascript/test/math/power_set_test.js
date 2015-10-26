var assert = require('assert');
var power_set = require('../../math/power_set.js');

it("Generate all subsets of a Set/Array aka the power set", function() {
    var expectedResult = [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3],[4],[1,4],[2,4],[1,2,4],[3,4],[1,3,4],[2,3,4],[1,2,3,4]];
    //console.log(power_set([1,2,3,4]))
    assert.deepEqual(power_set([1,2,3,4]), expectedResult);
});
