import { INestApplication } from '@nestjs/common';
import express from 'express';
import {
  expressSecureHeaders,
  expressRateLimiter,
  expressEssentials,
  expressRequestIp,
} from './index';

export const commonExpressMiddleware = (app: unknown) => {
  if (isINestApplication(app) || isExpressApp(app)) {
    expressSecureHeaders(app);
    expressRateLimiter(app);
    expressEssentials(app);
    expressRequestIp(app);
  } else {
    // Handle unexpected or unsupported types here
    throw new Error('Unsupported app type');
  }
};

// Type guard functions to check types
function isINestApplication(obj: unknown): obj is INestApplication {
  return obj instanceof Object && 'use' in obj && 'listen' in obj;
}

function isExpressApp(obj: unknown): obj is express.Express {
  return obj instanceof Function && 'use' in obj && 'listen' in obj;
}
