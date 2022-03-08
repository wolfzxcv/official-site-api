import winston from 'winston';

const customLevels = { ...winston.config.syslog.levels, wait: 8, event: 9 };
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm' }),
  winston.format.align(),
  winston.format.printf(
    msg => `${msg.level}: ${[msg.timestamp]} ${msg.message}`
  )
);

export const logger = winston.createLogger({
  level: 'event',
  levels: customLevels,
  format: customFormat,
  transports: [
    new winston.transports.File({
      filename: 'info.log'
    })
  ]
});

export const stream = {
  write: (message: string) => {
    logger.info(message);
  }
};
