(function ($) {
    "use strict";

    
    var uid = sessionStorage.getItem('uid');
    var auth = sessionStorage.getItem('auth');
    let formData = {
            uid: uid,
            auth: auth,
          };
    
    $.ajax({
        type: "GET",
        url: "https://healthconnect-server.herokuapp.com/data",
        data : formData,
        crossDomain: true,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        console.log(data.patient._id);
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
        console.log("failed");
        window.location.href="../../login/"
      });
    
    
    $(".log_out").click(function(){
      sessionStorage.removeItem('uid');
      location.href = "../../login/"
    });
    
    $.ajax({
        type: "GET",
        url: "https://api.ipgeolocation.io/ipgeo?apiKey=6bde9878f4a446de82bf535dddf501b4",
        dataType: "json",
        encode: true,
      }).done(function (data) {
        console.log(data.city);
        sessionStorage.setItem('geo_loc',data.city);
        
      }).fail(function (data) {
        console.log("failed");
      });
      var map_link = "https://maps.google.com/maps?q=hospitals%20in%20"+sessionStorage.getItem('geo_loc')+"&t=&z=10&ie=UTF8&iwloc=&output=embed";
      $('#hospital-map').attr('src', map_link);

})(jQuery);
