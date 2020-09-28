// Import
const {getTimestamp, parser} = require('../src/helpers');
const { w3cFormatHttp, w3cFormatHttp2} = require('./mock');


//==========================================================
// 
describe('Test helpers function', function() {
    describe('Test getTimestamp function', function() {
      test('Should return the correct timestamp from date format iso ', function() {
          const timestampsValue = getTimestamp("09/Mar/2020:19:00:00 +0000");
          const expectedValue = 1583780400;
          expect(timestampsValue).toBe(expectedValue);
      });
        test('Should throw an error when invalid format of date', function(){
            expect(()=>{
            getTimestamp("09/03/2020:19:00:00");
            }).toThrow()
        });
    });

    describe('Test Parser function',function(){
        const parserValue = parser(w3cFormatHttp);
        const parserValue2= parser(w3cFormatHttp2);
        test('should return specifique property',function(){
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
    });
})