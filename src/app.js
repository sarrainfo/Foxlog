// Import
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {
  ACCESS_LOG_PATH, DEFAULT_PORT,
} = require('./constants');

const { apiFoxlog } = require('./api');
const { writer } = require('./writer');
const { reader } = require('./reader');
const { foxlogSocket } = require('./foxlogSocket');

const FOXLOG_ACCESSLOG_PATH = process.env.FOXLOG_ACCESSLOG_PATH || ACCESS_LOG_PATH;
const PORT = process.env.SERVER_PORT || DEFAULT_PORT;
//= ====================================================
//
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
// eslint-disable-next-line prefer-const
let inputData = [];

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
foxlogSocket(io, inputData);
