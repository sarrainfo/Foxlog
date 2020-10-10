//
/**
 * Connect/Disconnect to socket server
 * Send every event on socket
 * @param {} io
 * @param {[Object]} inputData
 */
const foxlogSocket = (io, reader, events) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    // start emit events on specifics interval
    events.forEach((handleEvent) => {
      handleEvent.clearIntervalEvent();
      handleEvent.startLoopEmitEvent(socket, reader);
    });
    socket.on('disconnect', () => {
      console.log('client disconnected');
      // clearInterval(interval);
      events.forEach((handleEvent) => handleEvent.clearIntervalEvent());
    });
  });
};

// export
exports.foxlogSocket = foxlogSocket;
