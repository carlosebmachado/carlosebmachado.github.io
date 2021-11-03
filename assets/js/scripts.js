window.multilang;

$(document).ready(function () {
  // language
  window.multilang = new Multilang('data/lang/', 'pt-br');

  // theme
  var theme = getCookie('theme');
  if (theme != '') {
    if (theme == 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
});

$('#btn-lang').on('click', function () {
  var lang = getCookie('lang');
  if (lang === 'en-us') {
    window.multilang.setLang('pt-br');
  } else {
    window.multilang.setLang('en-us');
  }
});

$('#btn-theme').on('click', function () {
  var link = $('#theme-link');
  var url = String(link.attr('href'));
  var start = '../';
  if (!url.startsWith(start)) {
    start = '';
  }
  if (url == start + 'assets/css/light-theme.css') {
    setTheme('dark');
  } else if (url == start + 'assets/css/dark-theme.css') {
    setTheme('light');
  }
});

function setTheme(theme) {
  if (theme != 'dark' && theme != 'light') return;
  var lbl = $('#btn-theme-label');
  if (theme == 'dark') {
    lbl.text('Light');
  } else {
    lbl.text('Dark');
  }
  var link = $('#theme-link');
  var url = String(link.attr('href'));
  var start = '../';
  if (!url.startsWith(start)) {
    start = '';
  }
  link.attr('href', start + 'assets/css/' + theme + '-theme.css');
  setCookie('theme', theme, 365);
}

// Wait for window load
$(window).on('load', function () {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});

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
