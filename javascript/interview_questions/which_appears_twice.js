// https://www.interviewcake.com/question/ruby/which-appears-twice
function whichAppearsTwice(list) {

  var n = list.length - 1;

  // https://www.interviewcake.com/concept/ruby/triangular-series
  var sum_of_all_ints_from_1_to_n = (Math.pow(n,2) + n ) / 2
  
  return list.reduce(function(a,b){ return a + b;}) - sum_of_all_ints_from_1_to_n;
};

module.exports = whichAppearsTwice;
