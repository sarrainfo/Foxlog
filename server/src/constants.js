const DATE_FORMAT_REGEX = /^(([0-9])|([0-2][0-9])|([3][0-1]))\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/;
const W3C_FORMAT_REGEX = /^(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+)\s?(\S+)?\s?(\S+)?" (\d{3}|-) (\d+|-)\s?"?([^"]*)"?\s?"?([^"]*)?"?$/;

// Default path for read file
const ACCESS_LOG_PATH = '/tmp/access.log';

const STATISTICS_EVENT = 'statistics';
const ALERT_EVENT = 'alert';

// Default port
const DEFAULT_PORT = 4000;

// Time in Millisecond
const LIMIT_TIME_STATISTICS = 10000;
const LIMIT_TIME_ALERT = 12000;

// number request per second
const THRESHOLD = 0;

const URL = 'localhost:27017';

// Exports
exports.DATE_FORMAT_REGEX = DATE_FORMAT_REGEX;
exports.W3C_FORMAT_REGEX = W3C_FORMAT_REGEX;
exports.ACCESS_LOG_PATH = ACCESS_LOG_PATH;
exports.LIMIT_TIME_STATISTICS = LIMIT_TIME_STATISTICS;
exports.LIMIT_TIME_ALERT = LIMIT_TIME_ALERT;
exports.STATISTICS_EVENT = STATISTICS_EVENT;
exports.ALERT_EVENT = ALERT_EVENT;
exports.DEFAULT_PORT = DEFAULT_PORT;
exports.THRESHOLD = THRESHOLD;
exports.URL = URL;
