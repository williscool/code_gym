// https://www.interviewcake.com/question/merging-ranges
var dsalgo = require('../utilities.js').default;

function MergingMeetings(list) {
  // sort the list and break ties with the ending time
  list.sort(function(a,b){
    if (a[0] != b[0]) return  a[0] > b[0];
    return  a[1] > b[1];
  });

  var merged_meetings = [];

  var currently_merging_meeting_arr = null;

  list.forEach(function(meeting_arr, i){

    // it will get compared with itself one time but who cares?
    if(currently_merging_meeting_arr === null) currently_merging_meeting_arr = meeting_arr;

    // beginning = 0, end = 1
    // 1. if new meeting begins exactly as meeting we are checking ends
    // 2. new meeting begins before meeting we are checking ends

    if( currently_merging_meeting_arr[1] >= meeting_arr[0]) {
      // check to see if it ends later and use its end time now
      if (currently_merging_meeting_arr[1] < meeting_arr[1]) {
        currently_merging_meeting_arr[1] = meeting_arr[1];
      }
    } else {
      merged_meetings.push(currently_merging_meeting_arr);
      currently_merging_meeting_arr = meeting_arr;
    }


  });

  merged_meetings.push(currently_merging_meeting_arr);
  return merged_meetings;
};

module.exports = MergingMeetings;
