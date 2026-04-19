import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import { errors } from 'celebrate';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger); // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors()); // 3. Дозвіл для запитів з інших доменів
app.use(cookieParser());

// підключаємо групу маршрутів студента
app.use(authRoutes);
app.use(notesRoutes);

// 404 і обробник помилок — наприкінці ланцюжка
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
