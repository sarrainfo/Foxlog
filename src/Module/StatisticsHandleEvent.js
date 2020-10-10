const { STATISTICS_EVENT, LIMIT_TIME_STATISTICS } = require('../constants');
const { getAllSection, getDataBySection, sortByNbVisited } = require('../helpers');

const AbstractHandleEvent = require('./AbstractHandleEvent');

class StatisticsHandleEvent extends AbstractHandleEvent {
  constructor(reader) {
    super(STATISTICS_EVENT, LIMIT_TIME_STATISTICS, reader);
  }

  /**
   * Get statistics data
   */
  formatData() {
    const data = this.reader.getInputData();
    let dataToSend = getAllSection(data).map(
      (section) => getDataBySection(data, section),
    );
    console.log('dataTo send', dataToSend);
    dataToSend = sortByNbVisited(dataToSend);
    console.log('statistics event data to send', dataToSend);
    return dataToSend;
  }

  /**
   * start interval
   * format data and emit
   * update Read modul data
   * @param {socket.io} socket
   */
  startLoopEmitEvent(socket) {
    this.interval = setInterval(() => {
      this.getDataAndEmitEvent(socket);
      this.reader.initializeInputData();
    }, this.limitTime);
  }
}

module.exports = StatisticsHandleEvent;
