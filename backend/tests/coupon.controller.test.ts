import request from 'supertest';
import app from '~/app';
import { couponStore } from '~/store/coupon.store';

describe('Coupon API', () => {
	beforeEach(() => {
		(couponStore as any).coupons.clear();
	});

	it('should create a new coupon successfully', async () => {
		const payload = {
			code: 'SAVE10',
			nthOrder: 5,
		};

		const res = await request(app).post('/api/coupons/create').send(payload).expect(201);

		expect(res.body).toHaveProperty('message', 'Coupon created successfully');
		expect(res.body.coupon).toHaveProperty('code', 'SAVE10');
		expect(res.body.coupon).toHaveProperty('nthOrder', 5);
		expect(res.body.coupon).toHaveProperty('discountPercent', 10);
		expect(res.body.coupon.isActive).toBe(true);

		const coupons = couponStore.listCoupons();
		expect(coupons).toHaveLength(1);
		expect(coupons[0].code).toBe('SAVE10');
	});

	it('should not allow duplicate coupon codes', async () => {
		const payload = {
			code: 'SAVE100',
			nthOrder: 3,
		};

		await request(app).post('/api/coupons/create').send(payload).expect(201);

		const res = await request(app).post('/api/coupons/create').send(payload).expect(400);

		expect(res.body.status).toBe('error');
		expect(res.body.message).toBe('Coupon code already exists');
	});

	it('should return 400 when required fields are missing', async () => {
		const res = await request(app).post('/api/coupons/create').send({ nthOrder: 5 }).expect(400);

		expect(res.body).toHaveProperty('status', 'error');
	});

	it('should list all coupons', async () => {
		await request(app).post('/api/coupons/create').send({ code: 'SAVE10', nthOrder: 2 });

		await request(app).post('/api/coupons/create').send({ code: 'DISCOUNT15', nthOrder: 3 });

		const res = await request(app).get('/api/coupons/list').expect(200);

		expect(res.body).toHaveProperty('total', 2);
		expect(Array.isArray(res.body.coupons)).toBe(true);
		expect(res.body.coupons[0]).toHaveProperty('code');
		expect(res.body.coupons[0]).toHaveProperty('nthOrder');
		expect(res.body.coupons[0]).toHaveProperty('discountPercent');
	});
});
