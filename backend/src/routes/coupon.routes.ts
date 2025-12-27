import express from 'express';
import { createCoupon, listCoupons, validateCoupon } from '~/controllers/coupon.controller';
import { validateResource } from '~/middlewares/validateResource';
import { createCouponSchema } from '~/schemas/coupon.schema';

const router = express.Router();

router.post('/create', validateResource(createCouponSchema), createCoupon);

router.get('/list', listCoupons);

router.post('/validate', validateCoupon);

export default router;
