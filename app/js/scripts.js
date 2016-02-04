//show/hide sign button when in benefits section
$(window).scroll(function() {
    if ($(this).scrollTop() > 710) {
       $('#sign-button').css({
            'display': 'none'
        });
    } else {
    	$('#sign-button').css({
            'display': 'inline-block'
        });
    }
});