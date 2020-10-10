// Import
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {
  ACCESS_LOG_PATH, DEFAULT_PORT,
} = require('./constants');

const { apiFoxlog } = require('./api');
const { writer } = require('./writer');
const Reader = require('./Module/Reader');
const { foxlogSocket } = require('./foxlogSocket');
const AlertHandleEvent = require('./Module/AlertHandleEvent');
const StatisticsHandleEvent = require('./Module/StatisticsHandleEvent');

const FOXLOG_ACCESSLOG_PATH = process.env.FOXLOG_ACCESSLOG_PATH || ACCESS_LOG_PATH;
const PORT = process.env.SERVER_PORT || DEFAULT_PORT;
//= ====================================================
//
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
// All FoxLog event
const events = [];

console.log('Foxlogenv', process.env.FOXLOG_ACCESSLOG_PATH);
// Write request on file
writer(app, FOXLOG_ACCESSLOG_PATH);

// Create API
apiFoxlog(app, FOXLOG_ACCESSLOG_PATH);

// Read continously the new input on file
//
const read = new Reader(FOXLOG_ACCESSLOG_PATH);
read.startRead();

//
events.push(new StatisticsHandleEvent(read));
events.push(new AlertHandleEvent(read));
// Send  events to client
// Statistics and alert event
foxlogSocket(io, read, events);

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
