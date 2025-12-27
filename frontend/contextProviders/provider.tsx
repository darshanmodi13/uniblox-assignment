'use client';
import { ReactNode, useState, useEffect } from 'react';
import { Product } from '~/common/hooks/useProductsQuery';
import { CartContext, CartItem } from '~/contextProviders/context';

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) setCart(JSON.parse(storedCart));
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product: Product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.id === product.id);
			if (existing) {
				return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
			}
			return [...prev, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (id: string) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	const clearCart = () => setCart([]);

	const getTotal = () => cart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>{children}</CartContext.Provider>;
};
