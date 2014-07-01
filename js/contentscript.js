// Add a class to the table for styling
$table = $("table").attr("id", "courses");

// Keep a reference to the set of all rows
var $allRows = $("#courses tr");

// For each course row... (rows that don't contain a &nbsp; in the first column)
var $courseRows = $allRows.slice(3).has("font:first:not(:contains('\u00a0'))");

// Add a class to the course rows
$courseRows.addClass("course-row");

// Add a button before each course row to expand/collapse the section rows
$("<td align='LEFT'><font size='-1'><button>-</button></font></td>")
    .prependTo($courseRows)
    .find("button").click(function () {
        var $button = $(this);
        var $row = $button.parents("tr");

        // Toggle visibility of course section rows
        $row.nextUntil("tr.course-row").toggle();

        // Change the button text
        $button.text(function (index, oldText) {
            return oldText === '-' ? '+' : '-';
        });
    });

// Add a blank cell before each rows that doesn't have a button
$allRows.not($courseRows).prepend('<td align="LEFT"><font size="-1">&nbsp;</font></td>')
