// Import
const {
  filterDataFromFileByLimitTime, getTimestamp, getDataBySection, parser,
} = require('../src/helpers');
const { datas, w3cFormatHttp, w3cFormatHttp2 } = require('./mock');

//= =========================================================
//
describe('Test helpers function', () => {
  describe('Test getTimestamp function', () => {
    test('Should return the correct timestamp from date format iso ', () => {
      const timestampsValue = getTimestamp('09/Mar/2020:19:00:00 +0000');
      const expectedValue = 1583780400;
      expect(timestampsValue).toBe(expectedValue);
    });
    test('Should throw an error when invalid format of date', () => {
      expect(() => {
        getTimestamp('09/03/2020:19:00:00');
      }).toThrow();
    });
  });

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
  describe('Test getDataBySection function', () => {
    const dataBySection = getDataBySection(datas, '/test');
    test('should contains specifique property', () => {
      expect(dataBySection).toHaveProperty('section');
      expect(dataBySection).toHaveProperty('nbErrors');
      expect(dataBySection).toHaveProperty('nbVisited');
    });
    test('Should filter by section', () => {
      expect(dataBySection.section).toBe('/test');
    });
    test('Should return an object', () => {
      expect(typeof dataBySection).toBe('object');
    });
    test('Should return the correct nb of errors by section', () => {
      expect(dataBySection.nbErrors).toBe(1);
    });
    test('Type of property', () => {
      const { section, nbErrors, nbVisited } = dataBySection;
      expect(typeof section).toBe('string');
      expect(typeof nbErrors).toBe('number');
      expect(typeof nbVisited).toBe('number');
    });
    test('Should throw error when datas not an array', () => {
      expect(() => {
        getDataBySection('test', '/name');
      }).toThrow();
    });
  });

  describe('test filterDataFromFileByLimitTime function', () => {
    // test('should throw an error when invalid path', () => {
    // voir avec greg pk sans asyn sa marche
    // const sarra = expect(filterDataFromFileByLimitTime('/toto', '1584394396', '10'));
    // console.log('sarra', sarra.reject);
    // });
    //     test('should take a string on parameter and 2 numbers', async () => {
    //       const data = filterDataFromFileByLimitTime('./trafficsMock', '1584394396', '10');
    //       console.log('data', data);
    //       expect(typeof data).toBe('array');
    //     });
  });
});
