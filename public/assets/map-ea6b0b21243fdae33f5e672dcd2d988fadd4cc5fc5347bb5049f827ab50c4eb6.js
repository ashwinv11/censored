var w = 1000;
var h = 800;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate(); // the projection's default translation
var s = proj.scale() // the projection's default scale

var map = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
        //.call(d3.behavior.zoom().on("zoom", redraw))
    .call(initialize)
    .call(drawMap);

var india = map.append("svg:g")
    .attr("id", "india");

function drawMap() {    
  d3.json('/india_district.geojson', function (json) {
    india.selectAll("path")
        .data(json.features)
        .enter().append("path")
        .attr("d", path)
        .on("mousedown", function(d) {
          console.log(d.properties.NAME_2);
        })
  });
}

function initialize() {
  proj.scale(7200);
  proj.translate([-950, 780]);
}

var layer2 = map.append('g')
            .attr("id", "lines");
  
// This section should allow for zoom & pan.
/*
function redraw() {
  // d3.event.translate stores the current translation from the parent SVG element
  // t stores the projection's default translation
  // adding the x and y vales in each array to yields the projection's new translation
  var tx = t[0] * d3.event.scale + d3.event.translate[0];
  var ty = t[1] * d3.event.scale + d3.event.translate[1];
  proj.translate([tx, ty]);

  // determine the projection's new scale and redraw the map:
  proj.scale(s * d3.event.scale); 
  india.selectAll("path").attr("d", path);
}
*/

var container = document.getElementById('chart');
var i = 0;

var lines = layer2.append("svg")
    .attr("width", w)
    .attr("height", h);

console.log(d3.mouse(container));

var lineFunction = d3.svg.line()
                  .x(function(d) { return d.x; })
                  .y(function(d) { return d.y; })
                  .interpolate("linear");
/*
container.onclick = function (e) {
    xPosition[i] = e.clientX;
    yPosition[i] = e.clientY;
    if (i >= 1) {
        var line = lines.append("line")
            .attr("x1", xPosition[i - 1])
            .attr("y1", yPosition[i - 1])
            .attr("x2", xPosition[i])
            .attr("y2", yPosition[i])
            .attr("transform", null)
            .transition()
            .ease("linear")
            .duration(2000)
            .attr("stroke-width", 2)
            .attr("stroke", "white")
            .attr("opacity", ".6");
    }
    i++;
};
*/

/*
function reset(){
  $("#lines").empty();
}
*/
