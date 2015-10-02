// https://www.interviewcake.com/question/ruby/find-unique-int-among-duplicates
// crazy xor trick thing
function whichAppearsOnce(list) {
  return list.reduce(function(a,b){ return a ^= b;});
};

module.exports = whichAppearsOnce;
