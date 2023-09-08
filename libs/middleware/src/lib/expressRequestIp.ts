import { Express } from 'express';
import { INestApplication } from '@nestjs/common';
import requestIp from 'request-ip';

export const expressRequestIp = (app: Express | INestApplication) => {
  // use better rate limiter middleware
  app.use(requestIp.mw());
};
