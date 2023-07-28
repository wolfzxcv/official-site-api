import morgan, { StreamOptions } from 'morgan';
import winston from 'winston';
import { currentENV } from '../utils';

const levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// write only error in development, write all in other mode
const level = () => {
  const env = currentENV;
  const isDevelopment = env === 'development';
  return isDevelopment ? 'error' : 'debug';
};

type IWinstonColors = 'red' | 'yellow' | 'green' | 'magenta' | 'white';

const colors: { [key: string]: IWinstonColors } = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    msg => `${[msg.timestamp]} ${msg.level}: ${msg.message}`
  )
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize({ all: true })),
    level: 'debug'
  }),
  new winston.transports.File({
    filename: 'error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'all.log', level: 'debug' })
];

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});

const stream: StreamOptions = {
  write: message => logger.http(message)
};

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms - :remote-addr',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream }
);
