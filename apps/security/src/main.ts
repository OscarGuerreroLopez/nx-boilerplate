/* eslint-disable security/detect-eval-with-expression */
import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  const userinput = req.body.userinput;
  eval(userinput);

  res.send({ message: 'Hello security API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
