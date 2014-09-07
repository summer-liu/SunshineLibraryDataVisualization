var data = scoreDistribution;

var margin = {top: 40, right: 20, bottom: 70, left: 40},
  width = 800 - margin.left - margin.right,
  height = 550- margin.top - margin.bottom;

var x0 = d3.scale.ordinal().domain([0,1,2,3,4,5,6,7,8,9,10]).rangeRoundBands([0,width],.1);
var x = d3.scale.ordinal()
		.domain(["[0,10)", "[10,20)","[20,30)","[30,40)","[40,50)","[50,60)","[60,70)","[70,80)","[80,90)","[90,100)","100"])
		.rangeRoundBands([0,width],.1);

var y = d3.scale.linear().domain([0,1.05*d3.max(data,function(d){return d})]).range([height,0]);

var xAxis = d3.svg.axis().scale(x)
.orient("bottom");

var yAxisLeft = d3.svg.axis().scale(y)
					.tickSize(width)
    				.orient("right");

var svg = d3.select("body").append("svg").attr("class","scorechart").attr("id","score_bar")
  .attr("width", 830)
  .attr("height", 550)
  .attr("x",800)
  .attr("y",0)
  .append("g")
  .attr("class", "graph")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
svg.append("text")
  .attr("x", 400)             
  .attr("y", -20)
  .attr("text-anchor", "middle")  
  .text("Student Score Distribution")
  .style("font-weight","bold")
  .style("font-size","15px")
  .style("fill","#0099FF")

svg.append("g")
  .attr("class","x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .append("text")
  .attr("y",40)
  .attr("x",300)
  .style("text-anchor", "start")
  .text("Score Distribution");

svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(0,0)")
  .call(yAxisLeft)
  .append("text")
  .attr("y", 0)
  .attr("x",700)
  .attr("dy", "-2em")
  .style("text-anchor", "start")
  .text("Student Number");

bars = svg.selectAll(".bar");


var bar = bars.data(data).enter();

  bar.append("rect")
  .attr("class","bar")
  .attr("x", function(d,i) {return x0(i);})
  .attr("width", x0.rangeBand())
  .attr("y", function(d){return y(d);})
  .attr("height",function(d){return (height - y(d));})
  .attr("fill","#3300FF")
  
  bar.append("text")
  .attr("x",function(d,i) {return x0(i)+x0.rangeBand()/2;})
  .attr("y",function(d){return (y(d));})
  .attr("dx","-0.5em")
  .attr("dy","-0.35em")
  .text(function(d){return d})
  .style("font-weight","bold")
  .style("font-size","12px")
  .style("fill","#FF62B0")

