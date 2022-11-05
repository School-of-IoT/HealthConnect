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
        //console.log(data.patient[0]._id);
        if (data.message == "Token does not match. Try to Login Again."){
          window.location.href="../../login/"
        }
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
        //sessionStorage.setItem('devtoken', data.patient[0].devtoken);
        $('.key-setting .key-value').text(data.patient[0].devtoken);
      }).fail(function (data) {
        //console.log("failed");
        window.location.href="../../login/"
      });


})(jQuery);
