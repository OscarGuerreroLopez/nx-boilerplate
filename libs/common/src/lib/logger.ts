import * as winston from 'winston';
import { EnvVars, NodeEnvEnum } from './validateEnv';
import { SanitiseBody } from './bodySanitation';

const { combine, timestamp, prettyPrint } = winston.format;

export enum Severity {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface BoilerplateLogger {
  service: string;
  file: string;
  method?: string;
  code: string;
  [key: string]: any;
}

export type SeverityType = 'info' | 'warn' | 'error';

const WinstonLogger = winston.createLogger({
  // level: "info",
  format: combine(timestamp(), prettyPrint()),

  // in a more professional app this will be logged to elasticsearch (kibana) or something alike
  // for this test we just log into a file

  transports: [
    new winston.transports.File({
      filename: './logs/info.log',
      level: Severity.INFO,
    }),
    new winston.transports.File({
      filename: './logs/warn.log',
      level: Severity.WARN,
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: Severity.ERROR,
    }),
  ],
});

WinstonLogger.on('error', (error) => {
  console.error('!!!!!!!!!!!!!!!!Logger Error caught', error);
});

if (
  EnvVars.NODE_ENV === NodeEnvEnum.DEVELOPMENT ||
  EnvVars.NODE_ENV === NodeEnvEnum.TEST
) {
  WinstonLogger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export const logger = {
  info: (message: string, data: BoilerplateLogger): void => {
    WinstonLogger.info(message, SanitiseBody(data));
  },
  warn: (message: string, data: BoilerplateLogger): void => {
    WinstonLogger.warn(message, SanitiseBody(data));
  },
  error: (message: string, data: BoilerplateLogger): void => {
    WinstonLogger.error(message, SanitiseBody(data));
  },
};
