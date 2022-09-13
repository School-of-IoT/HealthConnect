(function ($) {
    "use strict";

    
    $(".log_out").click(function(){
      sessionStorage.removeItem('uid');
      location.href = "../../login/"
    });


})(jQuery);
