// Import
const { sortByNbVisited } = require('../../src/helpers');

//= ===================
describe('Test sortSectionByNbVisitor function', () => {
  test('Should return an array of object sorted by descending order of nbVisited', () => {
    const mockData = [
      { section: '/toto', nbVisited: 6, nbErrors: 0 },
      { section: '/api', nbVisited: 1, nbErrors: 0 },
      { section: '/users', nbVisited: 7, nbErrors: 7 },
      { section: '/post', nbVisited: 4, nbErrors: 1 },
    ];
    const expectedData = [
      { section: '/users', nbVisited: 7, nbErrors: 7 },
      { section: '/toto', nbVisited: 6, nbErrors: 0 },
      { section: '/post', nbVisited: 4, nbErrors: 1 },
      { section: '/api', nbVisited: 1, nbErrors: 0 },

    ];
    const list = sortByNbVisited(mockData);
    expect(list).toEqual(expectedData);
  });
});
