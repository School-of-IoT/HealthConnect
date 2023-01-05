
(function ($) {
    "use strict";

    var user = sessionStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    
    $(".log_out").click(function(){
      sessionStorage.removeItem('uid');
      location.href = "../../login/"
    });

    

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