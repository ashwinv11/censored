var w = 800;
var h = 780;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate(); // the projection's default translation
var s = proj.scale() // the projection's default scale
var circles = [];
var stations = [];
var centered;
var linePath;
var travelPath;
var trainPos;
var railwaysDisplayed = false;
var soundOn = false;
var durationScale;
var currentState;
var currentDistrict;
var districts = [];
var filterUpTimeOut, filterDownTimeOut;

var soundFile;

var filter, filterFreq, filterRes;

function preload() {
  soundFormats('mp3');
  soundFile = loadSound('/sound_master.mp3');
}

var map = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .call(initialize)
    .call(drawStates)
    //.call(drawRailways)
    .call(drawDistricts)
    .append("g")
    .attr("id", "zoomLayer");

var zoomLayer = d3.select("#zoomLayer");

var states = map.append("svg:g")
    .attr("id", "states");

var railways = map.append("svg:g")
    .attr("id", "railways");

var districts = map.append("svg:g")
    .attr("id", "districts");

function initialize() {
  proj.scale(7200);
  proj.translate([-1280, 780]);
}

var layer2 = map.append('g')
            .attr("id", "lines");
  
var lines = layer2.append("svg");

var layer3 = map.append('g')
            .attr("id", "train");
  
var train = layer3.append("svg");

function drawDistricts() {
  d3.json('/india_district.geojson', function (json) {
    districts.selectAll("path")
        .data(json.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#D13737")
        .attr("opacity", 0)
        .attr("stroke", "black")
        .attr("stroke-width", .4)
        .attr("stroke-opacity", 0)
        .on("mouseover", function(d){
           d3.select('.controls_text').transition()
                                      .duration(500)
                                      .style('opacity', 1);
          document.getElementById("state_name").innerHTML = d.properties.NAME_1;
          document.getElementById("district_name").innerHTML = d.properties.NAME_2;
        })
        .on("mouseout", function(d){
           d3.select('.controls_text').transition()
                                      .duration(500)
                                      .style('opacity', 0);
          document.getElementById("state_name").innerHTML = d.properties.NAME_1;
          document.getElementById("district_name").innerHTML = d.properties.NAME_2;
        })
        .on("click", function(d) {

          currentState = d.properties.NAME_1.toUpperCase();
          currentDistrict = d.properties.NAME_2.toUpperCase();

          var groupData = {state: currentState, 
                          district: currentDistrict}

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
                    .datum(groupData)
                    .attr("cx",function(d,i){return circles[i][0];})
                    .attr("cy",function(d,i){return circles[i][1];})
                    .attr("r",2)
                    .attr("class", "line")
                    .attr("class", "point")
                    .style("fill", "white")
                    .attr("opacity", ".8");

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

          zoomLayer.transition()
              .duration(750)
              .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
              .style("stroke-width", 1.5 / k + "px");
    });
  });
};

function drawStates() {
  d3.json('/states.json', function (json) {
    states.selectAll("path")
        .data(json.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#D13737")
        .attr("opacity", .6)
        .attr("stroke", "#e2706e")
        .attr("stroke-width", .4)
        .attr("stroke-opacity", .6);
  });
};

function drawRailways() {
  if(railwaysDisplayed === false){
    d3.json('/railways.geojson', function (json) {
      railways.selectAll("path")
          .data(json.features)
          .enter().append("path")
          .attr("d", path)
          .transition()
          .duration(1000)
          .attr("opacity", 1)
          .attr("stroke", "black")
          .attr("stroke-width", .6)
          .attr("stroke-opacity", 1);
    });
    railwaysDisplayed = true;
  }
  else{
    railways.selectAll("path")
            .transition()
            .duration(1000)
            .attr("opacity", 0)
            .attr("stroke-opacity", 0);
    railwaysDisplayed = false;
  }
};

// RESET BUTTON

function reset() {
  if(soundOn){
    filterDownTimeOut = setInterval(filterDown, 10);
    soundOn = false;
  }
  currentState, currentDistrict, durationScale  = null;
  travelPath.transition();
  zoomLayer.transition();
  d3.selectAll(".line").remove();
  d3.selectAll(".point").remove();
  d3.selectAll(".train").remove();
  textDisplay.transition()
            .duration(500)
            .style('opacity', 0);
  //textDisplay.remove();
  circles = [];
  //travelPath = [];

  zoomLayer.transition()
      .duration(750)
      .attr("transform", "translate(0,0)scale(1)");
}

function startRoute(){
  soundOn = true;
  filterUpTimeOut = setInterval(filterUp, 10);
  sendVars();
  textTypewriter();

  //console.log(d3.selectAll('.point').datum());
  //console.log(circles);

  // Reset's train even if user clicks on makes new path
  d3.selectAll(".train").remove();

  lines.selectAll(".point")
      .data(circles)
      .enter().append("circle")
      .attr("r", 4)
      .attr("transform", function(d) { return "translate(" + d + ")"; });

  trainPos = layer3.append("circle")
      .attr("r", 5)
      .attr("transform", "translate(" + circles[0] + ")")
      .style("fill", "red")
      .attr("class", "train");

  travelPath = d3.selectAll("path.line");
  followPath();
}

function followPath() {

  durationScale = travelPath.node().getTotalLength();

  trainPos.transition()
          .duration(100 * durationScale)
          .ease("linear")
          .attrTween("transform", translateAlong(travelPath.node(), 0))
          .each("end", reset);

  zoomLayer.transition()
          .duration(100 * durationScale)
          .ease("linear")
          .attrTween("transform", translateAlong(travelPath.node(), 1))
          .each("end", reset);
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path, layerSwitch) {
  var l = path.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);
      if (layerSwitch === 0)
        return "translate(" + p.x + "," + p.y + ")";
      else if (layerSwitch === 1)
        return "translate(" + -p.x + "," + -p.y + ")scale(2,2)";
    };
  };
}

