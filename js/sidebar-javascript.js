

$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        nav = $('.li-sidebar'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });
    nav.click(function (ev) {
        //var target = this.target;
        hideNav();
    });

    function hamburger_cross() {

        if (isClosed === true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        }
        else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }

    }
    function hideNav() {
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
         isClosed = true;
        overlay.hide();
    }


    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
    nav.click(function () {
        if( $('#wrapper').hasClass('toggled')){
            $('#wrapper').removeClass('toggled');
        }
    })


});