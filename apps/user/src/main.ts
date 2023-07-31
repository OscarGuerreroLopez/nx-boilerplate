import express from 'express';
import { EnvVars } from '@boilerplate/common';
import {
  expressSecureHeaders,
  expressRateLimiter,
  expressEssentials,
} from '@boilerplate/middleware';
import Router from './http/router';

const host = EnvVars.HOST ?? 'localhost';
const port = EnvVars.PORT ? Number(process.env.PORT) : 3001;

const app = express();
expressSecureHeaders(app);
expressRateLimiter(app);
expressEssentials(app);

app.use(Router);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('uncaughtException', (e: any) => {
  console.error({ type: 'uncaughtException', e });
  process.exit(1);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (e: any) => {
  console.error({ type: 'unhandledRejection', e });
  process.exit(1);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
