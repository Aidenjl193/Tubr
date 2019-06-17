const circleStyle = {
	fill: "white",
	stroke: "black",
	radius: 6,
	strokeWidth: 4
}

const lines = [
	{
		name: "circle",
		color: "#FFCC00",
		routes: [
			{
				stops: [
					"Wood Lane",
					"Latimer Road",
					"Ladbroke Grove",
					"Westbourne Park",
					"Royal Oak",
					"Paddington",
					"Edgware Road",
					"Baker Street",
					"Great Portland Street",
					"Euston Square",
					"King’s Cross St Pancras",
					"Farringdon",
					"Barbican",
					"Moorgate",
					"Liverpool Street",
					"Aldgate",
					"Tower Hill Fenchurch Street"
				]
			}
		]
	},
	{
		name: "northern",
		color: "black",
		routes: [
			{
				stops: [
					"Angel",
					"Old Street",
					"Moorgate",
					"Bank",
					"London Bridge"
				]
			}
		]
	},
	{
		name: "metropolitan",
		color: "#660066",
		routes: [
			{
				stops: [
					"Aldgate",
					"Liverpool Street",
					"Moorgate",
					"Barbican",
					"Farringdon",
					"King’s Cross St Pancras",
					"Euston Square",
					"Great Portland Street",
					"Baker Street",
					"Finchley Road",
					"Wembley Park",
					"Preston Road"
				]
			}
		]
	}
]

fetch("https://api.myjson.com/bins/6rccl")
	.then(resp => resp.json())
	.then(json => {
		let stops = json
		
		for(let i = 0; i < stops.length; i++){
			if(stops[i].pos == undefined || stops[i].x == undefined || stops[i].y == undefined) {
				console.log(stops[i]);
				stops.splice(i, 1);
			}
		}
		
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

		function generateLineData(line) {
			let lineCoords = [];
			// populate initial coords
			line.routes[0].stops.forEach((stationName) => {
				stop =  stops.find((stop) => stop.name == stationName);
				if(stop != undefined) {
					const {x, y} = stop;
					lineCoords.push({x, y})
				}
			});
			
			let lineCoordsSmoothed = [];
			//smooth
			for(let i = 0; i < lineCoords.length; ++i) {
				coords = lineCoords[i];
				lineCoordsSmoothed.push(coords);
				if(lineCoords[i + 1]) {
					coords2 = lineCoords[i + 1]
					distance = Math.sqrt((coords.x - coords2.x) * (coords.x - coords2.x) + (coords.y - coords2.y) * (coords.y - coords2.y));
					if(distance > 40) {
						lineCoordsSmoothed.push({x: lerp(coords.x, coords2.x, 0.45), y: coords.y});
						lineCoordsSmoothed.push({x: lerp(coords2.x, coords.x, 0.45), y: lerp(coords.y, coords2.y, 0.15)});
						lineCoordsSmoothed.push(coords2);
					} else {
						lineCoordsSmoothed.push(coords2);
					}
				}
			}
			
			return lineCoordsSmoothed;
		}

		lineData = generateLineData(lines[0]);

		let lineFunction = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveBasis);

		let lineGraphs = svgContainer.selectAll("path")
            .data(lines)
            .enter()
            .append("path")
            .attr("d", d => lineFunction(generateLineData(d)))
            .attr("stroke", d => d.color)
            .attr("stroke-width", "10px")
            .attr("fill", "none");                         

		//Render stations
		const circles = svgContainer.selectAll("circle")
              .data(stops)
              .enter()
              .append("circle")
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);
		
		const lables = svgContainer.selectAll("text")
              .data(stops)
              .enter()
              .append("text")
              .attr("x", d => d.x)
              .attr("y", d => d.y)
              .attr("dx", 12)
              .attr("dy", ".25em")
              .style("font-size", "12px")
              .attr("fill", "#1A5A92")
              .text(function(d) { return d.name });

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

