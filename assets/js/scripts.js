// Scripts

window.addEventListener('load', () => {
  var preloader = document.getElementById('loader');
  preloader.style.display = 'none';
})

document.addEventListener("DOMContentLoaded", () => {
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

document.getElementById('btn-cookie-accept').addEventListener('click', () => {
  hideCookieBar();
  setCookie('agree', 'true', 365);
});

document.getElementById('btn-lang').addEventListener('click', () => {
  var lang = getCookie('lang');
  if (lang === 'en-us') {
    setCookie('lang', 'pt-br', 365);
    window.location.reload();
  } else {
    setCookie('lang', 'en-us', 365);
    window.location.reload();
  }
});

document.getElementById('btn-theme').addEventListener('click', () => {
  var link = document.getElementById('theme-link');
  var url = String(link.getAttribute("href"));
  if (url == 'assets/css/light-theme.css') {
    setTheme('dark');
  } else if (url == 'assets/css/dark-theme.css') {
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
  var lbl = document.getElementById('btn-theme-label');
  var avatar = document.getElementById('avatar');
  if (theme == 'dark') {
    lbl.textContent = 'Light';
    avatar.src = 'data/img/avatar/avatar_dark.png'
  } else {
    lbl.textContent = 'Dark';
    avatar.src = 'data/img/avatar/avatar.png'
  }
  var link = document.getElementById('theme-link');
  link.href = String('assets/css/' + theme + '-theme.css');
  setCookie('theme', theme, 365);
}


/*!
* Start Bootstrap - Resume v6.0.3 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/

window.addEventListener('DOMContentLoaded', event => {

  // Activate Bootstrap scrollspy on the main nav element
  const sideNav = document.body.querySelector('#sideNav');
  if (sideNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#sideNav',
          offset: 74,
      });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

});