// TEXT STUFF

var i = 0;
var textData = [
    'Rapes occured: a32',
    'Rapes occured: b12',
    'Rapes occured: c15',
    'Rapes occured: d88',
    'Rapes occured: e13',
    'Rapes occured: f11',
    'Rapes occured: g2',
    'Rapes occured: h9'];

var infoZone = d3.select("#controls").append("svg:svg")
    .attr("width", 200)
    .attr("height", 200);

var textDisplay = infoZone.append('text')
                          .attr("fill", "white")
                          .attr("font-size", "16px")
                          .attr("text-align", "left")
                          .attr("x", 0)
                          .attr("y", 100)
                          .style('opacity', 0)
                          .on("mousedown", function () {
                              textTypewriter();
});

function textTypewriter() {
    d3.select('text').transition()
        .duration(500)
        .style('opacity', 1)
        .duration(3000)
        .ease("linear")
        .tween("text", function () {
            var newText = textData[i];
            var textLength = newText.length;
            return function (t) {
                this.textContent = newText.slice(0, 
                                   Math.round( t * textLength) );
            };
        });
    
    i = (i + 1) % textData.length;
};

function toggleRailways(){
  drawRailways();
}

function sendVars(){
  console.log(currentState, currentDistrict);
  window.open("localhost:3000/districts?state="+currentState+"&district="+currentDistrict,"_self");
}

function setup() {
  // loop the sound file
  soundFile.loop();
  filter = new p5.LowPass();

  // Disconnect soundfile from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  soundFile.disconnect();
  soundFile.connect(filter);

  // Map mouseX to a the cutoff frequency from the lowest
  // frequency (10Hz) to the highest (22050Hz) that humans can hear
  filterFreq = 250;

  // Map mouseY to resonance (volume boost) at the cutoff frequency
  filterRes = 1;

  // set filter parameters
  filter.set(filterFreq, filterRes);
}

function filterUp(){
  if(filterFreq < 20000){
    filterFreq *= 1.1;
    filter.set(filterFreq, filterRes); 
  }else{
    clearTimeout(filterUpTimeOut);
  }
}

function filterDown(){
  if (filterFreq > 249){
    filterFreq *= 0.9;
    filter.set(filterFreq, filterRes);
  }else{
    clearTimeout(filterDownTimeOut);
  }
}

$('#reset').on('click', function(event, data, status, xhr) {
  event.preventDefault();
  return $.ajax({
    url: '/districts',
    type: 'GET',
    dataType: "json",
    data: {
      state: $('#state_name').text().toUpperCase(),
      district: $('#district_name').text().toUpperCase()
    },
    complete: function(){
      console.log("request sent");
    },
    success: function(data, event, status, xhr) {
      console.log(data);
    },
    error: function(event, data, status, xhr) {
      alert("Ajax error!")
    }
  });
});