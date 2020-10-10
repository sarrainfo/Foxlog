// Import
const { getDataBySection } = require('../../src/helpers');
const { datas } = require('../mock');

//= ============================================

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
