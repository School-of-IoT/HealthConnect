var ecg_data = false;
var spo2_data = false;
var temp_data = false;

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

var arrayLength = 120
var ecg_arr = []
var spo2_arr = []
var temp_arr = []

for(var i = 0; i < arrayLength; i++) {
  ecg_arr[i] = 0
  spo2_arr[i] = 0
  temp_arr[i] = 0
}

var arrayLength_live = 200
var arrayLength_live_temp = 50
var ecg_arr_live = []
var spo2_arr_live = []
var temp_arr_live = []

for(var i = 0; i < arrayLength_live; i++) {
  ecg_arr_live[i] = 0
  spo2_arr_live[i] = 0
}
for(var i = 0; i < arrayLength_live_temp; i++) {
  temp_arr_live[i] = 0
}


var SPO2_VAL ="";
var FIO2_VAL ="";
var ECG_VAL ="";
var TEMP_VAL = "";


//Creating plot graphs with specifications
Plotly.plot('ecg-graph', [{
  y: ecg_arr,
  mode: 'lines',
  line: {
    color: '#80CAF6',
    shape: 'spline'
  },
}],
{
  yaxis: {
    range: [
      1000,
      5000
    ]
  }
});

Plotly.plot('spo2-graph', [{
  y: spo2_arr,
  mode: 'lines',
  line: {
    color: '#bf80f6',
    shape: 'spline'
  }
}]);

Plotly.plot('resp-graph', [{
 y: spo2_arr,
  mode: 'lines',
  line: {
    color: '#a4e864',
    shape: 'spline'
  }
}]);

Plotly.plot('temp-graph', [{
 y: temp_arr,
  mode: 'lines',
  line: {
    color: '#a4e864',
    shape: 'spline'
  }
}]);

/* -------------- DATA Manipulation for Graphs ----------------*/
var SPO2_VAL_DUMMY =[0.3, 0.3, 0.8, 1.3, 1.3, 1.3, 1.5, 1.5, 2, 2, 1.5, 1.5, 0.5, 0, 0, 0.3, 0.8, 1, 1.3, 1.3, 1.5, 1.5, 2, 2, 1.5, 1.5, 0.5, 0.5]
var TEMP_VAL_DUMMY =[0.5, 0.4, 0.4, 0.3, 0.5, 0.4, 0.4, 0.3, 0.4, 0.4, 0.3, 0.3, 0.5, 0, 0, 0.3, 0.8, 0.5, 0.4, 0.4, 0.3, 1.5, 2, 0.5, 0.4, 0.4, 0.3, 0.5]
var ECG_VAL_DUMMY =[0, 0, 0, 0, 0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, , 0, 0, 0, 0, 0, 0, 0, 0.5, 0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, -0.25, 2.5, -2, 0.5, 1, -0.5, 0.5, 0.5, 0, 0, 0, 0]

async function TEMP_Dummy_Run(data, j, k) {
  if (!temp_data){
    return;
  }
  let y =0;
  if(data){
    y = Math.round(TEMP_VAL_DUMMY[j]*10) //temp
    j=j+1
  }
  else{
    y = 0 //temp
    k=k+1
  }
  temp_arr = temp_arr.concat(y)
  temp_arr.splice(0, 1)
  let temp = {
    y: [temp_arr]
  };
  Plotly.update('temp-graph', temp);
  if(j >= TEMP_VAL_DUMMY.length){
    data=false; 
    j=0;
  }
  if(k >= 9){
    data=true; 
    k=0;
  }
  //console.log(j);
  await sleep(50);// change to '5' for demo and '5000' during development of css 
  TEMP_Dummy_Run(data, j, k);
}


