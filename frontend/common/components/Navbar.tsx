'use client';

import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { useCart } from '~/contextProviders/useCart';

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
					{cart.length > 0 && <div className="absolute -top-1 -right-2 bg-green-500 h-4 w-4 text-white text-xs rounded-full">{cart.length}</div>}
				</Button>
			</nav>
		</header>
	);
}
