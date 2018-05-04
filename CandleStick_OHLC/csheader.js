function csheader() {

function cshrender(selection) {
  selection.each(function(data) {

    var interval   = TIntervals[TPeriod];
    var format     = (interval=="month")?d3.time.format("%b %Y"):d3.time.format("%b %d %Y");
    var dateprefix = (interval=="month")?"Month of ":(interval=="week")?"Week of ":"";
    d3.select("#infodate").text(dateprefix + format(data.timestamp));
    d3.select("#infoopen").text("O " + data.open);
    d3.select("#infohigh").text("H " + data.high);
    d3.select("#infolow").text("L " + data.low);
    d3.select("#infoclose").text("C " + data.close);
    d3.select("#infovolume").text("V " + (data.volume/1000000).toFixed(3) + "M");

  });
} // cshrender

return cshrender;
} // csheader
