class Multilang {

  constructor(path, lang) {
    var auxLang = getCookie('lang');
    if (auxLang !== null) {
      this._lang = auxLang;
    } else {
      this._lang = lang;
      setCookie('lang', lang, 365);
    }
    this._path = path;
    this.setFullPath();
    this._langData = this.getLangData();
    this.setLang();
  }

  setLang(lang) {
    if (lang !== undefined) {
      setCookie('lang', lang, 365);
      window.location.reload();
    } else {

      var html = document.getElementsByTagName('html')[0];
      html.lang = this._lang;

      var head = document.getElementsByTagName('head')[0];
      head.childNodes.forEach(element => {
        if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE' && element.tagName !== 'LINK') {
          element.outerHTML = this.parse(element.outerHTML);
        }
      });

      var elements = document.querySelectorAll('body *');
      elements = [...elements];
      elements = elements.reverse();
      elements.forEach(element => {
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
            content = this._langData[key];
          } catch (e) {
            console.error(e);
          }
          element.innerHTML = content + inner.substr(end + 1, inner.length - end - 2);
        }
      });
      
    }
  }

  parse(html) {
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
          content = this._langData[key];
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

  getLangData() {
    var langData;
    this.loadJSON(function (response) {
      langData = JSON.parse(response);
    });
    if (langData === undefined || langData === '' || langData === null) {
      this._lang = 'pt-br';
      this.loadJSON(function (response) {
        langData = JSON.parse(response);
      });
    }
    return langData;
  }

  setFullPath() {
    this._fullPath = this._path + 'lang.' + this._lang + '.json';
  }

  loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', this._fullPath, false);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == '200') {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

}
