var assert = require('assert');
var iterativeUnboundedKnapsack = require('../../interview_questions/cake_theif.js')

describe("Cake Theif Question aka the Unbounded Knapsack Problem", function() {

    it("works", function() {
      var items, capacity;

      items = [[1,30],[50, 200]];
      capacity = 100;

      assert.equal(iterativeUnboundedKnapsack(items, capacity), 3000);

      items = [[3,40],[5, 70]];
      capacity = 9;

      assert.equal(iterativeUnboundedKnapsack(items, capacity), 120);
    });

});
