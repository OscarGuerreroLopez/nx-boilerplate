import express from 'express';
import { EnvVars } from '@boilerplate/common';
import {
  expressSecureHeaders,
  expressRateLimiter,
  expressEssentials,
  LoggerMiddleware,
  expressRequestIp,
} from '@boilerplate/middleware';
import Router from './http/router';
import { LoadMethods } from './infra/repo/dbMethods';
import { AddAdminUser, AddUsers } from './infra/seed';
import { exceptionMiddleware } from './http/middleware';

const host = EnvVars.HOST ?? 'localhost';
const port = EnvVars.PORT ? Number(process.env.PORT) : 3001;

const app = express();
expressSecureHeaders(app);
expressRateLimiter(app);
expressEssentials(app);
expressRequestIp(app);
app.use(LoggerMiddleware);
app.use(Router);

app.use(exceptionMiddleware);

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

app.listen(port, host, async () => {
  await LoadMethods();
  await AddAdminUser();
  await AddUsers();
  console.log(`[ ready ] http://${host}:${port}`);
});
