class Multilang {

  constructor(path, lang) {

    function loadJSON(callback) {
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

    var langData;
    loadJSON(function (response) {
      langData = JSON.parse(response);
    });
    
    this._langData = langData;
    this._lang = lang;
    this.setLang();
  }

  setLang(lang) {
    lang(lang);
    this.setLang();
  }

  setLang() {
    var elements = document.querySelectorAll('body *');
    elements.forEach(element => {
      var inner = element.innerHTML.trim();
      if (inner.charAt(0) === '{' && inner.charAt(inner.length - 1) === '}') {
        var key = inner.substr(1, inner.length - 2);
        try {
          element.innerHTML = this._langData[this._lang][key];
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  set langData(langData) {
    this._langData = langData;
  }

  get langData() {
    return this._langData;
  }

  set lang(lang) {
    this._lang = lang;
  }

  get lang() {
    return this._lang;
  }

}
