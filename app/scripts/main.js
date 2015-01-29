'use strict';

jQuery(document).ready(function($) {
    var resize = function() {
        $('.fit-height').each(function(index, el) {
            $(el).css('height', 'auto');
            $(el).css('height', $(el).parent().height());
        });
    };

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    if(getParameterByName('submitted') == "true") {
      console.log(getParameterByName('submitted'));
      $('.push-top').hide();
      $('.post-submit').show();
    }

    resize();
    $(window).resize(resize);

    function validateForm() {
      var isValid = true;
      $('.form-control').removeClass('error');
      $('.form-control').each(function() {
        if ( $(this).val() === '' ) {
          isValid = false;
          $(this).addClass('error');
        }
      });
      return isValid;
    }

    $("form").submit(function(e){
      if(!validateForm()){
        e.preventDefault();
      }
    });

});
