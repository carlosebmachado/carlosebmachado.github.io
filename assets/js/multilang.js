// Multilang
// Author: Carlos Machado

function setLang(path, lang) {
  fullPath = path + 'lang.' + lang + '.json';
  langData = loadLangData(fullPath);

  // set html lang tag
  var html = document.getElementsByTagName('html')[0];
  html.lang = lang;

  // parse head
  document.title = langData['websiteTitle'];
  document.querySelector('meta[name="description"]').content = langData['metaDescription'];
  document.querySelector('meta[name="keywords"]').content = langData['metaTags'];
  // var head = document.getElementsByTagName('head')[0];
  // head.childNodes.forEach(element => {
  //   if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE' && element.tagName !== 'LINK') {
  //     element.outerHTML = parse(element.outerHTML, langData);
  //   }
  // });

  // paser body
  var elements = document.querySelectorAll('body *');
  elements = [...elements];
  elements.forEach(element => {
    parseClass(element, langData)
  });
  // var elements = document.querySelectorAll('body *');
  // elements = [...elements];
  // elements = elements.reverse();
  // elements.forEach(element => {
  //   parseElement(element, langData);
  // });

}

function parseClass(element, langData) {
  try {
    if (langData[element.getAttribute('key')] != undefined && element.tagName === 'LTAG') {
      element.innerHTML = langData[element.getAttribute('key')] + element.innerHTML;
    }
  } catch (e) {
    console.error(e);
  }
}

function parseElement(element, langData) {
  var inner = element.innerHTML.trim();
  if (inner.charAt(0) === '{') {
    var end = 0;
    for (var i = 0; i < inner.length; ++i) {
      var c = inner.charAt(i);
      if (c === '}') {
        end = i;
        break;
      }
    }
    var key = inner.substr(1, end - 1);
    var content;
    try {
      content = langData[key];
    } catch (e) {
      console.error(e);
    }
    element.innerHTML = content + inner.substr(end + 1, inner.length - end - 2);
  }
}

function parse(html, langData) {
  if (html === undefined) return;
  var inner = html;
  var newInner = '';
  for (var i = 0; i < inner.length; ++i) {
    var c = inner.charAt(i);
    if (c === '{') {
      var iniPos = i + 1;
      while (i < inner.length && c !== '}') {
        ++i;
        c = inner.charAt(i);
      }
      var endPos = i;
      var key = inner.substr(iniPos, endPos - iniPos);
      var content;
      try {
        content = langData[key];
      } catch (e) {
        console.error(e);
      }
      newInner += content;
    } else {
      newInner += c;
    }
  }
  return newInner;
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
