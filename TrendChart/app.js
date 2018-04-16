
console.log("herehere");

var parseDate  = d3.timeFormat('%Y-%m-%d').parse;
var parseRaw = d3.json("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=8YAFUPKJFYP2I4EV", function (error, rawData) {
  // if (error) {
  //   console.error(error);
  //   console.log("error();");
  //   return;
  // }

  // var data = rawData.map(function (d) {
  //   return {
  //     date:  parseDate(d.date),
  //     pct05: d.pct05 / 1000,
  //     pct25: d.pct25 / 1000,
  //     pct50: d.pct50 / 1000,
  //     pct75: d.pct75 / 1000,
  //     pct95: d.pct95 / 1000
  //   };
  // });

  // console.log("here");

  // console.log(parseRaw["Meta Data"]);
  var data = rawData.map(function (d) {
    return {
      date:  parseDate(d.date),
      pct05: d.pct05 / 1000,
      pct25: d.pct25 / 1000,
      pct50: d.pct50 / 1000,
      pct75: d.pct75 / 1000,
      pct95: d.pct95 / 1000
    };
  });

  return rawData;
});

var sample = {
    "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "MSFT",
        "3. Last Refreshed": "2018-03-23 11:37:41",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2018-03-23": {
            "1. open": "89.5000",
            "2. high": "90.4600",
            "3. low": "88.9300",
            "4. close": "89.3100",
            "5. volume": "14495906"
        },
        "2018-03-22": {
            "1. open": "91.2650",
            "2. high": "91.7500",
            "3. low": "89.6600",
            "4. close": "89.7900",
            "5. volume": "38353725"
        }
      }
    }
console.log(sample);
console.log(sample["Meta Data"]["2. Symbol"]);
console.log(sample["Time Series (Daily)"]);

// var list = sample["Time Series (Daily)"].map(function (d) {
//   return {
//     date:  parseDate(d),
//     close: d["4. close"]
//   };
// })
var temp = sample["Time Series (Daily)"];
var result = Object.entries(sample["Time Series (Daily)"]);
console.log(result);

var list = Object.entries(sample["Time Series (Daily)"]).map(function (d) {
  return {
    date:  d[0],
    close: d[1]["4. close"]
  };
})
console.log(list);


console.log("end");
console.log(parseRaw);
// var parsed = JSON.parse(parseRaw);
// var data = d3.request("data.txt")
//   .mimeType("text/plain")
//
// console.log(data);
