// Import
const mongoose = require('mongoose');

/**
 * AlL data about traffic
 * Date and
 *
 */
const trafficSchema = new mongoose.Schema({
  // Number of request per second
  value: Number,
  // Date during the average is reached
  date: String,
});

const Traffic = mongoose.model('Traffic', trafficSchema);

// export
module.exports = Traffic;
