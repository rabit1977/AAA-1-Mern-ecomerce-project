import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRouter from './routes/auth.js';
import categoryRouter from './routes/category.js';
import productRouter from './routes/product.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Mongo db database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB error:', err));

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routers
app.use('/api', authRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
