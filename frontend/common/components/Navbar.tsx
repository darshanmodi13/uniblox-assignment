'use client';

import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { useCart } from '~/common/hooks/useCart';

export default function Navbar() {
	const router = useRouter();
	const { cart } = useCart();

	return (
		<header className="border-b bg-background flex justify-center">
			<nav className="container mx-auto flex h-16 items-center justify-between px-4">
				<h1 onClick={() => router.push('/')} className="text-xl font-semibold cursor-pointer">
					Uniblox Store
				</h1>

				<Button variant="ghost" onClick={() => router.push('/cart')} className="relative">
					<ShoppingCart className="w-5 h-5" />
					{cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{cart.length}</span>}
				</Button>
			</nav>
		</header>
	);
}
