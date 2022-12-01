/*!
 * MultiLang
 * Author: Carlos Machado
 */

class MultiLang {

  /**
   * Set the informed language
   * @param {*} path Path to the lang file
   * @param {*} lang Language to be set
   */
  static setLang(path, lang) {
    var fullPath = path + 'lang.' + lang + '.json';
    var langData = MultiLang._loadLangData(fullPath);

    // set html lang tag
    var html = document.getElementsByTagName('html')[0];
    html.lang = lang;

    // parse head
    document.title = langData['websiteTitle'];
    document.querySelector('meta[name="description"]').content = langData['metaDescription'];
    document.querySelector('meta[name="keywords"]').content = langData['metaTags'];

    // paser body
    var elements = document.querySelectorAll('body *');
    elements = [...elements];
    elements.forEach(element => {
      MultiLang._parse(element, langData)
    });

  }

  /**
   * Parse element and replace text
   * @param {*} element Element to be parsed
   * @param {*} langData Language data
   */
  static _parse(element, langData) {
    try {
      if (element.tagName === 'SPAN' && element.hasAttribute('ltag')) {
        element.textContent = NestedKey.get(langData, element.getAttribute('ltag'));
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Load language data
   * @param {*} path Path to the lang file
   * @returns Data from the lang file
   */
  static _loadLangData(path) {
    var langData;
    MultiLang._loadJSON(function (response) {
      langData = JSON.parse(response);
    }, path);
    return langData;
  }

  /**
   * Load JSON file
   * @param {*} callback Function to be called when the lang file is loaded
   * @param {*} path Path to the lang file
   */
  static _loadJSON(callback, path) {
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

}
