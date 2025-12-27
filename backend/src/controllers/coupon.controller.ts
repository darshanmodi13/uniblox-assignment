import { Request, Response } from 'express';
import { couponStore } from '~/store/coupon.store';
import { CreateCouponInput } from '~/schemas/coupon.schema';
import { AppError } from '~/utils/AppError';

export const createCoupon = (req: Request<{}, {}, CreateCouponInput>, res: Response): void => {
	const { code, nthOrder } = req.body;

	const existingCouponCode = couponStore.getCoupon(code);
	if (existingCouponCode && existingCouponCode.isActive) {
		throw new AppError('Coupon code exists', 400);
	}

	const newCoupon = {
		code,
		nthOrder,
		discountPercent: 10,
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const saved = couponStore.createCoupon(newCoupon);
	res.status(201).json({
		message: 'Coupon created successfully',
		coupon: saved,
	});
};

export const listCoupons = (_req: Request, res: Response): void => {
	const coupons = couponStore.listCoupons();
	res.status(200).json({
		total: coupons.length,
		coupons,
	});
};
