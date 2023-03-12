function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

var arrayLength = 60
var newArray1 = []
var newArray3 = []
var newArray4 = []
var newArray5 = []

for(var i = 0; i < arrayLength; i++) {
  newArray1[i] = 0
  newArray3[i] = 0
  newArray4[i] = 0
  newArray5[i] = 0
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

Plotly.plot('temp-graph', [{
  y: newArray5,
  mode: 'lines',
  line: {
    color: '#a4e864',
    shape: 'spline'
  }
}]);

/* -------------- DATA Manipulatino for Graphs ----------------*/

var RESP =[0.3, 0.3, 0.8, 1.3, 1.3, 1.3, 1.5, 1.5, 2, 2, 1.5, 1.5, 0.5, 0, 0, 0.3, 0.8, 1, 1.3, 1.3, 1.5, 1.5, 2, 2, 1.5, 1.5, 0.5, 0.5]
var TEMP =[0.5, 0.4, 0.4, 0.3, 0.5, 0.4, 0.4, 0.3, 0.4, 0.4, 0.3, 0.3, 0.5, 0, 0, 0.3, 0.8, 0.5, 0.4, 0.4, 0.3, 1.5, 2, 0.5, 0.4, 0.4, 0.3, 0.5]


// var data = false
// var j=0
// var k=0

var ECG_VAL =[0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, 0.5]


async function ECG_Dummy_Run(data, j, k) {
  
  if(data){
    var y1 = ECG_VAL[j]*10
    var y3 = Math.round(Math.random()*10) + 1
    var y4 = Math.round(RESP[j]*10)
    var y5 = Math.round(RESP[j]*10)
    j=j+1
  }
  else{
    var y1 = 0
    var y3 = 0
    var y4 = 0
    var y5 = 0
    k=k+1
  }

  /* Delete from behind, add in front  */

  newArray1 = newArray1.concat(y1)
  newArray1.splice(0, 1)
  newArray3 = newArray3.concat(y3)
  newArray3.splice(0, 1)
  newArray4 = newArray4.concat(y4)
  newArray4.splice(0, 1)
  newArray5 = newArray5.concat(y5)
  newArray5.splice(0, 1)

  var data_update1 = {
    y: [newArray1]
  };
  var data_update3 = {
    y: [newArray3]
  };
  var data_update4 = {
    y: [newArray4]
  };
  var data_update5 = {
    y: [newArray5]
  };

  
  Plotly.update('ecg-graph', data_update1)
  Plotly.update('spo2-graph', data_update3)
  Plotly.update('resp-graph', data_update4)
  Plotly.update('temp-graph', data_update5)
  
  if(j >= ECG_VAL.length){
    data=false; 
    j=0
  }
  if(k >= 9){
    data=true; 
    k=0
  }
  //console.log(j);
  await sleep(5);// change to '5' for demo and '5000' during development of css 

  ECG_Dummy_Run(data, j, k);

}  

function ECG_Dummy(){
  ECG_Dummy_Run(false, 0, 0);
}