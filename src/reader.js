// Import
const tail = require('tail');
const { parser } = require('./helpers');

//
/**
 * Listen continously the new line on file
 * Parse new line
 * @param {String} path
 * @param {[Object]} inputData
 */
const reader = (path, inputData) => {
  const watcher = new tail.Tail(path);
  watcher.on('line', (data) => {
    console.log('sarra', data);
    inputData.push(parser(data));
  });
};

// export
exports.reader = reader;
