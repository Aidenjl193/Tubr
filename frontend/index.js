const circleStyle = {
	fill: "white",
	stroke: "black",
	radius: 6,
	strokeWidth: 4
}


fetch("http://localhost:3000/lines/circle")
	.then(resp => resp.json())
	.then(json => {
		let path_coords = json.path_coords
		console.log(path_coords);
		
		var x = d3.scaleLinear();

		var y = d3.scaleLinear();

		const svgContainer = d3.select("#tube-overlay")
			  .append("svg")
			  .call(d3.zoom().on("zoom", () => {
                  
				  let newX = d3.event.transform.rescaleX(x);
				  let newY = d3.event.transform.rescaleY(y);
				  
				  lineGraphs
					  .attr("transform", d3.event.transform)
					  .attr("stroke-width", (1 / d3.event.transform.scale(1).k) * 7);
				  
				  circles
					  .attr('cx', function(d) {return newX(d.x)})
					  .attr('cy', function(d) {return newY(d.y)});
				  
				  lables
					  .attr('x', function(d) {return newX(d.x)})
					  .attr('y', function(d) {return newY(d.y)});
				  
				  if(d3.event.transform.scale(1).k < 2) {
					  lables.style("opacity", 0);
				  } else {
					  lables.style("opacity", 1);
				  }
				  
				  if(d3.event.transform.scale(1).k < 1) {
					  circles.style("opacity", 0);
				  } else {
					  circles.style("opacity", 1);
				  }
			  }))
			  .append("g");

		//Render lines

		function lerp (start, end, amt){
			return (1-amt)*start+amt*end
		}

		let lineFunction = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasis);

		let lineGraphs = svgContainer.selectAll("path")
            .data(path_coords)
            .enter()
            .append("path")
            .attr("d", d => lineFunction(path_coords))
            .attr("stroke", d => json.color)
            .attr("stroke-width", "10px")
            .attr("fill", "none");                         

		//Render stations
		const circles = svgContainer.selectAll("circle")
              .data(json.stations)
              .enter()
              .append("circle")
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);

		function getTextWidth(text, fontSize, fontFace) {
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			context.font = fontSize + 'px ' + fontFace;
			return context.measureText(text).width;
		} 
		
		const lables = svgContainer.selectAll("text")
              .data(json.stations)
              .enter()
              .append("text")
              .attr("x", d => d.x)
              .attr("y", d => d.y)
              .attr("dx",(d) =>  -getTextWidth(d.name, 12, "sans-serif")-25)
              .attr("dy", ".25em")
              .style("font-size", "12px")
              .attr("fill", "#1A5A92")
              .text((d) => d.name );

		var circleAttributes = circles
            .attr("r", circleStyle.radius )
            .attr("fill", circleStyle.fill)
            .attr("stroke", circleStyle.stroke)
            .attr("stroke-width", circleStyle.strokeWidth)
            .append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name });

	});

