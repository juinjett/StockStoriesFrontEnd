function genType(d) {
  d.timestamp  = parseDate(d.timestamp);
  d.low        = +d.low;
  d.high       = +d.high;
  d.open       = +d.open;
  d.close      = +d.close;
  d.volume   = +d.volume;
  // d.VOLATILITY = +d.VOLATILITY;
  return d;
}

function timeCompare(date, interval) {
  if (interval == "week")       { var durfn = d3.time.monday(date); }
  else if (interval == "month") { var durfn = d3.time.month(date); }
  else { var durfn = d3.time.day(date); }
  return durfn;
}

function dataCompress(data, interval) {
  var compressedData  = d3.nest()
                 .key(function(d) { return timeCompare(d.timestamp, interval); })
                 .rollup(function(v) { return {
                         timestamp:   timeCompare(d3.values(v).pop().timestamp, interval),
                         open:        d3.values(v).shift().open,
                         low:         d3.min(v, function(d) { return d.low;  }),
                         high:        d3.max(v, function(d) { return d.high; }),
                         close:       d3.values(v).pop().close,
                         volume:    d3.mean(v, function(d) { return d.volume; }),
                         // VOLATILITY:  d3.mean(v, function(d) { return d.VOLATILITY; })
                        }; })
                 .entries(data).map(function(d) { return d.values; });

  return compressedData;
}
