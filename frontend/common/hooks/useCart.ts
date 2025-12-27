'use client';

import { useEffect, useState } from 'react';
import { Product } from '~/common/hooks/useProductsQuery';

export function useCart() {
	const [cart, setCart] = useState<Product[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem('cart');
		if (stored) setCart(JSON.parse(stored));
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product: Product) => {
		setCart((prev) => {
			const exists = prev.find((p) => p.id === product.id);
			if (exists) return prev;
			return [...prev, product];
		});
	};

	const removeFromCart = (id: string) => setCart((prev) => prev.filter((p) => p.id !== id));

	return { cart, addToCart, removeFromCart };
}
