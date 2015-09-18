// https://www.interviewcake.com/question/ruby/rectangular-love

function rectangularLoveIntersectionBaby(a,b) {

	var a_end_x, a_end_y, 
		b_end_x, b_end_y, 
		x_highest_starting_point, x_lowest_end_point,
		y_highest_starting_point, y_lowest_end_point,
		intersection_rectangle = {};
	
	var a_end_y = a.y + a.height;
	var b_end_y = b.y + b.height;
	
	var a_end_x = a.x + a.width;
	var b_end_x = b.x + b.width;
		
	intersection_rectangle.x = 0; intersection_rectangle.width = 0;	
	
	intersection_rectangle.y = 0;	intersection_rectangle.height = 0;
	
	var xResultArr = find_overlap_1d(a.x, a_end_x, b.x, b_end_x);
	var yResultArr = find_overlap_1d(a.y, a_end_y, b.y, b_end_y);
	
	x_highest_starting_point = xResultArr[0]; x_lowest_end_point = xResultArr[1];
	
	if(x_lowest_end_point - x_highest_starting_point >= 0) {
		intersection_rectangle.x = x_highest_starting_point ;
		intersection_rectangle.width = x_lowest_end_point - x_highest_starting_point;
	}

	y_highest_starting_point = yResultArr[0]; y_lowest_end_point = yResultArr[1];
	
	if(y_lowest_end_point - y_highest_starting_point >= 0) {
		intersection_rectangle.y = y_highest_starting_point;
		intersection_rectangle.height = y_lowest_end_point - y_highest_starting_point;
	}
	
  debugger;
	if (intersection_rectangle.height === 0 && intersection_rectangle.height === 0) return false;
	
	return intersection_rectangle;
}

function find_overlap_1d(startA, endA, startB, endB) {
	var highest_starting_point, lowest_end_point;
	
	highest_starting_point = startA;
	if (startB > startA) highest_starting_point = startB;

	lowest_end_point = endA;
	if (endB < endA) lowest_end_point = endB;
	
  debugger;
	return [highest_starting_point, lowest_end_point];
}

module.exports = rectangularLoveIntersectionBaby;
