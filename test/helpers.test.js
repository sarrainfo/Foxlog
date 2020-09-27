// Import
const getTimestamp = require('../src/helpers');

describe('Test helpers function', function() {
    describe('Test getTimestamp function', function() {
      test('Should return the correct timestamp from date format iso ', function() {
          const timestampsValue = getTimestamp("09/Mar/2020:19:00:00 +0000");
          const expectedValue = 1583780400;
          expect(timestampsValue).toBe(expectedValue);
      });
    })
})