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
        url: "https://healthconnect-server.herokuapp.com/portal/device",
        data : formData,
        crossDomain: true,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        ////console.log(data.patient[0]._id);
        mqttserver = data.mqttserver;
        mqttuser = data.mqttUser;
        mqttpass = data.mqttPass;
      }).fail(function (data) {
        window.location.href="../../login/"
      });
})(jQuery);

var ID = "";
function startConnect(dev_id) {
    

    // Generate a random client ID

    // Fetch the hostname/IP address and port number from the form
    host = mqttserver;
    port = 8883;
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
    // Fetch the MQTT topic from the form


    topic = "data/patient/"+sessionStorage.getItem('user')+"/med/"+ID;
    //topic = "#";
    // Print output for the user in the messages div
    let act = "Subscribing to: " + topic;
    console.log(act);

    // Subscribe to the requested topic
    client.subscribe(topic);

}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    let act = "Connection Lost";
    console.log(act);

//     let loc = 'td.' + ID;
//     let dvof = 'device-offline '+ID;
//     let dvon = 'device-online '+ID;
//    if($(loc).hasClass(dvon)){
//     $('loc').removeClass('device-online');
//     $('loc').addClass('device-offline');
//    }

    if (responseObject.errorCode !== 0) {
        //console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    //console.log(message.payloadString);
    var values = message.payloadString.split(',');
            //console.log(values);
    if(value[0]!=0){
        $('.dbp').text(values[0]); 
    }
    if(value[1]!=0){
        $('.sbp').text(values[1]);
    }
    if(value[2]!=0){
        $('.heartrate').text(values[2]);
    }
    if(value[3]!=0){
        $('.respiration').text(values[3]);
    }
    if(value[4]!=0){
        $('.spo2').text(values[4]);
    }
    if(value[5]!=0){
        $('.temp').text(values[5]);
    }
    if(value[6]!=0){
        $('.fio2').text(values[6]);
    }      
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    //console.log("Disconnected");
}
