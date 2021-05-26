$(document).ready(function () {
    var theme = getCookie('theme');
    if (theme == 'light') {
        $('#btn-theme').click();
    }
});

$('#btn-theme').on('click', function () {
    var lbl = $('#btn-theme-label');
    if (lbl.text() == 'Light') {
        lbl.text('Dark');
    } else {
        lbl.text('Light');
    }
    var link = $('#theme-link');
    var url = String(link.attr('href'));
    var start = '../';
    if (!url.startsWith(start)) {
        start = '';
    }
    if (url == start + 'assets/css/light-theme.css') {
        link.attr('href', start + 'assets/css/dark-theme.css');
        setCookie('theme', 'dark', 10 * 365);
    } else if (url == start + 'assets/css/dark-theme.css') {
        link.attr('href', start + 'assets/css/light-theme.css');
        setCookie('theme', 'light', 10 * 365);
    }
});

// Cookies
function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toGMTString();
    }
    else var expires = '';               

    document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name) {
    setCookie(name, '', -1);
}

/*!
* Start Bootstrap - Resume v6.0.3 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using anime.js
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ?
                target :
                $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                anime({
                    targets: 'html, body',
                    scrollTop: target.offset().top,
                    duration: 1000,
                    easing: 'easeInOutExpo'
                });
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").on('click', function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav"
    });

})(jQuery); // End of use strict
