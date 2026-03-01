'use strict';

const de_DE = require('../../src/language/de_DE');
const en_EN = require('../../src/language/en_EN');

// Local re-implementation of getLocalizedStringForKey logic (from modeler_custom.js)
function getLocalizedString(key, language) {
  var dict = language === 'en' ? en_EN : de_DE;
  return dict[key] !== undefined ? dict[key] : key;
}

describe('Localization', () => {
  test('returns German string for "de" language', () => {
    expect(getLocalizedString('correction', 'de')).toBe(de_DE['correction']);
    expect(getLocalizedString('correction', 'de')).toBe('Korrektur');
  });

  test('returns English string for "en" language', () => {
    expect(getLocalizedString('correction', 'en')).toBe(en_EN['correction']);
    expect(getLocalizedString('correction', 'en')).toBe('Correction');
  });

  test('falls back to de_DE for unknown language', () => {
    expect(getLocalizedString('correction', 'fr')).toBe(de_DE['correction']);
    expect(getLocalizedString('correction', undefined)).toBe(de_DE['correction']);
  });

  test('returns the key itself when key is unknown', () => {
    expect(getLocalizedString('unknownKey_xyz', 'de')).toBe('unknownKey_xyz');
    expect(getLocalizedString('unknownKey_xyz', 'en')).toBe('unknownKey_xyz');
  });

  test('de_DE and en_EN have exactly the same set of keys', () => {
    const deKeys = Object.keys(de_DE).sort();
    const enKeys = Object.keys(en_EN).sort();
    expect(deKeys).toEqual(enKeys);
  });
});
