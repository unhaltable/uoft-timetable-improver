var table, size;
var prev_row = null;
var prev_course_code = null;
var courses = {};
var depth = {};
var children = {};
var buttons = [];

function tableRowCallback(i, row){
 	var jrow = $(row);
 	var course = $(jrow.find("td")[0]).text();
 	var course_sem = $(jrow.find("td")[1]).text();
 	var course_code = course + course_sem;

 	if (!(i <= 2) && course !== String.fromCharCode(160)){
 		if (depth[prev_course_code] === 0){
 			prev_row.find("button").remove();
 		} else if (prev_row !== null) {
 			prev_row.find("button").click();
 		}
 		if (i !== size){
 			jrow.prepend("<td align='LEFT'><font size='-1'><button onClick='minMax(this)'>-</button></font></td>");


 			jrow.attr("id", course_code);
 			prev_row = jrow;
 			prev_course_code = course_code;
 			courses[course_code] = 1;
 			depth[course_code] = 0;
 			children[course_code] = [];
 		} else {
 			jrow.prepend('<td align="LEFT"><font size="-1">&nbsp;</font></td>');
 		}
 	} else {
 		jrow.prepend('<td align="LEFT"><font size="-1">&nbsp;</font></td>');
 		if (prev_course_code !== null){
 			jrow.addClass(prev_course_code);
 			depth[prev_course_code] += 1;
 			children[prev_course_code].push(jrow);
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

function init () {
	done = true;
	table = $("table")[0];
	table.id = "courses";
	$("#courses").addClass("table-style");
	var rows = $("#courses tr");
	size = rows.size() - 1;
	rows.each(tableRowCallback);
}

window.onload = init;



