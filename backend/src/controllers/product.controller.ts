import { Request, Response } from 'express';
import { Product } from '~/types/product.types';

const products: Product[] = Array.from({ length: 20 }, (_, i) => {
	const price = Math.floor(Math.random() * 100) + 20;
	const sellingPrice = price - 10;
	return {
		id: `prod-${i + 1}`,
		name: `Product ${i + 1}`,
		description: `This is a detailed description for Product ${i + 1}.`,
		image: `https://picsum.photos/seed/${i + 1}/500/500`,
		price,
		sellingPrice,
		stock: Math.floor(Math.random() * 50) + 1,
		rating: Number((Math.random() * 5).toFixed(1)),
	};
});

export const getProducts = (_: Request, res: Response) => {
	return res.json({
		products,
	});
};
