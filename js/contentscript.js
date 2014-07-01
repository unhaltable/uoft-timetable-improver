// Add an ID to the table
var $table = $('table:first').attr('id', 'courses');

// Keep a reference to the set of all rows
var $allRows = $table.find('tr');

// Course rows (rows that contain a course code)
var $courseRows = $allRows.slice(3).has('font:first:not(:contains("\u00a0"))');

// Add a class to the course rows
$courseRows.addClass('course-row');

// Find courses with multiple sections
var $courseRowsCollapsable = $courseRows.filter(function () {
    // Row is collapsable if the next row has a &nbsp; in the first column
    return $(this).next().has('font:first:contains("\u00a0")').length > 0
});

// Add a button before each course row to expand/collapse the section rows
$('<td align="LEFT"><font size="-1"><button>-</button></font></td>')
  .prependTo($courseRowsCollapsable)
  .find('button').click(function() {
    var $button = $(this);
    var $row = $button.closest('tr');

    // Store the old rowspan and shrink the last cell to take up one row
    var $lastCell = $row.find('td:last');
    var newRowSpan = $lastCell.data('rowspan') || 1;
    $lastCell.data('rowspan', $lastCell.attr('rowspan'));
    $lastCell.attr('rowspan', newRowSpan);

    // Toggle visibility of course section rows
    $row.nextUntil('tr.course-row').toggle();

    // Change the button text
    $button.text(function(index, oldText) {
      return oldText === '-' ? '+' : '-';
    });
  }).click();

// Add a blank cell before each rows that doesn't have a button
$allRows.not($courseRowsCollapsable).prepend('<td align="LEFT"><font size="-1">&nbsp;</font></td>');

