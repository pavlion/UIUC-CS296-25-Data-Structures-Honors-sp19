
// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
  d3.csv("illini-football-scores.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);

    // Call our visualize function:
    visualize(data);
  });
});


var visualize = function(data) {
  // Boilerplate:
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
     width = 960 - margin.left - margin.right,
     height = 500 - margin.top - margin.bottom;
  
  
  
  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var gradeScale = d3.scaleLinear()
                   .domain([0, 100])
                   .range([0, width]);
				   
  var scoreDiffScale = d3.scalePow()
						 .domain([-70, 90])
						 .range([0, 8]);	
  var colorScale = d3.scaleLinear()
						 .domain([-70, 90])
						 .range([0, 1]);							 
  
  var axisVariable = d3.axisTop()
                     .scale( gradeScale );
  svg.append("g")
     .call( axisVariable );

			   
  // Visualization Code:
  svg.selectAll("IlliniScore")
     .data(data)
     .enter()
     .append("circle")
     .attr("r", function (d, i) {
       return scoreDiffScale(d["IlliniScore"]-d["OpponentScore"]);
     })
     .attr("cx", function (d, i) {
       return gradeScale( d["IlliniScore"]);
     })
     .attr("cy", 0)
     .attr("fill", d3.rgb("#007AFF")+colorScale(d["IlliniScore"]-d["OpponentScore"]))
     .attr("stroke", "black")



  
};