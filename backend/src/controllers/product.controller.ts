import { Request, Response } from 'express';
import { productStore } from '~/store/product.store';

export const getProducts = (_req: Request, res: Response) => {
	const products = productStore.getAll();

	return res.json({
		total: products.length,
		products,
	});
};
