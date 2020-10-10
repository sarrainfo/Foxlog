// Import
const { parser } = require('../../src/helpers');
const { w3cFormatHttp, w3cFormatHttp2 } = require('../mock');
//= ==========================================

describe('Test Parser function', () => {
  const parserValue = parser(w3cFormatHttp);
  const parserValue2 = parser(w3cFormatHttp2);
  test('should return specifiq properties', () => {
    expect(parserValue).toHaveProperty('host');
    expect(parserValue).toHaveProperty('logName');
    expect(parserValue).toHaveProperty('authUser');
    expect(parserValue).toHaveProperty('date');
    expect(parserValue).toHaveProperty('method');
    expect(parserValue).toHaveProperty('url');
    expect(parserValue).toHaveProperty('section');
    expect(parserValue).toHaveProperty('version');
    expect(parserValue).toHaveProperty('status');
    expect(parserValue).toHaveProperty('bytes');
  });
  test('Bytes and status property should be number value', () => {
    expect(typeof parserValue.bytes).toBe('number');
    expect(typeof parserValue.status).toBe('number');
  });
  describe('Test section value, should return the correct value', () => {
    test('From simple url', () => {
      const expectedValue = '/report';
      expect(parserValue.section).toBe(expectedValue);
    });
    test('From complex url', () => {
      const expectedValue = '/test';
      expect(parserValue2.section).toBe(expectedValue);
    });
  });
});
