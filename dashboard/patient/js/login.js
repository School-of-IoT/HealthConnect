(function ($) {
    "use strict";

    var uid = sessionStorage.getItem('uid');
    
    $.ajax({
        type: "GET",
        url: "https://healthconnect-server.herokuapp.com/patient/" + uid,
        crossDomain: true,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        console.log(data.patient._id);
        $('.username').text(data.patient.Name);
        $('.chills').text(data.patient.Chills);
        $('.dbp').text(data.patient.DBP);
        $('.sbp').text(data.patient.SBP);
        $('.heartrate').text(data.patient.HeartRate);
        $('.respiration').text(data.patient.RR);
        $('.spo2').text(data.patient.SpO2);
        $('.bloodg').text(data.patient.BGroup);
        $('.temp').text(data.patient.Temp);
        $('.ambulation').text(data.patient.Ambulation);
        $('.fever').text(data.patient.HistoryFever);
        $('.bmi').text(data.patient.BMI);
        $('.fio2').text(data.patient.FiO2);
      }).fail(function (data) {
        console.log("failed");
        window.location.href="../../login/"
      });


})(jQuery);
