function menu(recivedData) {
  var trace1 = {

    x: recivedData['x'],

    close: recivedData['close'],

    high: recivedData['high'],

    low: recivedData['low'],

    open: recivedData['open'],

    decreasing: {line: {color: 'red'}},

    increasing: {line: {color: 'green'}},

    line: {line: {color: 'black'}},

    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y',
  };

  var data = [trace1];

  var layout = {
    dragmode: 'zoom',
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      range: ['2017-01-03 12:00', '2017-02-15 12:00'],
      rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
      title: 'Date',
      type: 'date'
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      range: [114.609999778, 137.410004222],
      type: 'linear'
    },

    annotations: recivedData['annotations']
  };

  Plotly.newPlot('myDiv', data, layout);
}
