// https://www.interviewcake.com/question/ruby/inflight-entertainment
//
// aka 2 sum
//
var dsalgo = require('../utilities.js').dsalgo;

// n log n no extra space solution
function movieFlightTimeMatchSpaceOptimal(flight_length, movie_lengths){

	movie_lengths.sort();
	
	var start = 0, end = movie_lengths.length -1, sum;
	
	while (start != end){
		sum = movie_lengths[start] + movie_lengths[end];
		
		if (sum == flight_length) return true;

		if(sum > flight_length) end-- ;
		if(sum < flight_length) start++;
		
	}
	
	return false;
}

// O(n) with O(n) extra space solution
function movieFlightTimeMatchRunTimeOptimal(flight_length, movie_lengths){
	var hash_of_movie_length_times = {}, matching_second_movie_length, time_one;
		
  for(var i = 0;  i < movie_lengths.length ; i++ ){

    time_one = movie_lengths[i];

		matching_second_movie_length = flight_length - time_one;

		if(dsalgo.utils.isDefined(hash_of_movie_length_times[matching_second_movie_length])) return true;
		
		hash_of_movie_length_times[time_one] = true;
	}
	
	return false;
}

module.exports = {
  run_time_optimized: movieFlightTimeMatchRunTimeOptimal,
  space_optimized: movieFlightTimeMatchSpaceOptimal
};
