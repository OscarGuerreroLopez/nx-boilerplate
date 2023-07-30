import { Express } from 'express';
import helmet from 'helmet';

export const expressSecureHeaders = (app: Express) => {
  app.use(helmet());
};
