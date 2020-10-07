/* eslint-disable no-use-before-define */
// Import
const { LIMIT_TIME, SOCKET_EVENT } = require('./constants');
const { getAllSection, getDataBySection, sortByNbVisited } = require('./helpers');

//
/**
 * Connect/Disconnect to socket server
 * Send statistics on socket
 * @param {} io
 * @param {[Object]} inputData
 */
const foxlogSocket = (io, inputData) => {
  let interval;
  io.on('connection', (socket) => {
    console.log('Client connected');
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => emitStatistics(socket, inputData), LIMIT_TIME);
    socket.on('disconnect', () => {
      console.log('client disconnected');
      clearInterval(interval);
    });
  });
};
//= =============================
// handle function
/**
   *  Make statistics from input and send
   * update inputData
   * @param {socket.io} socket
   * @param {[Object]} data
   */
const emitStatistics = (socket, inputData) => {
  const statisticsData = getAllSection(inputData).map(
    (section) => getDataBySection(inputData, section),
  );
  socket.emit(SOCKET_EVENT, sortByNbVisited(statisticsData));
  inputData.splice(0, inputData.length);
};

// export
exports.foxlogSocket = foxlogSocket;
