// Import
const Traffic = require('../Model/traffic');
const { dbFoxlogConnect } = require('../dbFoxlogConnection');

const addTraffic = async ({ value, date }) => {
  let db = null;
  try {
    db = await dbFoxlogConnect();
    const trafficToAdd = new Traffic({ value, date });
    await trafficToAdd.save();
    console.log('add traffic success');
    db.close();
  } catch (e) {
    if (db) {
      db.close();
    }
    throw new Error('traffic has not be saved');
  }
};

const getTraffics = async () => {
  let db = null;
  try {
    db = await dbFoxlogConnect();
    const traffics = Traffic.find({});
    db.close();
    return traffics;
  } catch (e) {
    if (db) {
      db.close();
    }
    throw new Error('Can not access to foxlog data base');
  }
};

// export
exports.addTraffic = addTraffic;
exports.getTraffics = getTraffics;
