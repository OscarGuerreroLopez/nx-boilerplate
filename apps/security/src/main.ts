import express from 'express';
import fs from 'fs';
import { EnvVars } from '@boilerplate/common';
import {
  expressSecureHeaders,
  expressRateLimiter,
} from '@boilerplate/middleware';

const host = EnvVars.HOST ?? 'localhost';
const port = EnvVars.PORT ? Number(process.env.PORT) : 3000;

const app = express();
expressSecureHeaders(app);
expressRateLimiter(app);

app.get('/', (req, res) => {
  const userinput = req.body?.userinput;
  if (userinput) {
    eval(userinput);
  }

  const path = req.body?.userinput;
  if (path) {
    fs.readFileSync(path);
  }

  res.send({ message: 'Hello security API', author: 'oscar' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
