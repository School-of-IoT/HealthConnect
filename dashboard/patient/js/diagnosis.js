var arrayLength = 60
var newArray = []

for(var i = 0; i < arrayLength; i++) {
  var y = Math.round(Math.random()*10) + 1
  newArray[i] = y
}

Plotly.plot('sys-heart-graph', [{
  y: newArray,
  mode: 'lines',
  line: {
    color: '#80CAF6',
    shape: 'spline'
  }
}]);

var cnt = 0;

var interval = setInterval(function() {
  
  var y = Math.round(Math.random()*10) + 1
  newArray = newArray.concat(y)
  newArray.splice(0, 1)
  
  var data_update = {
    y: [newArray]
  };
  
  Plotly.update('sys-heart-graph', data_update)
  
  if(cnt === 20) clearInterval(interval);
}, 500); 
