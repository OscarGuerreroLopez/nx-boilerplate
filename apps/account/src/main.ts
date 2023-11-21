import { NestFactory } from '@nestjs/core';
import {
  commonExpressMiddleware,
  LoggerMiddleware,
} from '@boilerplate/middleware';
import { EnvVars, logger } from '@boilerplate/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'account';
  app.setGlobalPrefix(globalPrefix);
  commonExpressMiddleware(app);

  app.use(LoggerMiddleware);

  const port = EnvVars.ACCOUNT_PORT;

  await app.listen(port);
  logger.info(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    {
      service: 'account',
      file: 'main.ts',
      code: '',
    }
  );
}

bootstrap();
