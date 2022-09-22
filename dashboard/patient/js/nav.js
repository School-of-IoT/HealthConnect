(function ($) {
    "use strict";

    $('.home-section nav .profile-details').hover(
        function(){ 
            $('.section-dropdown').toggleClass('active');
            $('i.bx.bx-chevron-up').toggleClass('active');
        }
    )


})(jQuery);
