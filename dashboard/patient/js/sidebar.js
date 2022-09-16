(function ($) {
    "use strict";

    $('.content').each(function(){
        $(this).click(function(){
            if(!$(this).hasClass("active")){
                $('.content').each(function(){
                    $(this).removeClass('active');
                });
        
                $(this).addClass('active');
        
              }
        })    
    })

    


})(jQuery);
