//Import
const DATE_FORMAT_REGEX = require('./constants');


/**
 * Convert data us-format to timestamp
 * @param {string} date dd/MMM/yyyy:hh:mm:ss ZZZZ 
 * @returns {number} 
 */
const getTimestamp=(date)=>{
    if(!Array.isArray(date.match(DATE_FORMAT_REGEX ))){
        throw new Error("Invalid date format")
    }
    return new Date(date.replace(':',' ')).getTime()/1000;
    
}
module.exports = getTimestamp