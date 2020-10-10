// Import
const { getTimestamp } = require('../../src/helpers');

//= ==============================

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
