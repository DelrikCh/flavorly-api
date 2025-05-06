import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

import { connectDB } from './db/index.js';
import './models/index.js';
import categoriesRouter from './routes/categoriesRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import areasRouter from './routes/areasRouter.js';
import usersRouter from './routes/usersRouter.js';
import testimonialsRouter from './routes/testimonialsRouter.js';

await connectDB();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/avatars', express.static(path.resolve('public/avatars')));

app.use('/api/categories', categoriesRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/areas', areasRouter);
app.use('/api/users', usersRouter);
app.use('/api/testimonials', testimonialsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;

  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ status: 400, message: 'Error while uploading file' });
  }

  res.status(status).json({ status, message });
});

app.listen(3000, () => {
  console.log('Server is running. Use our API on port: 3000');
});
