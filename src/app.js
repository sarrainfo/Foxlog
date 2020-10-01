// Import

// Package
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const tail = require('tail');
const lineReader = require('line-reader');
const cron = require('cron');
//
const { ACCESS_LOG_PATH, LIMIT_TIME } = require('./constants');
const { parser, getAllSection, getDataBySection } = require('./helpers');
//= ====================================================

const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer);
let inputData = [];
let outputData = [];
const watcher = new tail.Tail(ACCESS_LOG_PATH);

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});

// const data = fs.readFileSync(ACCESS_LOG_PATH, 'utf8')
// lineReader.eachLine(ACCESS_LOG_PATH, (line, last) => {
//   console.log(line);
//   const { date } = parser(line);
//   console.log(date);
//   if (date > (Date.now() - LIMIT_TIME)) {
//     inputData.push();
//   }
// date > (Date.now() - LIMIT_TIME) && inputData.push();
// });

// Listen continously the new input on accesslog
watcher.on('line', (data) => {
  console.log('data', data);
  inputData.push(parser(data));
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Every 10 second, make stats

const job = new cron.CronJob('*/100 * * * * *', (() => {
  console.log('10 sec');
  // console.log('You will see this message every 10 second');
  outputData = getAllSection(inputData).map((section) => getDataBySection(inputData, section));
  console.log('ssss', outputData);
  inputData = [];
  // const essai = getAllSection(data).map(section=>getoutputTraffics(data,section));
}));
job.start();

io.on('connection', (socket) => {
  console.log('a user connected');
});
