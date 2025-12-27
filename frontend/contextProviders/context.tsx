'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '~/common/hooks/useProductsQuery';

export interface CartItem extends Product {
	quantity: number;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	removeFromCart: (id: string) => void;
	clearCart: () => void;
	getTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
