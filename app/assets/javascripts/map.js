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
    .call(initialize);
/*
var calculate_centroid_polygon = function(polygon) {
  var this_centroid_lon = null;
  var this_centroid_lat = null;
  var n_points = 0;
  polygon[0].forEach(function(c) {
    if (this_centroid_lon == null) {
      this_centroid_lon = c[0];
      this_centroid_lat = c[1];
    }
    else {
      this_centroid_lon += c[0];
      this_centroid_lat += c[1];
    }
    n_points += 1;
  });
  return [this_centroid_lon / n_points, this_centroid_lat / n_points];
};


var centroids = {};
d3.json('/states.json', function(json) {
  var feats = json.features;
  feats.forEach(function (state) {
    var geo = state.geometry;
    if (geo.type == "Polygon") {
      var coords = geo.coordinates;
      centroids[state.id] = calculate_centroid_polygon(coords);
    }
    else {
      var coords = geo.coordinates;
      var n_polygons = 0;
      coords.forEach(function(poly) {
        if (state.id in centroids)
        {
          var this_centroid = calculate_centroid_polygon(poly);
          centroids[state.id][0] += this_centroid[0];
          centroids[state.id][1] += this_centroid[1];
        }
        else {
          var this_centroid = calculate_centroid_polygon(poly);
          centroids[state.id] = [this_centroid[0], this_centroid[1]];
        }
        n_polygons += 1;
      });
      centroids[state.id][0] /= n_polygons;
      centroids[state.id][1] /= n_polygons;
    }
    // d.features.forEach(function (feat) {
    //   console.log(feat);
    // });
  });
});

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

var closest_state = function(x, y) {
  var gps = proj.invert(x, y);
  var closest_state = "";
  var closest_dist = 9999999999;
  for (var state in centroids) {
    var this_state_gps = centroids[state];
    var this_dist = getDistanceFromLatLonInKm(
      gps[1],
      gps[0],
      this_state_gps[0],
      this_state_gps[1]);
    if (closest_dist > this_dist) {
      closest_state = state;
      closest_dist = this_dist;
    }
  }
  console.log(closest_state, closest_dist);
  return closest_state;
};
*/

var india = map.append("svg:g")
    .attr("id", "india");
d3.json('/states.json', function (json) {
  india.selectAll("path")
      .data(json.features)
      .enter().append("path")
      .attr("d", path)
      .on("mousedown", function(d) {
        console.log(d.id);
      })
});

function initialize() {
  proj.scale(6700);
  proj.translate([-950, 720]);
}

var layer1 = map.append('g');
var layer2 = map.append('g');
  
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
var xPosition = [];
var yPosition = [];
var lines = layer2.append("svg")
    .attr("width", w)
    .attr("height", h);
container.onclick = function (e) {
    xPosition[i] = e.clientX;
    yPosition[i] = e.clientY;
    // closest_state([e.clientX, e.clientY]);
    if (i >= 1) {
        var line = lines.append("line")
            .attr("x1", xPosition[i - 1])
            .attr("y1", yPosition[i - 1])
            .attr("x2", xPosition[i])
            .attr("y2", yPosition[i])
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("opacity", ".6");
    }
    i++;
};

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