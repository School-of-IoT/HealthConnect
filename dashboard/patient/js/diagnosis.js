var arrayLength = 60
var newArray1 = []
var newArray2 = []
var newArray3 = []
var newArray4 = []

for(var i = 0; i < arrayLength; i++) {
  newArray1[i] = Math.round(Math.random()*10) + 1
  newArray2[i] = Math.round(Math.random()*10) + 1
  newArray3[i] = Math.round(Math.random()*10) + 1
  newArray4[i] = Math.round(Math.random()*10) + 1
}

Plotly.plot('sys-heart-graph', [{
  y: newArray1,
  mode: 'lines',
  line: {
    color: '#80CAF6',
    shape: 'spline'
  }
}]);

Plotly.plot('dia-heart-graph', [{
  y: newArray2,
  mode: 'lines',
  line: {
    color: '#f680c1',
    shape: 'spline'
  }
}]);

Plotly.plot('spo2-graph', [{
  y: newArray3,
  mode: 'lines',
  line: {
    color: '#bf80f6',
    shape: 'spline'
  }
}]);

Plotly.plot('resp-graph', [{
  y: newArray4,
  mode: 'lines',
  line: {
    color: '#a4e864',
    shape: 'spline'
  }
}]);

var cnt = 0;

var interval = setInterval(function() {
  
  var y1 = Math.round(Math.random()*10) + 1
  var y2 = Math.round(Math.random()*10) + 1
  var y3 = Math.round(Math.random()*10) + 1
  var y4 = Math.round(Math.random()*10) + 1
  
  newArray1 = newArray1.concat(y1)
  newArray1.splice(0, 1)
  newArray2 = newArray2.concat(y2)
  newArray2.splice(0, 1)
  newArray3 = newArray3.concat(y3)
  newArray3.splice(0, 1)
  newArray4 = newArray4.concat(y4)
  newArray4.splice(0, 1)

  var data_update1 = {
    y: [newArray1]
  };
  var data_update2 = {
    y: [newArray2]
  };
  var data_update3 = {
    y: [newArray3]
  };
  var data_update4 = {
    y: [newArray4]
  };

  
  Plotly.update('sys-heart-graph', data_update1)
  Plotly.update('dia-heart-graph', data_update2)
  Plotly.update('spo2-graph', data_update3)
  Plotly.update('resp-graph', data_update4)
  
  if(cnt === 20) clearInterval(interval);
}, 500); 
