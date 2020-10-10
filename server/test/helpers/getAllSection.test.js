// Import
const { getAllSection } = require('../../src/helpers');

//= ==========================

describe('test getAllSection function', () => {
  const expected = ['/user', '/api'];
  test('Should throw error when data parameter not an array', () => {
    const data = 'toto';
    expect(() => {
      getAllSection(data);
    }).toThrow();
  });
  test('Should not throw an error whan data is an array', () => {
    const fackDatas = ['tata', 'toto'];
    expect(() => {
      getAllSection(fackDatas);
    }).not.toThrow();
  });
  test('Should return section', () => {
    const fackDatas = [{ section: '/api' }, { section: '/user' }, { date: 234324 }];
    expect(getAllSection(fackDatas)).toEqual(expect.arrayContaining(expected));
  });
  test('Should not contains duplicates section', () => {
    const fackDatas = [{ section: '/api' }, { section: '/user' }, { section: '/api' }];
    expect(getAllSection(fackDatas)).toEqual(['/api', '/user']);
  });
});
