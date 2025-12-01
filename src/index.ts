import express from 'express';
import { connectDB } from './config/db';
import router from './routes';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());

connectDB();
const PORT = Number(process.env.PORT) || 3000;

app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // your FE URL
    credentials: true, // allow cookies
  })
);
app.use('/', router);

// app.use(morgan('dev'));
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// Server images from src/images

app.use('/images', express.static(path.join(__dirname, 'images')));
