// Import
const lineReader = require('line-reader');
const { DATE_FORMAT_REGEX, W3C_FORMAT_REGEX } = require('./constants');

//= ===========================================
/**
 * Convert data us-format to timestamp
 * @param {string} date dd/MMM/yyyy:hh:mm:ss ZZZZ
 * @returns {number}
 */
const getTimestamp = (date) => {
  if (!Array.isArray(date.match(DATE_FORMAT_REGEX))) {
    throw new Error('Invalid date format');
  }
  return new Date(date.replace(':', ' ')).getTime() / 1000;
};

/**
 * Get informations from w3c formated http
 * @param {string} w3cFormatLine - logfile format w3c
 * @returns {object}
 */
const parser = (w3cFormatLine) => {
  // use this regex https://www.regextester.com/95830
  const values = w3cFormatLine.match(W3C_FORMAT_REGEX);

  return {
    host: values[1],
    logName: values[2],
    authUser: values[3],
    date: getTimestamp(values[4]),
    method: values[5],
    url: values[6],
    section: `/${values[6].split('/')[1]}`,
    version: values[7],
    status: parseInt(values[8], 10),
    bytes: parseInt(values[9] || 0, 10),
  };
};

/**
 *  Filter datas by section
 *  return relevant information about section
 * @param {[Object]} datas - All parse datas
 * @param {String} section -
 */
const getDataBySection = (datas, section) => {
  let nbVisited;
  // check que datas est un array
  const errors = datas.filter((data) => data.section === section)
    .filter((data, _, tab) => {
      nbVisited = tab.length;
      return data.status > 300 || data.status === 300;
    });
  return {
    section,
    nbErrors: errors.length,
    nbVisited,
  };
};

const filterDataFromFileByLimitTime = (path, specialDate, limit) => {
  lineReader.eachLine('./trafficsMock', (line) => {
    console.log(line);
  });
};

//= =============================================
// Export
exports.getTimestamp = getTimestamp;
exports.parser = parser;
exports.getDataBySection = getDataBySection;
exports.filterDataFromFileByLimitTime = filterDataFromFileByLimitTime;
