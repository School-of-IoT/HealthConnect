
function rndNum(min, max) { 
    return Math.floor(Math.random() * (max - min)) + min;
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
    
    var check = true;

    $(".login100-form-btn").click(function(){
        //alert("inside click");

            $(".loader").css("visibility", "visible");
            $(".login100-form-btn").attr('disabled', true);
        
            $(".alert-v").removeClass('passfield-validate');
            $(".alert-v").removeClass('safepass-validate');


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

                //alert("inside checktrue");
                   
                let formData = 

                {
                    "newpatient": {
                      "Name": $("#name").val(),
                      "Address": $("#address").val(),
                      "Age": age,
                      "Ambulation":false,
                      "BMI": rndNum(18.5,24.9),
                      "Chills":false,
                      "Contacts": $("#phone").val(),
                      "DOB": dob,
                      "Email": $("#email").val(),
                      "DBP": rndNum(60,80),
                      "DecreasedMood":false,
                      "FiO2": rndNum(50,100),
                      "GeneralizedFatigue":false,
                      "HeartRate": rndNum(60,100),
                      "HistoryFever": "Never",
                      "RR": rndNum(12,16),
                      "RecentHospitalStay":"00/00/0000",
                      "SBP": rndNum(90,120),
                      "SpO2": rndNum(90,100),
                      "Temp": rndNum(95,99),
                      "WeightGain":0,
                      "WeightLoss":0,
                      "BGroup": $("#BGr").val(),
                      "Sex": $("#sex").val(),
                      "pass": $("#pass1").val(),
                      "user": $("#username").val(),
                    }
                  };

                //-----------------------------

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
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(formData),
                    dataType: "json",
                    beforeSend: function(x) {
                        if (x && x.overrideMimeType) {
                          x.overrideMimeType("application/j-son;charset=UTF-8");
                        }
                      },
                    encode: true,
                }).done(function (data) {
                    
                    location.href = "../login/"
                    
                }).fail(function (data) {
                    $(".loader").css("visibility", "hidden");
                     $(".login100-form-btn").attr('disabled', false);
                    //alert("Try Again");
                    console.log(data);
                    if (data.responseJSON.error == "Username exists"){
                        $(".alert-v").addClass('userexist'); 
                    }
                   
                }).always(function (data) {
                    //alert("inside always");
                    console.log(data.status);
                });
              
               event.preventDefault();
               return check;
             
          }

          check=true;
          $(".loader").css("visibility", "hidden");
         $(".login100-form-btn").attr('disabled', false);
         
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
        $(".alert-v").removeClass('userexist');
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

    
    // StrongPassword - 
        // At least one digit [0-9]
        // At least one lowercase character [a-z]
        // At least one uppercase character [A-Z]
        // At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\]
        // At least 8 characters in length
    //let strongPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    
    
    // MediumPasword - 
        // At least one digit [0-9]
        // At least one lowercase character [a-z]
        // At least one uppercase character [A-Z]
        // At least 8 characters in length, but no more than 32.
    
    
    let mediumPassword = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}')

    function StrengthChecker(PasswordParameter){
        // We then change the badge's color and text based on the password strength

        if(mediumPassword.test(PasswordParameter)){
            return true;
        } else{
            return false;
        }
    }


})(jQuery);
