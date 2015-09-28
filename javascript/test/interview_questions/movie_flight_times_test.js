var assert = require('assert');
var MovieFlightTimesMatch = require('../../interview_questions/movie_flight_times.js');

Object.keys(MovieFlightTimesMatch).forEach(function(key) {
  var fn = MovieFlightTimesMatch[key];

  var movieFlightTime = fn;

  describe(key + ' Movie Flight Match aka 2 Sum', function() {
    it('should work with arrays', function() {
      assert.deepEqual( movieFlightTime(10, [1,7,3,4]), true);
    });
  });
});
