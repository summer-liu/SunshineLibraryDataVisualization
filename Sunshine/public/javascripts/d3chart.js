var data = [accuracy,time];

var margin = {top: 30, right: 80, bottom: 80, left: 200 },
	width = 700 - margin.left - margin.right,
	height = 350 - margin.top - margin.bottom;

var x = d3.scale.ordinal().domain([1,2,3,4,5,6,7]).rangeRoundBands([0,width],.1);

var y0 = d3.scale.linear().domain([0,1.2*d3.max(data,function(d){return d[0];})]).range([height,0]),
	y1 = d3.scale.linear().domain([0,d3.max(data,function(d){return d[1];})]).range([height,0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom");

var yAxisLeft = d3.svg.axis().scale(y0).ticks(10).orient("left");
var yAxisRight = d3.svg.axis().scale(y1).ticks(12).orient("right");

var svg1 = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("class", "graph")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg1.append("g")
	.attr("class","x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
	.append("text")
	.attr("y",30)
	.attr("x",200)
	.style("text-anchor", "start")
	.text("Problem #");

svg1.append("g")
	.attr("class", "y axis axisLeft")
	.attr("transform", "translate(0,0)")
	.call(yAxisLeft)
	.append("text")
	.attr("y", 6)
	.attr("dy", "-2em")
	.style("text-anchor", "end")
	.text("Accuracy(%)");

svg1.append("g")
	.attr("class", "y axis axisRight")
	.attr("transform", "translate(" + (width) + ",0)")
	.call(yAxisRight)
	.append("text")
	.attr("y", 6)
	.attr("dy", "-2em")
	.attr("dx", "2em")
	.style("text-anchor", "end")
	.text("Problem Duration(s)");

var tip1 = d3.tip()
			.attr('class', 'd3-tip t1')
			.offset([-10, 0])
			.html(function(d) {
			return "<strong>Accuracy:</strong> <span style='color:white'>" + d + "%"+ "</span>";
			});

var tip2 = d3.tip()
			.attr('class', 'd3-tip t1')
			.offset([-10, 0])
			.html(function(d) {
			return "<strong>Time:</strong> <span style='color:white'>" + d + "s" + "</span>";
			});

svg1.call(tip1);
svg1.call(tip2);

bars = svg1.selectAll(".bar");

bars.data(data[0]).enter()
	.append("rect")
	.attr("class","bar1")
	.attr("x", function(d,i) {return x(i+1);})
	.attr("width", x.rangeBand()/2)
	.attr("y", function(d){return y0(d);})
	.attr("height",function(d){return (height - y0(d));})
	.on('mouseover',tip1.show)
	.on('mouseout',tip1.hide);

bars.data(data[1]).enter()
	.append("rect")
	.attr("class","bar2")
	.attr("x", function(d,i) {return x(i+1)+x.rangeBand()/2;})
	.attr("width",x.rangeBand()/2)
	.attr("y", function(d) { return y1(d);})
	.attr("height", function(d){return (height - y1(d));})
	.on('mouseover',tip2.show)
	.on('mouseout',tip2.hide);


