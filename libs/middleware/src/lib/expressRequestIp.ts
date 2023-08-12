import { Express } from 'express';
import requestIp from 'request-ip';

export const expressRequestIp = (app: Express) => {
  // use better rate limiter middleware
  app.use(requestIp.mw());
};
