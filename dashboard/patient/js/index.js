var patID="";

(function ($) {
    "use strict";

    
    var user = sessionStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    let formData = {
            user: user,
            token: token,
          };
    
    $.ajax({
        type: "GET",
        url: "https://healthconnect-server.herokuapp.com/data",
        data : formData,
        crossDomain: true,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        patID=data.patient[0]._id;
        $('.username').text(data.patient[0].Name);
        $('.chills').text(data.patient[0].Chills);
        $('.dbp').text(data.patient[0].DBP);
        $('.sbp').text(data.patient[0].SBP);
        $('.heartrate').text(data.patient[0].HeartRate);
        $('.respiration').text(data.patient[0].RR);
        $('.spo2').text(data.patient[0].SpO2);
        $('.bloodg').text(data.patient[0].BGroup);
        $('.temp').text(data.patient[0].Temp);
        $('.ambulation').text(data.patient[0].Ambulation);
        $('.fever').text(data.patient[0].HistoryFever);
        $('.bmi').text(data.patient[0].BMI);
        $('.fio2').text(data.patient[0].FiO2);
      }).fail(function (data) {
        //console.log("failed");
        window.location.href="../../login/"
      });
    
    
    $(".log_out").click(function(){
      sessionStorage.removeItem('uid');
      location.href = "../../login/"
    });


    $.ajax({
      type: "GET",
      url: "https://healthconnect-server.herokuapp.com/geo_locate/"+user,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      
      $.ajax({
        type: "GET",
        url: "https://api.ipgeolocation.io/ipgeo?apiKey=" + data.geo_api,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        //console.log(data.city);
        sessionStorage.setItem('geo_loc',data.city);
        
      }).fail(function (data) {
        console.log("api failed");
      });
      
    }).fail(function (data) {
      console.log("geo server failed");
    });

    
    
      var map_link = "https://maps.google.com/maps?q=hospitals%20in%20"+sessionStorage.getItem('geo_loc')+"&t=&z=10&ie=UTF8&iwloc=&output=embed";
      $('#hospital-map').attr('src', map_link);

      let min_meet_time = new Date().toJSON().slice(0, 16);
      
      $('#meeting-time').attr('min', min_meet_time);

      function updatePatient(){

        let url = "https://healthconnect-server.herokuapp.com/patient/update/" + patID;

        let formData = 
        {
          "patientData":{
              "SBP":	$('.sbp.number').text(),
              "DBP":  $('.dbp.number').text(),
              "HeartRate": $('.heartrate.number').text(),
              "RR": $('.respiration.number').text(),
              "SpO2": $('.spo2.number').text(),
              "Temp": $('.temp.number').text(),
              "FiO2": $('.fio2.number').text()
          }
        };

        

        $.ajax({
          type: "PUT",
          url: url,
          data : JSON.stringify(formData),
          crossDomain: true,
          dataType: "json",
          encode: true,
          headers: {
            "Content-Type": "application/json"
          },
          processData: false,
        }).done(function (data) {
          console.log("Updated");
          
        }).fail(function (data) {
          console.log("update failed");
          
        });

      }

      //setInterval(updatePatient, 60000*10); //every 10 mins

})(jQuery);

$('.key-setting').hide();
  $('.pop-up').hide();

function view_key_modal(){
  $('.key-setting').show();
  $('.pop-up').show();  
  $('#blur').css('filter', 'blur(5px)');   
}
function close_key(){
  $('.key-setting').hide();
  $('.pop-up').hide();   
  $('#blur').css('filter', 'blur(0px)');   
}