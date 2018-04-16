var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// d3.tsv("data.tsv", function(d) {
//   d.date = parseTime(d.date);
//   d.close = +d.close;
//   return d;
// }, function(error, data) {
//   if (error) throw error;
//
//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain(d3.extent(data, function(d) { return d.close; }));
//
//   g.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x))
//     .select(".domain")
//       .remove();
//
//   g.append("g")
//       .call(d3.axisLeft(y))
//     .append("text")
//       .attr("fill", "#000")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", "0.71em")
//       .attr("text-anchor", "end")
//       .text("Price ($)");
//
//   g.append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-linecap", "round")
//       .attr("stroke-width", 1.5)
//       .attr("d", line);
// });

// d3.csv("data.csv", function(error, data) {
//             if (error) throw error;
//             // format the data
//             data.forEach(function(d) {
//                d.date = parseTime(d.date);
//                d.close = +d.close;
//             });

d3.csv("data2.csv", function(error, data) {
  if (error) throw error;
  // format the data
  data.forEach(function(d) {
     d.date = parseTime(d.date);
     d.close = +d.close;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .select(".domain")
      // .remove();

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      // .attr("class", "text-label")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});

svg.selectAll("g")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll("g").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })
  })

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];
      console.log(mousex);
      var invertedx = x.invert(mousex);
      console.log(intertedx);
      invertedx = invertedx.getMonth() + invertedx.getDate();
      console.log("a "+intertedx);
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

      mousedate = datearray.indexOf(invertedx);
      pro = d.values[mousedate].value;

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"),
      tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");

    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
  })
