/* eslint-disable no-use-before-define */
// Import
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {
  ACCESS_LOG_PATH, LIMIT_TIME, SOCKET_EVENT, DEFAULT_PORT,
} = require('./constants');
const {
  getAllSection, getDataBySection, sortByNbVisited,
} = require('./helpers');

const { apiFoxlog } = require('./api');
const { writer } = require('./writer');
const { reader } = require('./reader');

const FOXLOG_ACCESSLOG_PATH = process.env.FOXLOG_ACCESSLOG_PATH || ACCESS_LOG_PATH;
const PORT = process.env.SERVER_PORT || DEFAULT_PORT;
//= ====================================================
//
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
let inputData = [];
let outputData = [];
let interval;

console.log('Foxlogenv', process.env.FOXLOG_ACCESSLOG_PATH);
// Write request on file
writer(app, FOXLOG_ACCESSLOG_PATH);

// Create API
apiFoxlog(app, FOXLOG_ACCESSLOG_PATH);

// Read continously the new input on file
reader(FOXLOG_ACCESSLOG_PATH, inputData);

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// Send  statistics to client
io.on('connection', (socket) => {
  console.log('Client connected');
  if (interval) {
    clearInterval(interval);
  }
  console.log('INPUT data from app', inputData);
  // watcher.watch();
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
