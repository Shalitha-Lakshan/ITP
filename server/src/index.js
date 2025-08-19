import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectToDatabase } from './lib/db.js';
import { errorHandler, notFound } from './middleware/error.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import binRoutes from './routes/bins.routes.js';
import dropRoutes from './routes/drops.routes.js';
import deliveryRoutes from './routes/deliveries.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import manufacturerRoutes from './routes/manufacturer.routes.js';
import productRoutes from './routes/products.routes.js';
import orderRoutes from './routes/orders.routes.js';
import financeRoutes from './routes/finance.routes.js';
import reportRoutes from './routes/reports.routes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'EcoCycle API', version: '0.1.0' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bins', binRoutes);
app.use('/api/drops', dropRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/manufacturer', manufacturerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`EcoCycle API listening on :${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });