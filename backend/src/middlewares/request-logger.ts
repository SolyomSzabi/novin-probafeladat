import expressWinston from 'express-winston';
import winston from 'winston';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/requests.log',
      level: 'info',
    }),
  ],
  format: winston.format.combine(winston.format.json()),
});

export default requestLogger;
