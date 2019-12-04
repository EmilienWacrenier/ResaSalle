const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');
const winston = require('winston');

require('winston-daily-rotate-file');
const moment = require('moment');
const CONFIG = require('./config');

const { combine, printf } = format;
const logPath = CONFIG.log_path;
let colorBoolean = false;

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    debug: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red',
  },
};

if (CONFIG.app === 'local') {
  colorBoolean = true;
  winston.addColors(config.colors);
}

const myFormat = printf(info => `${info.timestamp} [${info.level}]:${info.message}`);
const appendTimestamp = format((info, opts) => {
  if(opts.tz)
    info.timestamp = moment().tz(opts.tz).format();
  return info;
});


const rotateTransportExceptions = new transports.DailyRotateFile({
  dirname: logPath,
  level : CONFIG.log_level_exceptions,
  filename: 'exceptions-pvc-%DATE%.log',
  frequency: '24h',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  handleExceptions: true,
  prettyPrint: true,
  json: true,
  colorize: colorBoolean,
  tailable: true,
});


const consoleTransport = new transports.Console({
  level : CONFIG.log_level,
  format: format.combine(
    format.colorize(),
    format.simple(),
    appendTimestamp({ tz: 'Europe/Paris' }),
    myFormat
  ),
  prettyPrint: true,
  handleExceptions: true
});

const rotateTransportAll = new transports.DailyRotateFile({
  dirname: logPath,
  level : CONFIG.log_level,
  filename: 'log-pvc-%DATE%.log',
  frequency: '24h',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  handleExceptions: true,
  prettyPrint: true,
  json: true,
  tailable: true,
});


const logger = createLogger({
  levels: config.levels,
  format: combine(
    appendTimestamp({ tz: 'Europe/Paris' }),
    myFormat
  ),
  transports: [
    consoleTransport,
    rotateTransportAll
  ],
  exceptionHandlers: [rotateTransportExceptions, consoleTransport, rotateTransportAll],
  exitOnError: false,
});

const expressLogger = expressWinston.logger({
  meta: true,
  expressFormat: true,
  colorize: colorBoolean,
  format: winston.format.combine(winston.format.json()),
  winstonInstance: logger,
});

module.exports = { logger, expressLogger, winston };