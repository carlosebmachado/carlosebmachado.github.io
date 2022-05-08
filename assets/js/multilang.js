// Multilang
// Author: Carlos Machado

function setLang(path, lang) {
  fullPath = path + 'lang.' + lang + '.json';
  langData = loadLangData(fullPath);

  // set html lang tag
  var html = document.getElementsByTagName('html')[0];
  html.lang = lang;

  // set lang param
  var url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.location.href = url.href;

  // parse head
  document.title = langData['websiteTitle'];
  document.querySelector('meta[name="description"]').content = langData['metaDescription'];
  document.querySelector('meta[name="keywords"]').content = langData['metaTags'];

  // paser body
  var elements = document.querySelectorAll('body *');
  elements = [...elements];
  elements.forEach(element => {
    parse(element, langData)
  });

}

function parse(element, langData) {
  try {
    if (langData[element.getAttribute('key')] != undefined && element.tagName === 'LTAG') {
      element.innerHTML = langData[element.getAttribute('key')] + element.innerHTML;
    }
  } catch (e) {
    console.error(e);
  }
}

function loadLangData(path) {
  var langData;
  loadJSON(function (response) {
    langData = JSON.parse(response);
  }, path);
  return langData;
}

function loadJSON(callback, path) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', path, false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
