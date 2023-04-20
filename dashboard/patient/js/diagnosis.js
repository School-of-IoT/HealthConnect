var arrayLength = 60
var newArray1 = []
var newArray3 = []
var newArray4 = []

for(var i = 0; i < arrayLength; i++) {
  newArray1[i] = 0
  newArray3[i] = 0
  newArray4[i] = 0
}

Plotly.plot('ecg-graph', [{
  y: newArray1,
  mode: 'lines',
  line: {
    color: '#80CAF6',
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


var ECG_VAL =[0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, 0.5]
var RESP =[0.3, 0.3, 0.8, 1.3, 1.3, 1.3, 1.5, 1.5, 2, 2, 1.5, 1.5, 0.5, 0, 0, 0.3, 0.8, 1, 1.3, 1.3, 1.5, 1.5, 2, 2, 1.5, 1.5, 0.5, 0.5]

var cnt = 0;
var data = false
var j=0
var k=0

var interval = setInterval(function() {
  
  if(data){
    var y1 = ECG_VAL[j]*10
    var y3 = Math.round(Math.random()*10) + 1
    var y4 = Math.round(RESP[j]*10)
    j=j+1
  }
  else{
    var y1 = 0
    var y3 = 0
    var y4 = 0
    k=k+1
  }

  
  newArray1 = newArray1.concat(y1)
  newArray1.splice(0, 1)
  newArray3 = newArray3.concat(y3)
  newArray3.splice(0, 1)
  newArray4 = newArray4.concat(y4)
  newArray4.splice(0, 1)

  var data_update1 = {
    y: [newArray1]
  };
  var data_update3 = {
    y: [newArray3]
  };
  var data_update4 = {
    y: [newArray4]
  };

  
  Plotly.update('ecg-graph', data_update1)
  Plotly.update('spo2-graph', data_update3)
  Plotly.update('resp-graph', data_update4)
  
  if(j >= ECG_VAL.length){
    data=false; 
    j=0
  }
  if(k >= 9){
    data=true; 
    k=0
  }

  
  
  if(cnt === 500) clearInterval(interval);
}, 5);  // change to '5' for demo and '5000' during development of css
