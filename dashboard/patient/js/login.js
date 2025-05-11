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
        url: "https://healthconnect-server.onrender.com/api/v1/data",
        data : formData,
        crossDomain: true,
        dataType: "json",
        encode: true,
      }).done(function (data) {
  
        if (data.message == "Token does not match. Try to Login Again."){
          window.location.href="../../login/"
        }

        $('.username').text(data.patient[0].Name);
        $('.chills').text(data.patient[0].Chills);
        $('.dbp-text').text(data.patient[0].DBP);
        $('.sbp-text').text(data.patient[0].SBP);
        $('.hr-text').text(data.patient[0].HeartRate);
        $('.resp-text').text(data.patient[0].RR);
        $('.spo2-text').text(data.patient[0].SpO2);
        $('.bloodg').text(data.patient[0].BGroup);
        $('.temp-text').text(data.patient[0].Temp);
        $('.ambulation').text(data.patient[0].Ambulation);
        $('.fever').text(data.patient[0].HistoryFever);
        $('.bmi').text(data.patient[0].BMI);
        $('.fio2-text').text(data.patient[0].FiO2);
        $('.key-setting .key-value').text(data.patient[0].devtoken);
        
        preLoaderHandler();
        /* -----------------------  DEVICES SECTION  ----------------------- */

        if ($('.no-device').css("display") != "none"){
          let len = data.patient[0].devices.length;
          //console.log(len);
          for(let i=0; i<len; i++){
            insert_node(data.patient[0].devices[i].lastUp, data.patient[0].devices[i].node.slice(5), data.patient[0].devices[i].attribute, data.patient[0].devices[i].type);
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
