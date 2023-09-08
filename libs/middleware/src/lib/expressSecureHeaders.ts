import { Express } from 'express';
import { INestApplication } from '@nestjs/common';

import helmet from 'helmet';

export const expressSecureHeaders = (app: Express | INestApplication) => {
  app.use(helmet());
};
