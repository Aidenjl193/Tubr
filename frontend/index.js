const circleStyle = {
  fill: "white",
  stroke: "black",
  radius: 6,
  strokeWidth: 4
};

fetch("http://localhost:3000/lines/circle")
  .then(resp => resp.json())
  .then(json => {
    let path_coords = json.path_coords;
    //console.log(path_coords);

    var x = d3.scaleLinear();

    var y = d3.scaleLinear();

    let joins = [];

    json.stations.forEach(station => {
      if (station.nodes.length > 1) {
        for (let i = 1; i < station.nodes.length; ++i) {
          join = [];
          join[0] = station.nodes[0];
          join[1] = station.nodes[i];
          joins.push(join);
        }
      }
    });

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

    function lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    }

    let lineFunction = d3
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBasis);

    let lineGraphs = svgContainer
      .selectAll("path")
      .data(path_coords) //big ol' bug here
      .enter()
      .append("path")
      .attr("d", d => lineFunction(path_coords))
      .attr("stroke", d => json.color)
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

    //Render stations
    const circles = svgContainer
      .selectAll("g")
      .data(json.stations)
      .enter()
      .append("g")
      .selectAll("circle")
      .data(d => d.nodes)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

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
      .data(json.stations)
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
      .attr("fill", circleStyle.fill)
      .attr("stroke", circleStyle.stroke)
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
        //debugger;
        openStationDetails(event);
      });
    });
  });
