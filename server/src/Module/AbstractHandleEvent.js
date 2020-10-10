/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
class AbstractHandleEvent {
  constructor(event, limitTime, reader) {
    this.interval = 0;
    this.event = event;
    this.limitTime = limitTime;
    this.reader = reader;
  }

  /**
 *  clear interval
 * @param {Number} interval
 */
  clearIntervalEvent(interval) {
    if (this.interval) {
      clearInterval(interval);
    }
  }

  /**
   * Send event with specifics data
   * @param socket.io socket
   * @param {Reader} reader
   */
  getDataAndEmitEvent(socket) {
    const dataToSend = this.formatData(this.reader);
    console.log(this.event, dataToSend);
    // console.log('socket', this.event);
    socket.emit(this.event, dataToSend);
  }

  startLoopEmitEvent(socket) {
    throw new Error('You have to implement the method formateDataToSend!');
  }

  /**
     * Implementation required
     * @returns {*} data formated
     */

  formatData() {
    throw new Error('You have to implement the method formateDataToSend!');
  }
}

//= ===============================
// export
module.exports = AbstractHandleEvent;
