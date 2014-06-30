var $table, size;
var prev_row = null;
var prev_course_code = null;
var courses = {};
var depth = {};
var children = {};
var buttons = [];

function tableRowCallback(i, $row){
 	var course = $($row.find("td")[0]).text();
 	var course_sem = $($row.find("td")[1]).text();
 	var course_code = course + course_sem;

 	// &nbsp;
 	if (!(i <= 2) && course !== String.fromCharCode(160)){
 		if (depth[prev_course_code] === 0){
 			prev_row.find("button").remove();
 		} else if (prev_row !== null) {
 			prev_row.find("button").click();
 		}
 		if (i !== size){
 			$row.prepend("<td align='LEFT'><font size='-1'><button onClick='minMax(this)'>-</button></font></td>");


 			$row.attr("id", course_code);
 			prev_row = $row;
 			prev_course_code = course_code;
 			courses[course_code] = 1;
 			depth[course_code] = 0;
 			children[course_code] = [];
 		} else {
 			$row.prepend('<td align="LEFT"><font size="-1">&nbsp;</font></td>');
 		}
 	} else {
 		$row.prepend('<td align="LEFT"><font size="-1">&nbsp;</font></td>');
 		if (prev_course_code !== null){
 			$row.addClass(prev_course_code);
 			depth[prev_course_code] += 1;
 			children[prev_course_code].push($row);
 		}
 		if (i === size){
 			prev_row.find("button").click();
 		}
 	}
}


function minMax(obj){
	var row = obj.parentElement.parentElement.parentElement;

	if (courses[row.id] === 1){
		try {
			$("#" + row.id.slice(0, 8) + "F").find("td")[10].rowSpan -= depth[row.id];
		} catch (TypeError) {
			try {
				$("#" + row.id.slice(0, 8) + "S").find("td")[10].rowSpan -= depth[row.id];
			} catch (TypeError){
				$("#" + row.id.slice(0, 8) + "Y").find("td")[10].rowSpan -= depth[row.id];
			}
		}

		$("." + row.id).hide();
		obj.innerHTML = "+";
		courses[row.id] = 0;
	} else {
		try {
			$("#" + row.id).find("td")[10].rowSpan += depth[row.id];
		} catch (TypeError) {
			//console.log(row.id.slice(0, 8));
			$("#" + row.id.slice(0, 8) + "F").find("td")[10].rowSpan += depth[row.id];
		}
		$("." + row.id).show();
		obj.innerHTML = "-";
		courses[row.id] = 1;
	}
}

function init() {
	// Add a class to the table for styling
	$table = $("table").attr("id", "courses");

	// For each course row... (rows that don't contain a &nbsp; in the first column)
	$("#courses tr:gt(2)").has("font:first:not(:contains('\u00a0'))").each(function (index) {
		tableRowCallback(index, $(this));
	});
}

init();
