let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-left");
  } else
    sidebarBtn.classList.replace("bx-menu-alt-left", "bx-menu");
}

function view() { 
	document.getElementById('a').setAttribute('style', 'display:block'); 
} 



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
                    if(($(this).hasClass('device'))){
                        $('.med-device.dashboard').addClass('active');
                    }
                    if(($(this).hasClass('treatment'))){
                        $('.treatment.dashboard').addClass('active');
                    }
                    if(($(this).hasClass('schedule'))){
                        $('.scheduler.dashboard').addClass('active');
                    }
                    if(($(this).hasClass('helpline'))){
                        $('.helpline.dashboard').addClass('active');
                    }
                }
        
              }
        })    
    })
    




})(jQuery);
