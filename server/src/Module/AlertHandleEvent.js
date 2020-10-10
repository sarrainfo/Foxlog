/* eslint-disable no-use-before-define */
const { LIMIT_TIME_ALERT, ALERT_EVENT, THRESHOLD } = require('../constants');
const AbstractHandleEvent = require('./AbstractHandleEvent');
const { addTraffic } = require('../Service/traffics');

class AlertHandleEvent extends AbstractHandleEvent {
  constructor(reader) {
    super(ALERT_EVENT, LIMIT_TIME_ALERT, reader);
  }

  /**
   * Get data to send for Alert event
   */
  formatData() {
    const dataToSend = {
      date: new Date(Date.now()).toLocaleString(),
      value: this.getTraffic(),
    };
    return dataToSend;
  }

  /**
   *  start interval
   *  verify
   *  format data and emit event
   *  update data
   * @param {socket.io} socket
   */
  startLoopEmitEvent(socket) {
    this.interval = setInterval(async () => {
      // if (isToEmit(this.getTraffic(this.reader))) {
      //   console.log('sarra');
      //   this.getDataAndEmitEvent(socket, this.reader);
      // }
      await addTraffic({ value: 8, date: '22 fevrier' });
      this.getDataAndEmitEvent(socket, this.reader);
      this.reader.initializeNbRequest();
    }, this.limitTime);
  }

  /**
   * Calcul traffics in order to have request per second
   * @returns number
   */
  getTraffic() {
    console.log('reader', this.reader.getNbRequest());
    return (this.reader.getNbRequest() * 1000) / LIMIT_TIME_ALERT;
  }
}
//= ================================
// handler
/**
   * @param {Number} traffic  number request per second
   * @returns {boolean} true if traffics crossed threshold
   */
const isToEmit = (traffic) => {
  console.log('traffics', traffic);
  if (traffic > THRESHOLD) {
    return true;
  }
  return false;
};

// Export

module.exports = AlertHandleEvent;
