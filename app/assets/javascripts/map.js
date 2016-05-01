var w = 800;
var h = 780;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate(); // the projection's default translation
var s = proj.scale() // the projection's default scale
var circles = [];
var centered;
var linePath;

var map = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
        //.call(d3.behavior.zoom().on("zoom", redraw))
    .call(initialize)
    .call(drawMap);

var india = map.append("svg:g")
    .attr("id", "india");

function initialize() {
  proj.scale(7200);
  proj.translate([-1280, 780]);
}

var layer2 = map.append('g')
            .attr("id", "lines");
  
var lines = layer2.append("svg");

function drawMap() {    
  d3.json('/india_district.geojson', function (json) {
    india.selectAll("path")
        .data(json.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "red")
        .attr("opacity", .6)
        .attr("stroke", "black")
        .attr("stroke-width", .4)
        .attr("stroke-opacity", .4)
        .on("mouseover", function(d){
          document.getElementById("state_name").innerHTML = d.properties.NAME_1;
          document.getElementById("district_name").innerHTML = d.properties.NAME_2;
        })

        .on("click", function(d) {
          // PATH DRAWING

          var lineFunction = d3.svg.line()
                            .x(function(d,i) { return circles[i][0]; })
                            .y(function(d,i) { return circles[i][1]; })
                            .interpolate("cardinal");  

          lines.selectAll("circle")
                .remove();
          lines.selectAll("path")
                .remove();

          var mousePos = d3.mouse(this);
          circles.push(mousePos);

          linePath = lines.append("path")
                    .attr("class", "line")
                    .attr("d", lineFunction(circles))
                    .attr("stroke-width", 2)
                    .attr("stroke", "white")
                    .style("fill", "none")
                    .attr("opacity", ".4")
                    .style("stroke-dasharray", ("8,4"));       

          linePath = lines.selectAll("circle")
                    .data(circles)
                    .enter()
                    .append("circle")
                    .attr("cx",function(d,i){return circles[i][0];})
                    .attr("cy",function(d,i){return circles[i][1];})
                    .attr("r",2)
                    .attr("class", "line")
                    .attr("class", "point")
                    .style("fill", "white");

          // ZOOMING VIA TRANSLATE

          var x, y, k;

          if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
          } else {
            x = w / 2;
            y = h / 2;
            k = 1;
            centered = null;
          }

          india.selectAll("path")
              .classed("active", centered && function(d) { return d === centered; });

          india.transition()
              .duration(750)
              .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
              .style("stroke-width", 1.5 / k + "px");

          layer2.selectAll("path")
              .classed("active", centered && function(d) { return d === centered; });

          layer2.transition()
              .duration(750)
              .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
              .style("stroke-width", 1.5 / k + "px");
          })
  });
}

// RESET BUTTON

function reset() {
  d3.selectAll(".line").remove();
  d3.selectAll(".point").remove();
  d3.selectAll(".train").remove();
  circles = [];

  // Resets the zoom
  india.transition()
      .duration(750)
      .attr("transform", "translate(0,0)scale(1)");
  layer2.transition()
      .duration(750)
      .attr("transform", "translate(0,0)scale(1)");
}

var layer3 = map.append('g')
            .attr("id", "train");
  
var train = layer3.append("svg");

function start(){
  // Reset's camera
  india.transition()
      .duration(750)
      .attr("transform", "translate(0,0)scale(1)");
  layer2.transition()
      .duration(750)
      .attr("transform", "translate(0,0)scale(1)");

  lines.selectAll(".point")
      .data(circles)
    .enter().append("circle")
      .attr("r", 4)
      .attr("transform", function(d) { return "translate(" + d + ")"; });

  var circle = layer3.append("circle")
      .attr("r", 5)
      .attr("transform", "translate(" + circles[0] + ")")
      .style("fill", "blue")
      .attr("class", "train")
      .style("opacity", .6);

  var travelPath = d3.selectAll("path.line");
  transition();

  function transition() {
    circle.transition()
            .duration(15000)
            .attrTween("transform", translateAlong(travelPath.node()))
            .each("end", transition);
  }

  // Returns an attrTween for translating along the specified path element.
  function translateAlong(path) {
    var l = path.getTotalLength();
    return function(d, i, a) {
      return function(t) {
        var p = path.getPointAtLength(t * l);
        // layer2.transition()
        //     .attr("transform", "translate(" + p.x + "," + p.y + ")scale(4,4)");
        return "translate(" + p.x + "," + p.y + ")";
      };
    };
  }
}