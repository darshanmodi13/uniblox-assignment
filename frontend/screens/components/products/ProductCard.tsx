'use client';

import { Card, CardHeader, CardContent, CardFooter } from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '~/contextProviders/useCart';
import { Product } from '~/common/hooks/useProductsQuery';

export default function ProductCard({ product }: { product: Product }) {
	const { addToCart } = useCart();

	return (
		<Card className="hover:shadow-lg transition-all flex flex-col">
			<CardHeader className="flex justify-center items-center">
				<img src={product.image} alt={product.name} className="object-contain" />
			</CardHeader>

			<CardContent className="flex-1 text-center">
				<h3 className="font-semibold line-clamp-2">{product.name}</h3>
				<div className="flex items-center justify-center gap-1 mt-2">
					<Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
					<span className="text-sm font-medium">{product.rating}</span>
				</div>
				<div className="mt-3 text-lg font-bold">
					${product.sellingPrice.toFixed(2)} <span className="text-sm text-green-600">Save ${product.price - product.sellingPrice}</span>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					onClick={() => {
						console.log('called');
						addToCart(product);
					}}
					className="w-full flex items-center justify-center gap-2">
					<ShoppingCart className="w-4 h-4" />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}
