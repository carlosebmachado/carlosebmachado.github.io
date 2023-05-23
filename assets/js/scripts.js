/*!
 * Author: Carlos Machado
 */


//
// Page events
//

window.addEventListener('load', () => {
  var preloader = document.getElementById('loader');
  preloader.style.display = 'none';
})

document.addEventListener("DOMContentLoaded", () => {
  checkTheme();
  if (allowCookie()) {
    hideCookieBar();
  }
  setLanguage();
});

document.getElementById('btn-cookie-accept').addEventListener('click', () => {
  hideCookieBar();
  Cookie.set('agree', 'true', 365);
});

document.getElementById('btn-lang').addEventListener('click', () => {
  var lang = Cookie.get('lang');
  if (lang === 'en-us') {
    Cookie.set('lang', 'pt-br', 365);
  } else {
    Cookie.set('lang', 'en-us', 365);
  }
  setLanguage();
});

document.getElementById('btn-theme').addEventListener('click', () => {
  var link = document.getElementById('theme-link');
  var url = String(link.getAttribute("href"));
  if (url == 'assets/css/theme/light.css') {
    setTheme('dark');
  } else if (url == 'assets/css/theme/dark.css') {
    setTheme('light');
  }
});



//
// Control functions
//

function allowCookie() {
  var agree = Cookie.get('agree');
  return agree !== undefined && agree !== null && agree !== '';
}

function hideCookieBar() {
  var cookies = document.getElementById('cookies-bar');
  cookies.style.display = 'none';
}

function removeAllCookies() {
  Cookie.remove('lang');
  Cookie.remove('theme');
  Cookie.remove('agree');
}

function checkTheme() {
  // theme
  var theme = Cookie.get('theme');
  if (theme != '') {
    setTheme(theme);
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
}

function setLanguage() {
  var lang = Cookie.get('lang');
  if (lang === undefined || lang === null || lang === '') {
    lang = 'pt-br';
    Cookie.set('lang', lang, 365);
  }
  MultiLang.setLang('data/lang/', lang);
}

function setTheme(theme) {
  if (theme != 'dark' && theme != 'light') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    } else {
      theme = 'light';
    }
  }
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
  link.href = String(`assets/css/theme/${theme}.css`);
  Cookie.set('theme', theme, 365);
}


//
// Start Bootstrap - Resume v6.0.3 (https://startbootstrap.com/theme/resume)
// Copyright 2013-2021 Start Bootstrap
// Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
//

window.addEventListener('DOMContentLoaded', _ => {

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
