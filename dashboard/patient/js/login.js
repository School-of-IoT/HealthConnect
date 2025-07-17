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
        url: "https://healthconnect-server.onrender.com/api/v2/lastdata",
        data : formData,
        crossDomain: true,
        dataType: "json",
        encode: true,
      }).done(function (data) {
  
        if (data.message == "Token does not match. Try to Login Again."){
          window.location.href="../../login/"
        }

        $('.username').text(data.patient.Name);
        $('.chills').text(data.patient.Chills);         
        $('.bloodg').text(data.patient.BGroup);         
        $('.ambulation').text(data.patient.Ambulation);
        $('.fever').text(data.patient.HistoryFever);
        $('.bmi').text(data.patient.BMI);
        $('.dbp-text').text(data.patient.latestHealthData.DBP);
        $('.sbp-text').text(data.patient.latestHealthData.SBP);
        $('.fio2-text').text(data.patient.latestHealthData.FiO2);
        $('.resp-text').text(data.patient.latestHealthData.RR);
        $('.spo2-text').text(data.patient.latestHealthData.SpO2);
        $('.temp-text').text(data.patient.latestHealthData.Temp);
        $('.hr-text').text(data.patient.latestHealthData.HRV);
        $('.key-setting .key-value').text(data.patient.devtoken);
        
        preLoaderHandler();
        /* -----------------------  DEVICES SECTION  ----------------------- */

        if ($('.no-device').css("display") != "none"){
          let len = data.patient.devices.length;
          //console.log(len);
          for(let i=0; i<len; i++){
            insert_node(data.patient.devices[i].lastUp, data.patient.devices[i].node.slice(5), data.patient.devices[i].attribute, data.patient.devices[i].type);
          }
        }
        /* ----------------------------------------------------------------- */
        
        /* -----------------------  ADDING DEVICES  ----------------------- */
        $("#dev-table-body").each(function()
        {
            if($(this).children("tr").length == 0)
            {
              $('.no-device').show();
              $('.dev-list').hide();
              
            }
            else{
              $('.no-device').hide();
              $('.dev-list').show();
            }
        });
      /* ----------------------------------------------------------------- */

      }).fail(function (data) {
        //console.log("failed");
        window.location.href="../../login/"
      });

      

})(jQuery);
