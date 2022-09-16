(function ($) {
    "use strict";

    $('.content').each(function(){
        $(this).click(function(){
            if(!$(this).hasClass("active")){
                $('.content').each(function(){
                    $(this).removeClass('active');
                });
                $('.dashboard').each(function(){
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
                
                if($(this).hasClass("active")){
                    if(($(this).hasClass('dash'))){
                        $('.box-content.dashboard').addClass('active');
                    }
                    if(($(this).hasClass('symptom-bot'))){
                        $('.symptom-bot.dashboard').addClass('active');
                    }
                    if(($(this).hasClass('diagnosis'))){
                        $('.diagnosis.dashboard').addClass('active');
                    }
                    if(($(this).hasClass('treatment'))){
                        $('.treatment.dashboard').addClass('active');
                    }
                    if(($(this).hasClass('schedule'))){
                        $('.schedule.dashboard').addClass('active');
                    }
                }
        
              }
        })    
    })
    




})(jQuery);
