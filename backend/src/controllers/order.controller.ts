import { Request, Response } from 'express';
import { CreateOrderInput } from '~/schemas/order.schema';
import { orderStore } from '~/store/order.store';
import { couponStore } from '~/store/coupon.store';
import { AppError } from '~/utils/AppError';
import { productStore } from '~/store/product.store';

export const createOrder = (req: Request<{}, {}, CreateOrderInput>, res: Response): void => {
	const { userId, items, couponCode } = req.body;

	for (const item of items) {
		const product = productStore.getById(item.productId);

		if (!product) {
			throw new AppError(`Product with ID ${item.productId} not found`, 404);
		}

		if (product.stock < item.quantity) {
			throw new AppError(`Insufficient stock for product: ${product.name}. Available: ${product.stock}`, 400);
		}
	}

	const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	let discountApplied = false;
	let discountAmount = 0;
	let finalAmount = totalAmount;

	if (couponCode && couponCode.trim().length > 0) {
		const coupon = couponStore.getCoupon(couponCode);

		if (!coupon) {
			throw new AppError('Invalid coupon code', 400);
		}

		if (!coupon.isActive) {
			throw new AppError('Coupon is not active', 400);
		}

		let userToOrderCount = (orderStore.getUserToOrderCount(userId) ?? 0) + 1;
		if (userToOrderCount % coupon.nthOrder !== 0) {
			throw new AppError('Invalid coupon code', 400);
		}

		discountApplied = true;
		discountAmount = (totalAmount * coupon.discountPercent) / 100;
		finalAmount = totalAmount - discountAmount;
	}

	const orderId = `order-${Date.now()}`;
	const newOrder = {
		orderId,
		userId,
		items,
		totalAmount,
		discountApplied,
		discountAmount,
		finalAmount,
		couponCode: couponCode ?? null,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	orderStore.createOrder(newOrder);

	items.forEach((i) => productStore.updateStock(i.productId, i.quantity));

	res.status(201).json({
		message: 'Order created successfully',
		order: newOrder,
	});
};

export const listAllOrders = (_req: Request, res: Response): void => {
	const orders = orderStore.listOrders();
	res.status(200).json({
		totalOrders: orders.length,
		orders,
	});
};
