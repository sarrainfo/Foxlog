// Import
const morgan = require('morgan');
const fs = require('fs');

/**
 * Write incomming request on file
 * Create file if not exist
 * @param {String} path
 */
const writer = (app, path) => {
  console.log('writer');
  if (!fs.existsSync(path)) {
    console.log('not exist');
    fs.writeFileSync(path, '');
  }
  const accessLogStream = fs.createWriteStream(path, { flags: 'a' });
  app.use(morgan('common', { stream: accessLogStream }));
  return app;
};

exports.writer = writer;
