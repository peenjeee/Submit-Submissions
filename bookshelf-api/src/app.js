import express from 'express';
import bookRoutes from './routes/bookRoutes.js';

const app = express();

app.use(express.json());
app.use('/books', bookRoutes);

export default app;
