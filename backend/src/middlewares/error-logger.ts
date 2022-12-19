import expressWinston from 'express-winston';
import winston from 'winston';

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/http-error.log',
      level: 'error',
    }),
  ],
  format: winston.format.combine(winston.format.json()),
});

export default errorLogger;
