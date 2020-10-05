const DATE_FORMAT_REGEX = /^(([0-9])|([0-2][0-9])|([3][0-1]))\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}$/;
const W3C_FORMAT_REGEX = /^(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+)\s?(\S+)?\s?(\S+)?" (\d{3}|-) (\d+|-)\s?"?([^"]*)"?\s?"?([^"]*)?"?$/;
const ACCESS_LOG_PATH = '/tmp/access.log';
const SOCKET_EVENT = 'FromFoxlog';
// Millisecond
const LIMIT_TIME = 100000;

// Exports
exports.DATE_FORMAT_REGEX = DATE_FORMAT_REGEX;
exports.W3C_FORMAT_REGEX = W3C_FORMAT_REGEX;
exports.ACCESS_LOG_PATH = ACCESS_LOG_PATH;
exports.LIMIT_TIME = LIMIT_TIME;
exports.SOCKET_EVENT = SOCKET_EVENT;
