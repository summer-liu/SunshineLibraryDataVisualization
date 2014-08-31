var margin = {top: 30, right: 80, bottom: 80, left: 200 },
	width = 700 - margin.left - margin.right,
	height =300 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .rangeRoundBands([0,height], .1);

var x = d3.scale.linear()
    .rangeRound([0,width]);

//
var color = d3.scale.ordinal()
    .range(["#98FB98", "#FFB6C1", "#D6D6D6"]);//, "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [];


for (var i = 0; i < 7 ; i++){
  data[i] = {};
  data[i].No = i+1 ;
  data[i].correct = problemData[3*i+0];
  data[i].incorrect = problemData[3*i+1];
  data[i].incomplete = problemData[3*i+2];
}


color.domain(d3.keys(data[0]).filter(function(key) { return key !== "No"; }));

data.forEach(function(d) {
  var y0 = 0;
  d.counts = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
  d.total = d.counts[d.counts.length - 1].y1;
});

data.sort(function(a, b) { return b.total - a.total; });



y.domain(data.map(function(d) { return d.No; }));
x.domain([0, d3.max(data, function(d) { return d.total; })]);

svg2.append("g")
    .attr("class", "x2 axis")
    .attr("transform", "translate(0," + 0 + ")")
    .call(xAxis)
    .append("text")
    .attr("y",10)
    .attr("dy","-1em")
    .attr("x",430)
    .style("text-anchor", "start")
    .text("Student Count");


svg2.append("g")
    .attr("class", "y2 axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x",-100)
    .attr("y", -20)
    .attr("dy","-2em")
    .style("text-anchor", "middle")
    .text("Problem #");

var tip = d3.tip()
  .attr('class', 'd3-tip t2')
  .offset([0, 5])
  .direction('e')
  .html(function(d) {
  return "<p> <strong>Problem  "+d.No+"</strong></p>"+"<p><strong># correct:</strong> " + d.correct + "</p>" +"<p><strong># incorrect:</strong> " + d.incorrect + "</p>"+"<p><strong># incomplete:</strong> " + d.incomplete + "</p>";
  });

svg2.call(tip);



var state = svg2.selectAll(".state")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" +"0,"+ y(d.No) + ")"; })
    .on('mouseover',tip.show)
    .on('mouseout',tip.hide)

state.selectAll("rect")
    .data(function(d) { return d.counts; })
    .enter().append("rect")
    .attr("height", y.rangeBand())
    .attr("x", function(d) { return x(d.y0); })
    .attr("width", function(d) { return x(d.y1) - x(d.y0); })
    .style("fill", function(d) { return color(d.name); })


var legend = svg2.selectAll(".legend")
    .data(color.domain().slice())
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + i * 80 + "," +height +")"; });

legend.append("rect")
    .attr("x", 30)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x",  50)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d) { return d; });

