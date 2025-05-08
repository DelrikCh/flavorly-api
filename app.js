import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import { connectDB } from './db/index.js';
import './models/index.js';
import categoriesRouter from './routes/categoriesRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import areasRouter from './routes/areasRouter.js';
import usersRouter from './routes/usersRouter.js';
import recipesRouter from './routes/recipesRouter.js';
import testimonialsRouter from './routes/testimonialsRouter.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';

await connectDB();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/categories', categoriesRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/areas', areasRouter);
app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/testimonials', testimonialsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, _req, res, _next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log('Server is running. Use our API on port: 3000');
});
