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
    let input = $('.validate-input .input100');

    $(".wrap-login100-form-btn").click(function(){
        $(".loader").css("visibility", "visible");
      });

    $('.validate-form').on('submit',function(event){
        $(".loader").css("visibility", "visible");
        $(".alert-v").removeClass('passfield-validate');
        $(".alert-v").removeClass('safepass-validate');
        
        
        let check = true;
        

        for(let i=0; i<input.length; i++) {
            if(filledField(input[i]) == false){
                datafilled_show(input[i]);
                check=false;
            }
        }

        let birthin = document.getElementById("birthdate").value;  
        let dob = new Date(birthin); 
        let month_diff = Date.now() - dob.getTime();  
        let age_dt = new Date(month_diff);   
        let year = age_dt.getUTCFullYear();  
        let age = Math.abs(year - 1970);  
        

        let pass1 = document.getElementById("pass1").value;
        let pass2 = document.getElementById("pass2").value;
        

        if(pass1 != pass2){
            datafilled_show(input[2]);
            datafilled_show(input[3]);
            $(".alert-v").addClass('passfield-validate'); 
            check=false;
        }
        
        if( (check) && !StrengthChecker(pass2)){
            datafilled_show(input[2]);
            datafilled_show(input[3]);
            $(".alert-v").addClass('safepass-validate'); 
            check=false;
        }
        

          if(check){
            let formData = 
            
            {
                "newpatient": {
                  "Name": $("#name").val(),
                  "Address": $("address").val(),
                  "Age": age,
                  "Ambulation":false,
                  "BMI": 0,
                  "Chills":false,
                  "Contacts": $("#phone").val(),
                  "DBP": 0,
                  "DecreasedMood":false,
                  "FiO2": 0,
                  "GeneralizedFatigue":false,
                  "HeartRate": 0,
                  "HistoryFever": "Never",
                  "RR": 0,
                  "RecentHospitalStay":"00/00/0000",
                  "SBP": 0,
                  "SpO2": 0,
                  "Temp": 0,
                  "WeightGain":0,
                  "WeightLoss":0,
                  "BGroup": $("#BGr").val(),
                  "Sex": $("#sex").val(),
                  "pass": $("#pass1").val(),
                  "user": $("#username").val(),
                }
              };
              

            // {
            //     user: $("#username").val(),
            //     pass: $("#pass1").val(),
            //     name: $("#name").val(),
            //     phone: $("#phone").val(),
            //     address: $("address").val(),
            //     age: age,
            //   };
            $.ajax({
                type: "POST",
                url: "https://healthconnect-server.herokuapp.com/patient/signup",
                crossDomain: true,
                data: formData,
                dataType: "json",
                encode: true,
            }).done(function (data) {
                console.log(data);
                $(".loader").css("visibility", "hidden");
                //setCookie("uid", data.patient[0]._id, 1);
                //location.href = "../login/"
            }).fail(function (data) {
                $(".loader").css("visibility", "hidden");
                alert("Try Again");
            }).always(function (data) {
                console.log(age);
            });
          }
          $(".loader").css("visibility", "hidden");
          event.preventDefault();
        
        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           datafilled_hide(this);
        });
    });

    function filledField (input) { //check for unfilled inputs
            if($(input).val().trim() == ''){
                return false;
            }
    }

    function datafilled_show(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).addClass('data-validate');
        $(".alert-v").addClass('field-validate');
        
    }

    function datafilled_hide(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).removeClass('data-validate');
        $(".alert-v").removeClass('field-validate');
        $(".alert-v").removeClass('passfield-validate');
        $(".alert-v").removeClass('safepass-validate');
    }
    

    /*======================= [ Show pass ]  =======================*/
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

    /*=================== Password Strength ==================*/

    
    
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    
    

    function StrengthChecker(PasswordParameter){
        // We then change the badge's color and text based on the password strength

        if(mediumPassword.test(PasswordParameter)){
            return true;
        } else{
            return false;
        }
    }


})(jQuery);
