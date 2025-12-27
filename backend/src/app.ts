import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { errorHandler } from '~/middlewares/errorHandler';
import productRoutes from '~/routes/product.routes';
import couponRoutes from '~/routes/coupon.routes';
import orderRoutes from '~/routes/order.routes';
import { AppError } from '~/utils/AppError';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(compression());

app.get('/api/health', (_req, res) => {
	res.send('Uniblox backend running 🚀');
});

app.use('/api/products', productRoutes);

app.use('/api/coupons', couponRoutes);

app.use('/api/orders', orderRoutes);

app.use((req, _res, next) => {
	next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
