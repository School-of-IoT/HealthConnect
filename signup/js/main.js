

function setCookie(uid,value,exp_days) {
    let d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookies = uid + "=" + value + ";" + expires + ";path=/";
}

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
   
    /*=============== [ Validate ]  ===============*/
    let input1 = $('#pass1');
    let input2 = $('#pass2');

    $('.validate-form').on('submit',function(event){
        
        $(".loader").css("visibility", "visible");
        
        let check = true;

        for(let i=0; i<input1.length; i++) {
            if(validate(input1[i]) == false){
                showValidate(input1[i]);
                check=false;
            }
        }

        if(input1 != input2){
            showValidate(input1[i]);
            check=false;
        }

        let userinput = document.getElementById("birthdate").value;  
        let dob = new Date(userinput); 
        let month_diff = Date.now() - dob.getTime();  
        let age_dt = new Date(month_diff);   
        let year = age_dt.getUTCFullYear();  
        let age = Math.abs(year - 1970);  
     
        let formData = {
            user: $("#username").val(),
            pass: $("#pass1").val(),
            // name: $("#name").val(),
            // phone: $("#phone").val(),
            // address: $("address").val(),
            // age: age,
          };

        $.ajax({
            type: "GET",
            url: "https://healthconnect-server.herokuapp.com/patient/signup",
            crossDomain: true,
            data: formData,
            dataType: "json",
            encode: true,
          }).done(function (data) {
            console.log(data.patient[0]._id);
            sessionStorage.setItem('uid',data.patient[0]._id);
            //setCookie("uid", data.patient[0]._id, 1);
            location.href = "../login";
          }).fail(function (data) {
            for(let i=0; i<input.length; i++) {
                showValidate(input[i]);
                check=false;

            }
          });
      
        event.preventDefault();

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if((!$(input).attr('type') == 'text') || (!$(input).attr('name') == 'password')) {
            return true;
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
        $(".alert-v").addClass('alert-validate-s');
        $(".loader").css("visibility", "hidden");
    }

    function hideValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
        $(".alert-v").removeClass('alert-validate-s');
    }
    
    /*==================================================================
    [ Show pass ]*/
    let showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);
