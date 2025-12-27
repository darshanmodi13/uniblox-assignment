'use client';

import Navbar from '~/common/components/Navbar';
import { Button } from '~/components/ui/button';
import { useCart } from '~/contextProviders/useCart';

export default function CartPage() {
	const { cart, removeFromCart, clearCart } = useCart();

	const subtotal = cart.reduce((sum, item) => sum + item.sellingPrice, 0);

	return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			<div className="container mx-auto px-6 py-8">
				<h2 className="text-2xl font-bold mb-4">Your Cart</h2>

				{cart.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<>
						<ul className="space-y-4">
							{cart.map((item) => (
								<li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
									<div>
										<p className="font-semibold">{item.name}</p>
										<p className="text-gray-500 text-sm">${item.sellingPrice.toFixed(2)}</p>
									</div>
									<Button variant="destructive" onClick={() => removeFromCart(item.id)}>
										Remove
									</Button>
								</li>
							))}
						</ul>

						<div className="mt-6 flex flex-col items-end gap-3">
							<p className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
							<Button className="w-40">Checkout</Button>
							<Button variant="outline" onClick={clearCart} className="w-40">
								Clear Cart
							</Button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
