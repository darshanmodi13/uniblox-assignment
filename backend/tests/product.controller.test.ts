import request from 'supertest';
import app from '../src/app';

describe('GET /products', () => {
	it('should return 20 products with correct fields', async () => {
		const res = await request(app).get('/products');
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('products');
		expect(Array.isArray(res.body.products)).toBe(true);
		expect(res.body.products).toHaveLength(20);

		const product = res.body.products[0];
		expect(product).toHaveProperty('id');
		expect(product).toHaveProperty('name');
		expect(product).toHaveProperty('description');
		expect(product).toHaveProperty('image');
		expect(product).toHaveProperty('price');
		expect(product).toHaveProperty('sellingPrice');
		expect(product).toHaveProperty('stock');
		expect(product).toHaveProperty('rating');

		expect(typeof product.id).toBe('string');
		expect(typeof product.name).toBe('string');
		expect(typeof product.price).toBe('number');
		expect(typeof product.sellingPrice).toBe('number');
		expect(typeof product.stock).toBe('number');
		expect(typeof product.rating).toBe('number');
	});

	it('should ensure selling price is always less than price', async () => {
		const res = await request(app).get('/products');
		const allValid = res.body.products.every((p: any) => p.sellingPrice < p.price);
		expect(allValid).toBe(true);
	});
});
