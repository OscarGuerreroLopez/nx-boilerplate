import { Express } from 'express';
import rateLimit from 'express-rate-limit';

export const expressRateLimiter = (app: Express) => {
  // use better rate limiter middleware
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // limit each IP to 100 requests per windowMs
    })
  );
};
