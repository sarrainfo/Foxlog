/* eslint-disable no-use-before-define */
// Import
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const tail = require('tail');

const { ACCESS_LOG_PATH, LIMIT_TIME, SOCKET_EVENT } = require('./constants');
const {
  parser, getAllSection, getDataBySection, sortByNbVisited,
} = require('./helpers');

//= ====================================================
//
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
let inputData = [];
let outputData = [];
let interval;
const watcher = new tail.Tail(ACCESS_LOG_PATH);

httpServer.listen(4000, () => {
  console.log('listening on *:4000');
});
app.get('/', (req, res) => {
  res.send({ response: 'Server ready' }).status(200);
});

// Listen continously the new input on /tmp/accesslog file
watcher.on('line', (data) => {
  inputData.push(parser(data));
});

// Send  statistics to client
io.on('connection', (socket) => {
  console.log('Client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => emitStatistics(socket), LIMIT_TIME);
  socket.on('disconnect', () => {
    console.log('client disconnected');
    clearInterval(interval);
  });
});

//= =============================
// handle function
/**
 *  update datas and send
 * @param {socket.io} socket
 */
const emitStatistics = (socket) => {
  outputData = getAllSection(inputData).map((section) => getDataBySection(inputData, section));
  inputData = [];
  socket.emit(SOCKET_EVENT, sortByNbVisited(outputData));
};
