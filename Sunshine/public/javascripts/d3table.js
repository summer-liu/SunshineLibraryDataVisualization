



d3.json("javascripts/student.json", function(data){
	var width0 ="500px"
	var height0 = "100px";
	var twidth = "475px";
	var divHeight = "450px";

	var columns = ["studentId","correctPercent","star","totalTime"];
	var columnName = ["Student ID", "Correct Percent", "Star", "Duration"];


	var outerTable = d3.select("#student_table").append("table").attr("width",width0)
	outerTable.append("caption").text("Student Report").style("font-weight","bold").style("color","#0088dd").style("font-size","20px")

  var sortCorrectAscending = function (a, b) { return a.correctPercent - b.correctPercent }
  var sortCorrectDescending = function (a, b) { return b.correctPercent - a.correctPercent }
  var sortStarAscending = function (a, b) { return a.star - b.star }
  var sortStarDescending = function (a, b) { return b.star- a.star}
  var sortDurationAscending = function (a, b) { return a.totalTime - b.totalTime }
  var sortDurationDescending = function (a, b) { return b.totalTime - a.totalTime }
  var sortNameAscending = function (a, b) { return a.studentId.localeCompare(b.studentId); }
  var sortNameDescending = function (a, b) { return b.studentId.localeCompare(a.studentId); }
  var Ascending1 = true;
  var Ascending2 = true;
  var Ascending3 = true;
  
  var nameAscending = true;
  var data0=[0,0,0,0,0,0,0,0];
  //var data0=[1,2,3,4,6,4,7,9];

	outerTable
		.append("tr")
		.append("td").attr("padding",0)
        .append("table").attr("class", "headerTable").attr("width",width0).attr("style", "table-layout:fixed")
        .append("tr").selectAll("th").data(columnName).enter()
		.append("th")
		.text(function (column) { return column; })
    .on("click", function (d,i) {
      var sort;
        if (i === 0){
          if (nameAscending) sort = sortNameAscending;
          else sort = sortNameDescending;
          nameAscending = !nameAscending;
        } else if (i === 1){
                    if (Ascending1) sort = sortCorrectAscending;
               else sort = sortCorrectDescending;
               Ascending1 = !Ascending1;

        }else if (i === 2){
                    if (Ascending2) sort = sortStarAscending;
               else sort = sortStarDescending;
               Ascending2 = !Ascending2;

        }else if (i === 3){
                    if (Ascending3) sort = sortDurationAscending;
               else sort = sortDurationDescending;
               Ascending3 = !Ascending3;

        }



      var rows = tbody.selectAll("tr").sort(sort);
    });


    var inner = outerTable
		.append("tr")
		.append("td").attr("padding",0)
		.append("div").attr("class", "scroll").attr("width", width0).attr("height",  divHeight )
		.append("table").attr("class", "bodyTable").attr("width",twidth).attr("height",height0).attr("style", "table-layout:fixed");
    
    var tbody = inner.append("tbody");

    var rows = tbody.selectAll("tr").data(data).enter().append("tr")
                .on("click",update)

    function update (d){
    
      updateBar(d.time,d.problem,d.studentId);

    }

    var cells = rows.selectAll("td")
		    .data(function (row) {
		        return columns.map(function (column) {
		            return { column: column, value:row[column]}
		        });
		    }).enter()
		    .append("td")
			.text(function (d) {
				return d.value;
			});

		var cell_widths = [];
        // get cell widths
        d3.select(rows.node())
            .selectAll('td')
            .each(function(node, i) { cell_widths.push(this.offsetablew); });

        // set cell widths to the header-table
        outerTable.selectAll('.headerTable tr th')
            .data(cell_widths)
            .style('width', function(d) { this.style.width = d + 'px'; return 1; })



    


   // var data0 = [1,2,3,4,5,6,7,8];
  var drawBar = function(){

        var margin = {top: 40, right: 00, bottom: 60, left: 60},
          width = 400 - margin.left - margin.right,
          height = 500- margin.top - margin.bottom;
       
        var x = d3.scale.ordinal().domain([0,1,2,3,4,5,6,7]).rangeRoundBands([0,width],.1);

        var y = d3.scale.linear().domain([0,30]).range([height,0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        var yAxisLeft = d3.svg.axis().scale(y).ticks(10).orient("left");

        var svg = d3.select("#student_bar").append("svg").attr("class","chart5")
          .attr("width", 400)
          .attr("height", 500)
          .attr("x",800)
          .attr("y",0)
          .append("g")
          .attr("class", "graph")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("id","barchartPlot")


        svg.append("g")
          .attr("class","x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("y",30)
          .attr("x",200)
          .style("text-anchor", "start")
          .text("Problem #");

        var bars = svg.selectAll(".barbar").data(data0).enter().append("g").attr("class","barbar")

          bars.append("rect")
          .attr("x", function(d,i) {return x(i);})
          .attr("width", x.rangeBand()*0.8)
          .attr("y", function(d){return y(d);})
          .attr("height",function(d){
            if(d == null) return (height-40);
              return (height - y(d));})
          .attr("fill","#79FC4E")

     bars.append("text")
          .text(function(d){return d})
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) {
                return x(i);
          })
          .attr("y", function(d) {
              return y(d);
          })
          .attr("dx","1em")
          .attr("dy","1em")
          .attr("class", "yAxis")
          .style("font-weight","bold")
          .style("font-size","12px")
          .style("fill","#fff")

  svg.append("text")
    .attr("x", (width + margin.left + margin.right)/2)
    .attr("dx","-20")
    .attr("y", -25)
    .attr("class","title")        
    .attr("text-anchor", "middle")
    .text("Student Activity Duration(s)&Performance")
    .style("font-weight","bold")
    .style("font-size","15px")
    .style("fill","#0000CE")
    ;


    var colorlegend = d3.scale.ordinal().domain(["Introduction Video","Correct","Incorrect","Missing"]).range(["#F206FF","#79FC4E","#FF2626","#000"])
    var legend = svg.selectAll(".legend")
    .data(colorlegend.domain().slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {var moveY = i *30-20; return "translate(-80," + moveY+")"; })

legend.append("rect")
    .attr("x", 30)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", colorlegend);

legend.append("text")
    .attr("x",  50)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d) { return d; });


	};

  drawBar();


  function updateBar(data, colorValue,Id) {
    console.log(data)
    console.log(colorValue)
     var margin = {top: 40, right: 00, bottom: 60, left: 60},
          width = 400 - margin.left - margin.right,
          height = 500- margin.top - margin.bottom;
       
        var x = d3.scale.ordinal().domain([0,1,2,3,4,5,6,7]).rangeRoundBands([0,width],.1);

        var y = d3.scale.linear().domain([0,d3.max(data,function(d){return d})]).range([height,0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        var yAxisLeft = d3.svg.axis().scale(y).ticks(10).orient("left");

        var svg = d3.select("#student_bar svg");
  
        // var bars = d3.select("#barchartPlot").data(data)


        var color = d3.scale.ordinal().domain([-1,0,1]).range(["5757FF","#FF2626","#79FC4E"])
        console.log(color(-1))

        var rect = svg.selectAll(".barbar rect").data(data);

        var text = svg.selectAll(".barbar text").data(data);


          rect.transition().duration(750).attr("x", function(d,i) {return x(i)})
          .attr("width", x.rangeBand()*0.8)
          .attr("y", function(d){
              if(d == null) return 400;
            return y(d);})
          .attr("height",function(d){
              if(d == null) return (8);
              return (height - y(d));})
          .attr("fill",function(d,i){
            if(i === 0) return "#F206FF";
            else return color(colorValue[i-1]);
          })

        // bars.selectAll("text.yAxis")
        // .data(data)
        
        text.transition()
        .duration(750)
         .text(function(d){return d})
        .attr("y",function(d){return y(d);})    
        .attr("class", "yAxis")
        ;


    svg.selectAll("text.title") // target the text element(s) which has a title class defined
      .attr("x", (width + margin.left + margin.right)/2)
      .attr("dx","-20")
      .attr("y", -25)
      .attr("class","title")        
      .attr("text-anchor", "middle")
      .text(Id + "'s Activity Duration(s)&Performance")
    ;


  }
	 // var table = d3.select("#student_table").append("table"),
  //       thead = table.append("thead"),
  //       tbody = table.append("tbody");

  //   // append the header row
  //   thead.append("tr")
  //       .selectAll("th")
  //       .attr("class","headerTable")
  //       .data(columns)
  //       .enter()
  //       .append("th")
  //           .text(function(column) { return column; });

  //   // create a row for each object in the data
  //   var rows = tbody.selectAll("tr")
  //   	.attr("class","scroll")
  //       .data(data)
  //       .enter()
  //       .append("tr");

  //   // create a cell in each row for each column
  //   var cells = rows.selectAll("td")
  //       .data(function(row) {
  //           return columns.map(function(column) {
  //               return {column: column, value: row[column]};
  //           });
  //       })
  //       .enter()
  //       .append("td")
  //       .attr("style", "font-family: Courier") // sets the font style
  //           .html(function(d) { return d.value; });





})