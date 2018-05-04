// alert("Connection!")
var margin = {
  top: 20,
  right: 200,
  bottom: 30,
  left: 50
},
width = 1200 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// console.log(parseTime(testTime));
var stringTime = d3.time.format("%c");
// console.log(stringTime(parseTime(testTime)));

var x = d3.time.scale()
.range([0, width]);

var y = d3.scale.linear()
.range([height, 0]);

var color = d3.scale.category10();
var colors = ["green", "red"];

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var line = d3.svg.line()
.interpolate("basis")
.x(function(d) {
  return x(d[col1]);
})
.y(function(d) {
  return y(d.closed);
});


var col1 = "timestamp";

function updateData(file_path, str_format) {


  var parseDate = d3.time.format(str_format).parse;
  // d3.csv("intraday_1min_GOOGL.csv", function(error, data) {
  d3.csv(file_path, function(error, data) {
    if (error) throw error;
    // format the data
    color.domain(d3.keys(data[0]).filter(function(key) {
    // return key !== "timestamp" && key !== "volume" && key !== "open";
    return key === "close";
    }));

    // console.log(color.domain());
    data.forEach(function(d) {
    d[col1] = parseDate(d[col1]);
    });

  // console.log(data);
    var stocks = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {
          [col1]: d[col1],
          closed: +d[name]
        };
      })
    };
    });

    x.domain(d3.extent(data, function(d) {
    return d[col1];
    }));

    y.domain([
    d3.min(stocks, function(c) {
      return d3.min(c.values, function(v) {
        return v.closed;
      });
    }),
    d3.max(stocks, function(c) {
      return d3.max(c.values, function(v) {
        return v.closed;
      });
    })
  ]);

  // console.log(stocks);
    //Basic Caluclations
    var currClose = stocks[0].values[0].closed,
        lastClose = stocks[0].values[stocks[0].values.length-1].closed,
        change = (currClose - lastClose).toFixed(2),
        change_ratio = (change / lastClose * 100).toFixed(2);
    var lineColor = change < 0? "red_line": "line",
        textColor = change > 0? "green_text": "red_text";

    // Other basic info
    var currHigh = Number(data[0].high).toFixed(2),
        currLow = Number(data[0].low).toFixed(2),
        currOpen = Number(data[0].open).toFixed(2),
        currVolume = Number(data[0].volume);
        currClose = (currClose).toFixed(2);

    d3.select('#high').text(currHigh);
    d3.select('#low').text(currLow);
    d3.select('#open').text(currOpen);
    d3.select('#volume').text(currVolume);
    d3.select('#close').text(currClose);

    // // Select the section we want to apply our changes to
    // var svg = d3.select(".svg_container");

    // svg = d3.select(".svg_container").transition();
    //
    // // Make the changes
    // svg.select(".x.axis") // change the x axis
    //     .duration(750)
    //     .call(xAxis);
    // svg.select(".y.axis") // change the y axis
    //     .duration(750)
    //     .call(yAxis);

    d3.select("svg").remove();
    var svg = d3.select(".svg_container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // console.log(lastClose+ " " +currClose);
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

    // svg.select(".stock path")   // change the line
    //     .duration(750)
    //     .attr("d", function(d) {
    //       return line(d.values);
    //     });
    var stock = svg.selectAll(".stock")
    .remove()
    .data(stocks)
    .enter()
    .append("g")
    .attr("class", "stock");

    stock.append("path")
    .attr("class", lineColor)
    .attr("d", function(d) {
      return line(d.values);
    });

    // listener - mouse movements
    var mouseG = svg.append("g")
    .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(stocks)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
    .attr("r", 5)
    .attr("class", lineColor);

    mousePerLine.append("text")
    .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function() { // on mouse out hide line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "0");
      d3.select('#main_price').text(currClose);
      d3.select('#change_ratio').text(change + "[" + change_ratio + "%]")
      .attr("class", textColor);
    })
    .on('mouseover', function() { // on mouse in show line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "1");
    })
    .on('mousemove', function() { // mouse moving over canvas
      var mouse = d3.mouse(this);
      d3.select(".mouse-line")
        .attr("d", function() {
          var d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + 0;
          return d;
        });

      // console.log(lines);
      d3.selectAll(".mouse-per-line")
        .attr("transform", function(d, i) {
          // console.log(width/mouse[0])
          var xDate = x.invert(mouse[0]),
              bisect = d3.bisector(function(d) { return d[col1]; }).right;
              idx = bisect(d.values.reverse(), xDate);

          var d0 = d.values[idx-1],
              d1 = d.values[idx];
          var dd;
          if (d0 == "undifined" || d1 == "undifined") {
            dd = (d0 == "undifined")? d1:d0;
          }
          else {
            dd = xDate - d0.closed > d1.closed - xDate ? d1 : d0;
          }

          // get current y values
          var timeString = stringTime(xDate);
          var pointY = dd.closed,
              pointChange = (pointY - lastClose).toFixed(2),
              pointChange_ratio = (pointChange / lastClose * 100).toFixed(2);
          var pointColor = pointChange > 0? "green_text": "red_text";
          d3.select(this).select('text')
            // .style("text-anchor", "end")
            .text(timeString);
          d3.select('#main_price').text(pointY);
          d3.select('#change_ratio').text(pointChange + "[" + pointChange_ratio + "%]")
          .attr("class", pointColor);
          // console.log("currY: "+currY);

          return "translate(" + mouse[0] + "," + y(dd.closed) +")";
        });
    })
    .on("click", function(){
      var mouse = d3.mouse(this),
          xDate = x.invert(mouse[0]);
      d3.select(".mouse-line")
        .attr("d", function() {
          var d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + 0;
          return d;
        });
      var timeString = stringTime(xDate);
      // console.log(timeString);
      d3.selectAll(".article_row .publish_info")
      .text(timeString);
    });

  });
}
var paths = [
    "intraday_1min_GOOGL.csv",
    "daily_GOOGL_3M.csv",
    "daily_GOOGL_1Y.csv",
    "weekly_GOOGL.csv"]


updateData(paths[0], "%Y-%m-%d %H:%M:%S");

d3.select('#M_1').on("click", function(){
  updateData(paths[0], "%Y-%m-%d %H:%M:%S");
});
d3.select('#M_2').on("click", function(){
  updateData(paths[1], "%Y-%m-%d");
});
d3.select('#M_3').on("click", function(){
  updateData(paths[2], "%Y-%m-%d");
});
d3.select('#M_4').on("click", function(){
  updateData(paths[3], "%Y-%m-%d");
});
