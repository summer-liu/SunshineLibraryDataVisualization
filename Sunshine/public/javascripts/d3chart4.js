var width = 400;
var height = 700;
var twidth = width - 25;
var divHeight = height - 60;
var data = studentData;
var columns = ["StudentId","CorrectPercent","Star"];

var outerTable = d3.select("#student_table").append("table").attr("width",width);

    outerTable
		.append("tr")
		.append("td")
        .append("table").attr("class", "headerTable").attr("width", twidth)
        .append("tr").selectAll("th").data(columns).enter()
		.append("th")
		.text(function (column) { return column; })

var inner = outerTable
		.append("tr")
		.append("td")
		.append("div").attr("class", "scroll").attr("width", width).attr("style", "height:" + divHeight + ";")
		.append("table").attr("class", "bodyTable").attr("border", 1).attr("width", twidth).attr("height", height).attr("style", "table-layout:fixed");

    var tbody = inner.append("tbody");
    // Create a row for each object in the data and perform an intial sort.
    var rows = tbody.selectAll("tr").data(data).enter().append("tr");

    // Create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function (d) {
            return columns.map(function (column) {
                return { column: column, text: d.studentId, correct:d.correctPercent , star: d.star}
            });
        }).enter()
        .append("td")
		.text(function (d) {
			if (d.column === columns[0]) return d.text;
			else if (d.column === columns[1]) return d.correct;
				else if (d.column === columns[2]) return d.star;

		});