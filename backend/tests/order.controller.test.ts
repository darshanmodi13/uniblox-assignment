import request from 'supertest';
import app from '~/app';
import { couponStore } from '~/store/coupon.store';
import { orderStore } from '~/store/order.store';
import { productStore } from '~/store/product.store';

describe('Order API', () => {
	beforeEach(() => {
		(orderStore as any).orders.clear();
		(couponStore as any).coupons.clear();
	});

	it('should create an order without a coupon', async () => {
		const res = await request(app)
			.post('/api/orders/create')
			.send({
				userId: 'user-1',
				items: [{ productId: 'prod-1', name: 'Product 1', price: 100, quantity: 2 }],
			})
			.expect(201);

		expect(res.body.message).toBe('Order created successfully');
		expect(res.body.order.totalAmount).toBe(200);
		expect(res.body.order.discountApplied).toBe(false);
		expect(res.body.order.couponCode).toBeNull();
	});

	it('should create an order with a valid coupon', async () => {
		couponStore.createCoupon({
			code: 'SAVE10',
			nthOrder: 1,
			discountPercent: 10,
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const res = await request(app)
			.post('/api/orders/create')
			.send({
				userId: 'user-2',
				couponCode: 'SAVE10',
				items: [{ productId: 'prod-1', name: 'Product 1', price: 100, quantity: 1 }],
			})
			.expect(201);

		expect(res.body.order.discountApplied).toBe(true);
		expect(res.body.order.discountAmount).toBe(10);
		expect(res.body.order.finalAmount).toBe(90);
		expect(res.body.order.couponCode).toBe('SAVE10');
	});

	it('should return error for invalid coupon', async () => {
		const res = await request(app)
			.post('/api/orders/create')
			.send({
				userId: 'user-3',
				couponCode: 'INVALID',
				items: [{ productId: 'prod-1', name: 'Product 1', price: 50, quantity: 1 }],
			})
			.expect(400);

		expect(res.body.message).toBe('Invalid coupon code');
	});

	it('should list all orders for admin', async () => {
		await request(app)
			.post('/api/orders/create')
			.send({
				userId: 'user-1',
				items: [{ productId: 'prod-1', name: 'Product 1', price: 100, quantity: 1 }],
			});

		await request(app)
			.post('/api/orders/create')
			.send({
				userId: 'user-2',
				items: [{ productId: 'prod-2', name: 'Product 2', price: 200, quantity: 1 }],
			});

		const res = await request(app).get('/api/orders/list').expect(200);

		expect(res.body.totalOrders).toBe(2);
		expect(Array.isArray(res.body.orders)).toBe(true);
	});

	it('should return error when ordering non-existing product', async () => {
		const res = await request(app)
			.post('/api/orders/create')
			.send({
				userId: 'user-x',
				items: [{ productId: 'invalid', name: 'Fake', price: 100, quantity: 1 }],
			})
			.expect(404);

		expect(res.body.message).toMatch(/not found/);
	});

	it('should return error when ordering more than stock', async () => {
		const product = productStore.getAll()[0];
		const res = await request(app)
			.post('/api/orders/create')
			.send({
				userId: 'user-y',
				items: [{ productId: product.id, name: product.name, price: product.price, quantity: product.stock + 1 }],
			})
			.expect(400);

		expect(res.body.message).toMatch(/Insufficient stock/);
	});
});
