'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useCart } from '~/contextProviders/useCart';

export default function Navbar() {
	const { cart } = useCart();

	return (
		<nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
			<div className="container mx-auto flex justify-between items-center py-3 px-6">
				<Link href="/" className="text-2xl font-bold text-gray-900">
					Uniblox
				</Link>
				<div className="flex items-center gap-4">
					<Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
						Admin Dashboard
					</Link>
					<Link href="/cart">
						<Button variant="outline" className="relative flex items-center gap-2">
							<ShoppingCart size={18} />
							<span>Cart</span>
							{cart.length > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>}
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
