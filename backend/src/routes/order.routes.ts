import express from 'express';
import { createOrder, listAllOrders } from '~/controllers/order.controller';
import { validateResource } from '~/middlewares/validateResource';
import { createOrderSchema } from '~/schemas/order.schema';

const router = express.Router();

router.post('/create', validateResource(createOrderSchema), createOrder);

router.get('/list', listAllOrders);

export default router;
