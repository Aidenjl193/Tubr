const circleStyle = {
  fill: "white",
  radius: 6,
  strokeWidth: 4
};

let allStations = [];
let allLines = [];
let currentCircle;

let filterBox = document.querySelector("#filter-box");

function generateMap(json) {
	 let path_coords = json.path_coords;
      allLines = json;
      var x = d3.scaleLinear();

      var y = d3.scaleLinear();

      let joins = [];

      //Process the join lines between nodes
      allStations.forEach(station => {
        if (station.nodes.length > 1) {
          for (let i = 1; i < station.nodes.length; ++i) {
            join = [];
            join[0] = station.nodes[0];
            join[1] = station.nodes[i];
            joins.push(join);
          }
        }
      });

      //Zoom behaviour
      const svgContainer = d3
        .select("#tube-overlay")
        .append("svg")
        .call(
          d3.zoom().on("zoom", () => {
            let newX = d3.event.transform.rescaleX(x);
            let newY = d3.event.transform.rescaleY(y);

            lineGraphs
              .attr("transform", d3.event.transform)
              .attr("stroke-width", (1 / d3.event.transform.scale(1).k) * 7);

            station_Joins_bottom
              .attr("transform", d3.event.transform)
              .attr("stroke-width", (1 / d3.event.transform.scale(1).k) * 9);

            station_Joins_top
              .attr("transform", d3.event.transform)
              .attr("stroke-width", (1 / d3.event.transform.scale(1).k) * 3);

            circles
              .attr("cx", function(d) {
                return newX(d.x);
              })
              .attr("cy", function(d) {
                return newY(d.y);
              });

            lables
              .attr("x", function(d) {
                return newX(d.nodes[0].x);
              })
              .attr("y", function(d) {
                return newY(d.nodes[0].y);
              });

            if (d3.event.transform.scale(1).k < 2) {
              lables.style("opacity", 0);
            } else {
              lables.style("opacity", 1);
            }

            if (d3.event.transform.scale(1).k < 1) {
              circles.style("opacity", 0);
            } else {
              circles.style("opacity", 1);
            }
          })
        )
        .append("g");

      //Render lines

      let lineFunction = d3
        .line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveBasis);

      //Generate a container for each line
      let lines = svgContainer
        .selectAll("g")
        .data(json)
        .enter()
        .append("g")
        .attr("class", d => `${d.name}-line-container`);

      let lineGraphs = lines
        .append("path")
        .attr("d", d => lineFunction(d.path_coords))
        .attr("stroke", d => d.color)
        .attr("stroke-width", "10px")
        .attr("fill", "none");

      const station_Joins_bottom = svgContainer
        .selectAll(".join-line-bottom")
        .data(joins)
        .enter()
        .append("line")
        .attr("class", ".join-line-bottom")
        .attr("x1", d => d[0].x)
        .attr("y1", d => d[0].y)
        .attr("x2", d => d[1].x)
        .attr("y2", d => d[1].y)
        .attr("stroke-width", "10px")
        .attr("stroke", d => "black");

      //Render allStations
      const circles = svgContainer
        .selectAll("g")
        .data(allStations)
        .enter()
        .append("g")
        .selectAll("circle")
        .data(d => {
          return d.nodes.map(node => {
            return {
              ...node,
              has_issues: d.has_issues,
              accessible: d.accessible
            };
          });
        })
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("stroke", d => {
          return d.has_issues ? "red" : "black";
        })
        .attr("fill", d => {
          return d.accessible ? "blue" : "white";
        });

      const station_Joins_top = svgContainer
        .selectAll(".join-line-top")
        .data(joins)
        .enter()
        .append("line")
        .attr("class", ".join-line-top")
        .attr("x1", d => d[0].x)
        .attr("y1", d => d[0].y)
        .attr("x2", d => d[1].x)
        .attr("y2", d => d[1].y)
        .attr("stroke-width", "5px")
        .attr("stroke", d => "white");

      function getTextWidth(text, fontSize, fontFace) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = fontSize + "px " + fontFace;
        return context.measureText(text).width;
      }

      const lables = svgContainer
        .selectAll("text")
        .data(allStations)
        .enter()
        .append("text")
        .attr("x", d => d.nodes[0].x)
        .attr("y", d => d.nodes[0].y)
        .attr("dx", d => {
          let width = getTextWidth(d.name, 12, "sans-serif");
          return -width - 25;
        })
        .attr("dy", ".25em")
        .style("font-size", "12px")
        .attr("fill", "#1A5A92")
        .text(d => d.name);

      var circleAttributes = circles
        .attr("r", circleStyle.radius)
        .attr("stroke-width", circleStyle.strokeWidth)
        .append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) {
          return d.name;
        });

      //Ross's Shizz follows
      let stationCircles = document.querySelectorAll("circle");

      stationCircles.forEach(circle => {
        circle.addEventListener("click", () => {
          openStationDetails(event);
          currentCircle = event.target;
        });
      });
}

function populateFilters() {
	if(filterBox.dataset.open == "false") {
		filterBox.dataset.open = "true"
		filterBox.style.width = "300px";

		title = document.createElement("h3");
		title.innerText = "Filters";

		filterBox.appendChild(title);

		filterBox.appendChild(generateFilterCard({line_name: "Circle Line", color: "yellow"}))
	}else{
		filterBox.dataset.open = "false"
		filterBox.innerHTML = "";
		filterBox.style.width = "30px";fi
	}
}

function generateFilterCard(line) {
	card = document.createElement("div")
	card.className = "filter-card"

	h4 = document.createElement("h4")
	h4.innerText = line.line_name;

	colorSquare = document.createElement("div")
	colorSquare.style.backgroundColor = line.color;

	card.append(h4, colorSquare);

	return card;
}

function generatePage() {
  fetch("http://localhost:3000/lines")
    .then(resp => resp.json())
    .then(json => {
		generateMap(json);
    });
}

fetch("http://localhost:3000/stations")
  .then(resp => resp.json())
  .then(json => {
    allStations = json;
      generatePage();
  });


function init() {
	  filterBox.addEventListener("click", (e) => {
		  populateFilters();
	  })
}

init();
