/*!
 * Multilang
 * Author: Carlos Machado
 */

class NestedKey {

  static _parseKeys(nestedKey) {
    var auxKeys = nestedKey.split('.');
    var keys = [];
    for (let i = 0; i < auxKeys.length; i++) {
      if (RegExp(/^[a-zA-Z_]+[a-zA-Z0-9_]?\[\d\]$/).test(auxKeys[i])) {
        var key = auxKeys[i].replace(/\[\d\]/, '');
        var index = auxKeys[i].replace(/^(.)+(\[)(\d)(\])$/, '$3');
        keys.push(key);
        keys.push(index);
      } else {
        keys.push(auxKeys[i]);
      }
    }
    return keys;
  }

  static _search(obj, keys) {
    var key = keys.shift();
    if (key === undefined) {
      return obj;
    }
    return NestedKey._search(obj[key], keys);
  }

  static search(obj, nestedKey) {
    var keys = NestedKey._parseKeys(nestedKey);
    return NestedKey._search(obj, keys);
  }

}
