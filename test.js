const { expect } = require('chai');
const TextEssence = require('.');

describe('TextEssence', function () {
  describe('essence', function () {
    it('should convert `undefined` to an empty string', function () {
      let result = TextEssence.essence(undefined);
      expect(result).to.equal('');
    });
    it('should convert `null` to an empty string', function () {
      let result = TextEssence.essence(null);
      expect(result).to.equal('');
    });
    it('should remove only and only non-alphanumerical characters', function () {
      let result = TextEssence.essence('bb, 1 & ب‌ب، ۱ \n');
      expect(result).to.equal('bb1بب۱');
    });
    it('should convert all characters to lower case', function () {
      let result = TextEssence.essence('BbБб');
      expect(result).to.equal('bbбб');
    });
    it('should not remove diacritical marks with default options', function () {
      let result = TextEssence.essence('Éé');
      expect(result).to.equal('éé');
    });
    it('should remove diacritical marks with the `removeDiacriticalMarks` option set to true', function () {
      let result = new TextEssence({ removeDiacriticalMarks: true }).essence('Éé');
      expect(result).to.equal('ee');
    });
  });
  describe('identical', function () {
    it('should return true if two strings are essentially the same', function () {
      let result = TextEssence.identical('Bb, 1 ب‌ب، ۱', 'bb 1 & ب‌ب ۱');
      expect(result).to.equal(true);
    });
    it('should return false if two strings are not essentially the same', function () {
      let result = TextEssence.identical('Bb, 1 ب‌ب، ۱', 'bb1');
      expect(result).to.equal(false);
    });
  });
  describe('essentialHash', function () {
    it('should return the sha256 hash of the essence of a string with default options', function () {
      let result = TextEssence.essentialHash('Bb, 1 ب‌ب، ۱');
      expect(result).to.equal('c97204dda788b45cb7867d72ca2d2c2926865cbec818e4a6dced5dfd643228a9');
    });
    it('should accept other hash algorithms via the `hashAlgorithm` option', function () {
      let result = new TextEssence({ hashAlgorithm: 'sha1' }).essentialHash('Bb, 1 ب‌ب، ۱');
      expect(result).to.equal('d3866737c23f3bc1ac9cf8842f8304887657aae7');
    });
  });
});
