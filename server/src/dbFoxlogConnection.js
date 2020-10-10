// Import
const mongoose = require('mongoose');
const { URL } = require('./constants');

const dbFoxlogConnect = async () => {
  let db = null;
  try {
    await mongoose.connect(`mongodb://${URL}/foxlogTest`, { useNewUrlParser: true, useUnifiedTopology: true });
    db = mongoose.connection;
    console.log('success connect to foxlog db');
    return db;
  } catch (err) {
    (db) && db.close();
    console.log('Error at dbConnect ::', err);
    throw err;
  }
};

// export
exports.dbFoxlogConnect = dbFoxlogConnect;
