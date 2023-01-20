
(function ($) {
    "use strict";

    var user = sessionStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    
    $("#log_out").click(function(){
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      location.href = "../../login/";
    });


    if ( $('.username').text() == '')
      
      {

        $.ajax({
          type: "GET",
          url: "https://healthconnect-server.onrender.com/data",
          data : formData,
          crossDomain: true,
          dataType: "json",
          encode: true,
        }).done(function (data) {
          console.log(data.patient[0]);
          if (data.message == "Token does not match. Try to Login Again."){
            window.location.href="../../login/"
          }
          preLoaderHandler();
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
          $('.key-setting .key-value').text(data.patient[0].devtoken);
          
          preLoaderHandler();
          
          let len = data.patient[0].devices.length;
          //console.log(len);
          for(let i=0; i<len; i++){
            insert_node(data.patient[0].devices[i].lastUp, data.patient[0].devices[i].node.slice(5), data.patient[0].devices[i].attribute, data.patient[0].devices[i].type);
          }
          
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
  
  
        }).fail(function (data) {
          //console.log("failed");
          window.location.href="../../login/"
        });

      }
    

if (user !=""){
      $.ajax({
        type: "GET",
        url: "https://healthconnect-server.onrender.com/geo_locate/"+user,
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

    }
    
      let min_meet_time = new Date().toJSON().slice(0, 16);
      
      $('#meeting-time').attr('min', min_meet_time);

     
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
  

})(jQuery);

$('.key-setting').hide();
$('.dev-create').hide();
$('.pop-up').hide();

function view_key_modal(){
  $('.key-setting').show();
  $('.pop-up').show();  
  $('#blur').css('filter', 'blur(5px)');   
}

function view_node_modal(){
  $('.dev-create').show();
  $('.pop-up').show();  
  $('#blur').css('filter', 'blur(5px)');   
}

function close_key(){
  $('.key-setting').hide();
  $('.dev-create').hide();
  $('.pop-up').hide();   
  $('#blur').css('filter', 'blur(0px)');   
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).html()).select();
  document.execCommand("copy");
  $temp.remove();
 }

 function gen_newkey(){
  
  let url = "https://healthconnect-server.onrender.com/devtkn/create?user="+sessionStorage.getItem('user')+"&pass="+$('input.key-pass').val();
  
  $.ajax({
    type: "GET",
    url: url,
    crossDomain: true,
    dataType: "json",
    encode: true,
    headers: {
      "Content-Type": "application/json"
    },
    processData: false,
  }).done(function (data) {
    $('.key-setting .key-value').text(data.device_token);
    $('input.key-pass').val('');
    //console.log("Updated");
  }).fail(function (data) {
    console.log("update failed");
    
  });

 }