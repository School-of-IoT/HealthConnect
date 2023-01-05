var mqttserver ="";
var mqttuser ="";
var mqttpass ="";

user = sessionStorage.getItem('user');
token = sessionStorage.getItem('token');
let formData = {
        user: user,
        token: token,
    };

(function ($) {
    "use strict";
    
    $.ajax({
        type: "GET",
        url: "https://healthconnect-server.onrender.com/devtkn/portal",
        data : formData,
        crossDomain: true,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        mqttserver = data.mqttserver;
        mqttuser = data.mqttUser;
        mqttpass = data.mqttPass;
      }).fail(function (data) {
       console.log("Device Portal Check Failed")
      });
})(jQuery);

var ID = "";
function startConnect(dev_id) {
    host = mqttserver;
    port = 8884;
    ID = "node-"+dev_id;
    
    let act = "Connecting to: " + host + ' on port: ' + port + ', with Node ID - ' + ID;
    // Print output for the user in the messages div
    console.log(act);
    clientID = "clientID-"+dev_id;
    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
        userName: mqttuser,
        password: mqttpass,
        useSSL: true
    });
   console.log("Connected");

    let loc = 'td.' + ID;
    let dvof = 'device-offline '+ID;
    let dvon = 'device-online '+ID;
   if($(loc).hasClass(dvof)){
    $(loc).removeClass('device-offline');
    $(loc).addClass('device-online');
   }

}

// Called when the client connects
function onConnect() {
    // MQTT topic to subscribe 
    topic = "data/patient/"+sessionStorage.getItem('user')+"/med/"+ID;
    // Print output for the user in the messages div
    let act = "Subscribing to: " + topic;
    console.log(act);

    // Subscribe to the requested topic
    client.subscribe(topic);

}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection Lost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    //console.log(message.payloadString);
    var values = message.payloadString.split(',');
            //console.log(values);
    if(values[0]!=0){
        $('.dbp').text(values[0]); 
    }
    if(values[1]!=0){
        $('.sbp').text(values[1]);
    }
    if(values[2]!=0){
        $('.heartrate').text(values[2]);
    }
    if(values[3]!=0){
        $('.respiration').text(values[3]);
    }
    if(values[4]!=0){
        $('.spo2').text(values[4]);
    }
    if(values[5]!=0){
        $('.temp').text(values[5]);
    }
    if(values[6]!=0){
        $('.fio2').text(values[6]);
    }      
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    //console.log("Disconnected");
}
