'use strict';

jQuery(document).ready(function($) {
    var resize = function() {
        console.log();
        $('.fit-height').each(function(index, el) {
            $(el).css('height', 'auto');
            $(el).css('height', $(el).parent().height());
        });
    };

    resize();
    $(window).resize(resize);

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    function closethebutton() {
        $('.close').unbind('click').click(function(event) {
            $('.error-msg').hide();
        });
    }

    $('#employer, #user').click(function(event) {

        if($(this).is(":disabled")) {
            return false;
        }
        var type = ($(this).attr('id')=='employer') ? 'employer' : 'user';

        $('#contactForm').unbind('submit').submit(function(event) {
            /* Act on the event */
            event.preventDefault();
            if(isValidEmailAddress($('input[name="Email"]').val())) {
                var formInput = $(this).serialize();
                formInput += "&Type=" + encodeURIComponent(type);
                console.log(formInput);
                // Do some error checking
                $.post($(this).attr('action'),formInput,null)
                .done(function() {
                    console.log("Successfully sent mail.");
                    $('.error-msg').html('<span>Successfully sent mail.</span> <button type="button" class="close">&times;</button>');
                    closethebutton();
                    $('.error-msg').addClass('success');
                    $('.error-msg').show();
                    $('#employer, #user').attr('disabled', 'disabled');
                })
                .fail(function(data) {
                    console.log('<span>Error in sending mail.</span> <button type="button" class="close">&times;</button>');
                    $('.error-msg').html(data);
                    closethebutton();
                    $('.error-msg').show();
                });
            } else {
                console.log("Error in sending mail");
                $('.error-msg').html('<span>Email address is not valid.</span> <button type="button" class="close">&times;</button>');
                closethebutton();
                $('.error-msg').show();
            }
        });

    });

    $('a[href*=#]').click(function(o) {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
               if (target.length) {
                if ($("header").css("position") == "fixed" ) {
                 $('html,body').animate({
                     scrollTop: target.offset().top-71
                }, 1000);
             } else {
                 $('html,body').animate({
                     scrollTop: target.offset().top
                }, 1000);
             }
                return false;
            }
        }
    });
});
