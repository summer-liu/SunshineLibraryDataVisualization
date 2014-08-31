var data = focusTime;
var nametitle= ["Introduction Video","Problem 1", "Problem 2", "Problem 3","Problem 4","Problem 5","Problem 6","Problem 7"];
var data1 = [data[0],data[1]+data[2]+data[3]+data[4]+data[5]+data[6]+data[7]];
var data2 = data.slice(1);

var margin = {top: 0, right: 10, bottom: 80, left: 600 },
	width = 1120 - margin.left - margin.right,
	height = 450 - margin.top - margin.bottom,
	radius = Math.min(width,height)/2;

var color = d3.scale.ordinal()
					.range(["#ac92ec","#BDFCC9", "#54FF9F", "#7FFF00", "#00CD66",  "#32CD32","#008000", "#006400"]);
				//.range(["#ac92ec","#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
									//.range(["#ac92ec","#BDFCC9", "#54FF9F", "#7FFF00", "#00FF7F", "#00CD66", "#008000", "#006400"]);

var arc = d3.svg.arc()
	.outerRadius(radius-50)
	.innerRadius(60);

var pie = d3.layout.pie()
			.sort(null)
			.value(function(d){return d;});

var svg3 = d3.select('body').append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("y",200)
			.append("g")
			.attr("transform","translate(" + width / 2 + ","  + (height/2)+ ")");

data.forEach(function(d){
	d = +d;
})

var g = svg3.selectAll(".arc")
		.data(pie(data))
		.enter()
		.append("g")
		.attr("class","arc");

g.append("path")
	.attr("d",arc)
	.style('fill',function(d,i){return color(i)});

piedata = pie(data)

piedata.forEach(function(d,i){d.name=nametitle[i];})

svg3.selectAll("text").data(piedata)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", function(d) {
        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
        d.cx = Math.cos(a) * (radius - 65);
        return d.x = Math.cos(a) * (radius -10);
    })
    .attr("y", function(d) {
        var a = d.startAngle + (d.endAngle - d.startAngle)/2 - Math.PI/2;
        d.cy = Math.sin(a) * (radius - 65);
        return d.y = Math.sin(a) * (radius -10);
    })
    .text(function(d,i) { return d.name; })
    .each(function(d) {
        var bbox = this.getBBox();
        d.sx = d.x - bbox.width/2 - 2;
        d.ox = d.x + bbox.width/2 + 2;
        d.sy = d.oy = d.y + 5;
    });

svg3.append("defs").append("marker")
    .attr("id", "circ")
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("refX", 3)
    .attr("refY", 3)
    .append("circle")
    .attr("cx", 3)
    .attr("cy", 3)
    .attr("r", 0);

svg3.selectAll("path.pointer").data(piedata).enter()
    .append("path")
    .attr("class", "pointer")
    .style("fill", "none")
    .style("stroke", "black")
    .attr("marker-end", "url(#circ)")
    .attr("d", function(d) {
        if(d.cx > d.ox) {
            return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
        } else {
            return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
        }
    });


g.append("text")
	.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	.attr("dy",".50em")
	.attr("dx",".50em")
	.style("text-anchor","middle")
	.text(function(d){return d.value});


g.append("text")
.style("text-anchor","middle")
.style("fill", "#FF8000")
.style("font-family","Arial")
.text("Average Focus Time (s)");