// Scripts

$(window).on('load', function () {
  var preloader = document.getElementById('loader');
  preloader.style.display = 'none';
});

$(document).ready(function () {
  var lang = getCookie('lang');
  checkTheme();
  if (allowCookie()) {
    hideCookieBar();
  }
  if (lang === undefined || lang === '' || lang === null) {
    lang = 'pt-br';
    setCookie('lang', lang, 365);
  }
  setLang('data/lang/', lang);
});

$('#btn-cookie-accept').on('click', function () {
  hideCookieBar();
  setCookie('agree', 'true', 365);
});

$('#btn-lang').on('click', function () {
  var lang = getCookie('lang');
  if (lang === 'en-us') {
    setCookie('lang', 'pt-br', 365);
    window.location.reload();
  } else {
    setCookie('lang', 'en-us', 365);
    window.location.reload();
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

function allowCookie() {
  var agree = getCookie('agree');
  return agree !== '' && agree !== undefined && agree !== null;
}

function hideCookieBar() {
  var cookies = document.getElementById('cookies-bar');
  cookies.style.display = 'none';
}

function removeAllCookies() {
  removeCookie('lang');
  removeCookie('theme');
  removeCookie('agree');
}

function checkTheme() {
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
}

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
