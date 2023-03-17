var mqttserver ="";
var mqttuser ="";
var mqttpass ="";
var client = Object.create(null);
var server_line = false;
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


function server_Connection(){
    if (server_line){
        
        
        
        server_line = false;
        $('button.dev-table-btn-disconnect').click(); //unsubscribes from All the devices

        client.disconnect();
        $('button.s-btn-func-cnnct').css("background-color", '#27b332');
        $('button.s-btn-func-cnnct').css("border-color", '#27b332');
        $('button.s-btn-func-cnnct').html("Connect");
        console.log("Disconnected");
    }
    else{
        host = mqttserver;
        port = 8884;
        let act = "Connecting to: " + host + ' on port: ' + port;
        console.log(act);

        clientID = "clientID-"+Math.floor((Math.random() * 99999999) + 11111111);

        // Initialize new Paho client connection
        client = new Paho.MQTT.Client(host, Number(port), clientID);
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;

        function onConnect() {
            //Display ONLINE signal on frame
            $('button.s-btn-func-cnnct').css("background-color", '#cb0000');
            $('button.s-btn-func-cnnct').css("border-color", '#cb0000');
            $('button.s-btn-func-cnnct').html("Disconnect");
            console.log("Connected");
            server_line = true;
        }

        // Connect the client, if successful, call onConnect function
        client.connect({ 
            onSuccess: onConnect,
            userName: mqttuser,
            password: mqttpass,
            useSSL: true
        });
    }
}

function startLIVE(dev_id) {
    
    let ID = "node-"+dev_id;
    topic = "data/patient/"+sessionStorage.getItem('user')+"/med/"+ID;
    
    // Print output for the user in the messages div
    let act = "Subscribing to: " + topic;
    console.log(act);

    // Subscribe to the requested topic
    client.subscribe(topic);
    
   // Change connection signal
    let loc = 'td.' + ID;
    let dvof = 'device-offline';
    if($(loc).hasClass(dvof)){
        $(loc).removeClass('device-offline');
        $(loc).addClass('device-online');
    }

    // Change connection button
    let bt_of= 'button.dev-table-btn-disconnect';
    let bt_on= 'button.dev-table-btn-connect';
        if($(bt_on).hasClass(ID)){
            let on_loc = bt_on+'.'+ID;
            $(on_loc).hide();
            let of_loc = bt_of+'.'+ID;
            $(of_loc).show();
        }
        
    // Start Diagnosis graph (based on button)
    let dev_on = '.device-online';
    if($(dev_on).hasClass(ID)){
        let val = document.getElementById(ID).children[3].innerHTML;
        let dum = document.getElementById(ID).children[1].innerHTML == 'Test Sample';
        let values = val.split(',');
        for(i=0; i<values.length; i++){
            if(values[i] == 'dbp'){
                if (dum) ECG_Dummy(); // if device containing above attr online, then play this
            }
            if(values[i] == 'sbp'){
                if (dum) ECG_Dummy();
            }
            if(values[i] == 'resp'){
                if (dum) SPO2_Dummy();
            }
            if(values[i] == 'spo2'){
                if (dum) SPO2_Dummy();
            }
            if(values[i] == 'temp'){
                if (dum) TEMP_Dummy();
            }
            if(values[i] == 'fio2'){
                if (dum) SPO2_Dummy();
            }
        }
    }    
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
    let values = message.payloadString.split(',');
            //console.log(values);
    if(values[0]!=0){
        $('.dbp-text').text(values[0]); 
    }
    if(values[1]!=0){
        $('.sbp-text').text(values[1]);
    }
    if(values[2]!=0){
        $('.hr-text').text(values[2]);
    }
    if(values[3]!=0){
        $('.resp-text').text(values[3]);
    }
    if(values[4]!=0){
        $('.spo2-text').text(values[4]);
    }
    if(values[5]!=0){
        $('.temp-text').text(values[5]);
    }
    if(values[6]!=0){
        $('.fio2-text').text(values[6]);
    }      
}

// Called when the disconnection button is pressed
function stopLIVE(dev_id) {
   
    let ID = "node-"+dev_id;
    let dev_on = '.device-online';
    
    topic = "data/patient/"+sessionStorage.getItem('user')+"/med/"+ID;
    client.unsubscribe(topic);
    let act = "Unsubscribing to: " + topic;
    console.log(act);

    if($(dev_on).hasClass(ID)){
        let val = document.getElementById(ID).children[3].innerHTML;
        let values = val.split(',');
                //console.log(values);
        for(i=0; i<values.length; i++){
            if(values[i] == 'dbp'){
                ecg_data = false;
            }
            else if(values[i] == 'sbp'){
                ecg_data = false;
            }
            else if(values[i] == 'resp'){
                spo2_data = false;
            }
            else if(values[i] == 'spo2'){
                spo2_data = false;
            }
            else if(values[i] == 'temp'){
                temp_data = false;
            }
            else if(values[i] == 'fio2'){
                spo2_data = false;
            }
        }
    }
    
    let loc = 'td.' + ID;
    let dvon = 'device-online';
    if($(loc).hasClass(dvon)){
        $(loc).removeClass('device-online');
        $(loc).addClass('device-offline');
    }

    // Change connection button
   let bt_of= 'button.dev-table-btn-disconnect';
   let bt_on= 'button.dev-table-btn-connect';
    if($(bt_of).hasClass(ID)){
        let on_loc = bt_on+'.'+ID;
        
        let of_loc = bt_of+'.'+ID;
        $(of_loc).hide();
        $(on_loc).show();
    }

    //client.disconnect();
    //console.log("Disconnected");
}
