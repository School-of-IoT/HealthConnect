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


function startConnect(branch) {
    switch(branch){
        case 0:
            branch = "SBP";
        case 1:
            branch = "DBP";
        case 2:
            branch = "Resp";
        case 3:
            branch = "HR";
        case 9:
            branch = "all";
        default:
            branch = "all";
    }

    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 1000);

    // Fetch the hostname/IP address and port number from the form
    host = mqttserver;
    port = 8884;
    
    let act = "Connecting to: " + host + ' on port: ' + port + ', with Client ID - ' + clientID;
    // Print output for the user in the messages div
    //console.log(act);
 
    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect(branch),
        userName: mqttuser,
        password: mqttpass,
        useSSL: true
    });
   //console.log("Connected");
}

// Called when the client connects
function onConnect(branch) {
    // Fetch the MQTT topic from the form
    topic = "data/patient/"+sessionStorage.getItem('user')+"/med/"+branch;
    //topic = "#";
    // Print output for the user in the messages div
    let act = "Subscribing to: " + topic;
    //console.log(act);

    // Subscribe to the requested topic
    client.subscribe(topic);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    //console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        //console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    //console.log(message.payloadString);

    var values = message.payloadString.split(',');
    //console.log(values);

        $('.dbp').text(values[0]);
        $('.sbp').text(values[1]);
        $('.heartrate').text(values[2]);
        $('.respiration').text(values[3]);
        $('.spo2').text(values[4]);
        $('.temp').text(values[5]);
        $('.fio2').text(values[6]);

}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    //console.log("Disconnected");
}