async function SPO2_Dummy_Run(data, j, k) {
  if (!spo2_data){
    return;
  }
  let y = 0;
  if(data){
    y = Math.round(SPO2_VAL_DUMMY[j]*10) //spo2
    j=j+1
  }
  else{
    y = 0 //spo2
    k=k+1
  }
  spo2_arr = spo2_arr.concat(y)
  spo2_arr.splice(0, 1)
  let spo2 = {
    y: [spo2_arr]
  };
  var data_update5 = {
    y: [newArray5]
  };

  Plotly.update('spo2-graph', spo2);
  
if(j >= SPO2_VAL_DUMMY.length){
  data=false; 
    j=0;
  }
  if(k >= 9){
    data=true; 
    k=0;
  }
  //console.log(j);
  await sleep(50);// change to '5' for demo and '5000' during development of css 
  SPO2_Dummy_Run(data, j, k);
}

async function ECG_Dummy_Run(data, j, k) {
  if (!ecg_data){
    return;
  }
  let y = 0;
  if(data){
    y = ECG_VAL_DUMMY[j]*10  //ecg
    j=j+1
  }
  else{
    y = 0
    k=k+1
  }
  /* Delete from behind, add in front  */
  ecg_arr = ecg_arr.concat(y)
  ecg_arr.splice(0, 1)
  let ecg = {
    y: [ecg_arr]
  };
  Plotly.update('ecg-graph', ecg);  
  if(j >= ECG_VAL_DUMMY.length){ 
    data=false; 
    j=0
  }
  if(k >= 9){ //fill data in array
    data=true; 
    k=0
  }
console.log(j);
  await sleep(50);// change to '5' for demo and '5000' during development of css 
  ECG_Dummy_Run(data, j, k);
}  

function ECG_Dummy(){
  ecg_data = true;
  ECG_Dummy_Run(false, 0, 0);
}
function SPO2_Dummy(){
  spo2_data = true;
  SPO2_Dummy_Run(false, 0, 0);
}
function TEMP_Dummy(){
  temp_data = true;
  TEMP_Dummy_Run(false, 0, 0);
}

/* ***********************************END OF DUMMY************************************** */


/* ******************************** LIVE ******************************** */


async function SPO2_Run(data, j, k) {
  if (!spo2_data){
    return;
  }
  y = Math.round(SPO2_VAL[j]/10) //spo2
  j=j+1;

  spo2_arr_live = spo2_arr_live.concat(y)
  spo2_arr_live.splice(0, 1)
  let spo2 = {
    y: [spo2_arr_live]
  };
  console.log(spo2);
  Plotly.update('spo2-graph', spo2);
  if(j >= SPO2_VAL.length){  
    j=0;
  }
  //console.log(j);
  await sleep(100);// change to '5' for demo and '5000' during development of css
  SPO2_Run(data, j, k);
}

function SPO2_LIVE(){
  spo2_data = true;
  SPO2_Run(false, 0, 0);
}

async function ECG_Run(data, j, k) {
  if (!ecg_data){
    return;
  }
  
  y = Math.round(ECG_VAL[j]) //ecg
  j=j+1;
  
  ecg_arr_live = ecg_arr_live.concat(y)
  ecg_arr_live.splice(0, 1);
  
  let ecg = {
    y: [ecg_arr_live]
  };
  //console.log(y);
  Plotly.update('ecg-graph', ecg);
  if(j >= ECG_VAL.length){  
    j=0;
  }
  //console.log(j);
  await sleep(1);// change to '5' for demo and '5000' during development of css
  ECG_Run(data, j, k);
}

function ECG_LIVE(){
  ecg_data = true;
  ECG_Run(false, 0, 0);
}

async function TEMP_Run(data, j, k) {
  if (!temp_data){
    return;
  }
  y = Math.round(TEMP_VAL[j]) //temp
  j=j+1;

  temp_arr_live = temp_arr_live.concat(y)
  temp_arr_live.splice(0, 1);
  
  let temp = {
    y: [temp_arr_live]
  };
  //console.log(y);
  Plotly.update('temp-graph', temp);
  if(j >= TEMP_VAL.length){  
    j=0;
  }
  //console.log(j);
  await sleep(5000);
  TEMP_Run(data, j, k);
}

function TEMP_LIVE(){
  TEMP_data = true;
  TEMP_Run(false, 0, 0);
}