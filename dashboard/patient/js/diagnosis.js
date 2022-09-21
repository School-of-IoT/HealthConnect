var arrayLength = 60
var newArray = []

for(var i = 0; i < arrayLength; i++) {
  var y1 = Math.round(Math.random()*10) + 1
  var y2 = Math.round(Math.random()*10) + 1
  var y3 = Math.round(Math.random()*10) + 1
  var y4 = Math.round(Math.random()*10) + 1
  newArray[i] = y1
  newArray[i] = y2
  newArray[i] = y3
  newArray[i] = y4
}

Plotly.plot('sys-heart-graph', [{
  y1: newArray,
  mode: 'lines',
  line: {
    color: '#80CAF6',
    shape: 'spline'
  }
}]);

Plotly.plot('dia-heart-graph', [{
  y2: newArray,
  mode: 'lines',
  line: {
    color: '#f680c1',
    shape: 'spline'
  }
}]);

Plotly.plot('spo2-graph', [{
  y3: newArray,
  mode: 'lines',
  line: {
    color: '#bf80f6',
    shape: 'spline'
  }
}]);

Plotly.plot('resp-graph', [{
  y4: newArray,
  mode: 'lines',
  line: {
    color: '#a4e864',
    shape: 'spline'
  }
}]);

var cnt = 0;

var interval = setInterval(function() {
  
  var y = Math.round(Math.random()*10) + 1
  newArray = newArray1.concat(y)
  newArray.splice(0, 1)
  
  var data_update = {
    y: [newArray]
  };

  
  Plotly.update('sys-heart-graph', data_update)
  Plotly.update('dia-heart-graph', data_update)
  Plotly.update('spo2-graph', data_update)
  Plotly.update('resp-graph', data_update)
  
  if(cnt === 20) clearInterval(interval);
}, 500); 
