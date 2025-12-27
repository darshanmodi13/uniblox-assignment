import { Request, Response } from 'express';
import { couponStore } from '~/store/coupon.store';
import { CreateCouponInput } from '~/schemas/coupon.schema';
import { AppError } from '~/utils/AppError';
import { orderStore } from '~/store/order.store';

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

export const listCoupons = (_req: Request, res: Response) => {
	const coupons = couponStore.listCoupons();
	res.status(200).json({
		total: coupons.length,
		coupons,
	});
};

export const validateCoupon = (req: Request, res: Response): void => {
	const { userId, couponCode } = req.body;

	if (!couponCode || couponCode.trim().length === 0) {
		throw new AppError('Coupon code is required', 400);
	}

	if (!userId) {
		throw new AppError('User ID is required', 400);
	}

	const coupon = couponStore.getCoupon(couponCode);

	if (!coupon) {
		throw new AppError('Invalid coupon code', 400);
	}

	if (!coupon.isActive) {
		throw new AppError('Coupon is not active', 400);
	}

	const userOrderCount = orderStore.getUserToOrderCount(userId) ?? 0;

	const isEligible = (userOrderCount + 1) % coupon.nthOrder === 0;

	if (!isEligible) {
		res.status(200).json({
			valid: false,
			discountPercent: 0,
			message: `Coupon '${couponCode}' can be used on every ${coupon.nthOrder}th order.`,
		});
		return;
	}

	res.status(200).json({
		valid: true,
		discountPercent: coupon.discountPercent,
		message: `Coupon '${couponCode}' applied successfully! You get ${coupon.discountPercent}% off.`,
	});
};
