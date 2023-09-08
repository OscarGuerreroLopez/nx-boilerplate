import express from 'express';
import { EnvVars, logger, NodeEnvEnum } from '@boilerplate/common';
import {
  LoggerMiddleware,
  commonExpressMiddleware,
} from '@boilerplate/middleware';
import Router from './http/router';
import { LoadMethods } from './infra/repo/dbMethods';
import { AddAdminUser, AddUsers } from './infra/seed';
import { exceptionMiddleware } from './http/middleware';

const host = EnvVars.HOST ?? 'localhost';
const port = EnvVars.PORT ? Number(process.env.PORT) : 3001;

const app = express();
commonExpressMiddleware(app);
app.use(LoggerMiddleware);
app.use(Router);

app.use(exceptionMiddleware);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('uncaughtException', (e: any) => {
  logger.error('uncaughtException', e);

  setTimeout(() => {
    process.exit(1);
  }, 2000);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (e: any) => {
  logger.error('unhandledRejection', e);

  setTimeout(() => {
    process.exit(1);
  }, 2000);
});

app.listen(port, host, async () => {
  await LoadMethods();
  if (
    EnvVars.NODE_ENV === NodeEnvEnum.TEST ||
    EnvVars.NODE_ENV === NodeEnvEnum.DEVELOPMENT
  ) {
    await AddAdminUser();
    await AddUsers();
  }

  logger.info(`[ ready ] http://${host}:${port}`, {
    service: 'user',
    file: 'main.ts',
    code: '',
  });
});
