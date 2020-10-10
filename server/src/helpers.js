// Import
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
 * Convert date to timestamp
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
    bytes: parseInt(values[9], 10) || 0,
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

/**
 * Retrive all section from data
 * @param {[Object]} datas
 * @returns {[String]}
 */
const getAllSection = (datas) => {
  let allSections = [];
  datas.forEach((data) => allSections.push(data.section));
  // Remove duplicate
  allSections = [...new Set(allSections)];
  return allSections;
};

/**
 * Sort datas by nbVisited values
 * in descending order
 *
 * @param {[Object]} datas - an array containing {section, nbVisited, nbErrors}
 */
const sortByNbVisited = (datas) => datas.sort((a, b) => b.nbVisited - a.nbVisited);

//= =============================================
// Export
exports.getTimestamp = getTimestamp;
exports.parser = parser;
exports.getDataBySection = getDataBySection;
exports.getAllSection = getAllSection;
exports.sortByNbVisited = sortByNbVisited;
