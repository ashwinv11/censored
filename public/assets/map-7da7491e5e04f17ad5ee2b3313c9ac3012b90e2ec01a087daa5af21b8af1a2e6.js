var w = 800;
var h = 800;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate(); // the projection's default translation
var s = proj.scale() // the projection's default scale

var map = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
//        .call(d3.behavior.zoom().on("zoom", redraw))
    .call(initialize);

var india = map.append("svg:g")
    .attr("id", "india");
d3.json("<%= asset_path('states.json') %>", function (json) {
  india.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);
});

function initialize() {
  proj.scale(6700);
  proj.translate([-1240, 720]);
}
  
// This section should allow for zoom & pan.

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

/*
var states = svg.append("g")
  .attr("id", "states")
  .attr("class", "Blues");

  // load the GDP data
  d3.json("https://gist.githubusercontent.com/JohnCoogan/1531818/raw/a494e3ccf561f30f81d299e2ac90992b5813dc46/wealth.json", function(json) {
    data = json;
    states.selectAll("path")
      .attr("class", quantize);
  });
  
  function quantize(d) {
    return "q" + Math.min(8, ~~(data[d.id] * 9 / 12)) + "-9";
  }
*/
