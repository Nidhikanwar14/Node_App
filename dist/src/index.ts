import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from '../../src/config/db';
import router from '../../src/routes';
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;
app.use('/', router);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
