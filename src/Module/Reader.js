// Import
const tail = require('tail');
const { parser } = require('../helpers');

/**
 *
 */
class Reader {
  constructor(path) {
    this.nbRequest = 0;
    this.inputData = [];
    this.path = path;
  }

  //
  /**
 * Listen continously the new line on file
 * Parse new line
 * @param {String} path
 */
  startRead() {
    const watcher = new tail.Tail(this.path);
    watcher.on('line', (data) => {
      console.log('sarra', data);
      this.inputData.push(parser(data));
      this.nbRequest += 1;
    });
  }

  initializeNbRequest() {
    this.nbRequest = 0;
  }

  getNbRequest() {
    return this.nbRequest;
  }

  initializeInputData() {
    this.inputData = [];
  }

  getInputData() {
    return this.inputData;
  }
}
// export
module.exports = Reader;
