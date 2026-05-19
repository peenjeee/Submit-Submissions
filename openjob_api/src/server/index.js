import express from 'express';
import cors from 'cors';
import fs from 'fs';
import 'dotenv/config';
import routes from '../routes/index.js';
import errorHandler from '../middlewares/error.js';
import response from '../utils/response.js';

const app = express();

fs.mkdirSync('uploads/documents', { recursive: true });

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((req, res) => response(res, 404, 'Route tidak ditemukan'));
app.use(errorHandler);

export default app;
