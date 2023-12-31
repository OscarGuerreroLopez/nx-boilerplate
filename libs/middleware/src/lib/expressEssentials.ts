import express from 'express';
import cors from 'cors';

export const expressEssentials = (app: express.Express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '300kb' }));
  app.use(cors({ credentials: true, origin: true }));
};
