const crypto = require('crypto');
const diacritics = require('diacritics');
const xregexp = require('xregexp');

const nonAlphaNum = xregexp('[^\\pL\\pN]+', 'g');

const availableOptions = {
  removeDiacriticalMarks: {
    defaultValue: false,
    validate: val => !!val
  },
  hashAlgorithm: {
    defaultValue: 'sha256',
    validate: val => {
      let hash = val.toString().toLowerCase();
      if (!crypto.getHashes().includes(hash)) {
        throw new Error('Hash algorithm not supported: ' + JSON.stringify(val));
      }
      return hash;
    }
  },
};

class TextEssence {
  /**
   * Create a new TextEssence instance.
   * @param {object} [options=null] Optional settings.
   * @param {boolean} [options.removeDiacriticalMarks=false] Remove diacritical marks, e.g., convert `é` to `e`.
   * @param {string} [options.hashAlgorithm='sha256'] Hash algorithm to use for generating essential hash.
   */
  constructor(options) {
    if (options === undefined || options === null) {
      options = {};
    }
    if (typeof options !== 'object') {
      throw new Error('Invalid options - expected an object, got: ' + JSON.stringify(options));
    }
    this._options = {};
    Object.keys(availableOptions).forEach(key => {
      this._options[key] = options.hasOwnProperty(key) ?
        availableOptions[key].validate(options[key]) : availableOptions[key].defaultValue;
    });
  }
  /**
   * Get the essence of a string.
   * @param {string} str A string.
   * @returns {string} the essence of the string.
   */
  essence(str) {
    if (str === undefined || str === null) {
      return '';
    }
    let strEssence = xregexp.replace(str.toString(), nonAlphaNum, '');
    if (this._options.removeDiacriticalMarks) {
      strEssence = diacritics.remove(strEssence);
    }
    return strEssence.toLowerCase();
  }
  /**
   * Get the essence of a string (with default options).
   * @param {string} str A string.
   * @returns {string} the essence of the string.
   */
  static essence(str) {
    return defaultInstance.essence(str);
  }
  /**
   * Check whether two strings are essentially the same.
   * @param {string} str1 First string.
   * @param {string} str2 Second string.
   * @returns {boolean} true if and only if the two strings are essentially the same.
   */
  identical(str1, str2) {
    return this.essence(str1) === this.essence(str2);
  }
  /**
   * Check whether two strings are essentially the same (with default options).
   * @param {string} str1 First string.
   * @param {string} str2 Second string.
   * @returns {boolean} true if and only if the two strings are essentially the same.
   */
  static identical(str1, str2) {
    return defaultInstance.identical(str1, str2);
  }
  /**
   * Get the hex hash of the essence of a string.
   * @param {string} str A string.
   * @returns {string} the hex hash of the essence of the string.
   */
  essentialHash(str) {
    return crypto.createHash(this._options.hashAlgorithm).update(this.essence(str)).digest('hex');
  }
  /**
   * Get the hex hash of the essence of a string (with default options).
   * @param {string} str A string.
   * @returns {string} the hex hash of the essence of the string.
   */
  static essentialHash(str) {
    return defaultInstance.essentialHash(str);
  }
};

const defaultInstance = new TextEssence();

module.exports = TextEssence;
