'use client';

import { Button } from '~/common/components/ui/button';
import { useState } from 'react';
import { useCart } from '~/contextProviders/useCart';
import Navbar from '~/common/components/Navbar';
import CouponForm from '~/pages/components/coupons/CouponForm';
import CheckoutButton from '~/pages/components/cart/CheckoutButton';
import { useGetUser } from '~/common/hooks/useGetUser';

export default function CartPage() {
	const { cart, removeFromCart, clearCart, getTotal } = useCart();
	const [discountPercent, setDiscountPercent] = useState(0);
	const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

	const userId = useGetUser();
	const subtotal = getTotal();
	const discountAmount = (subtotal * discountPercent) / 100;
	const finalAmount = subtotal - discountAmount;

	const handleApplyDiscount = (discountPercent: number, code: string) => {
		setDiscountPercent(discountPercent);
		setAppliedCoupon({ code, discountPercent });
	};

	if (cart.length === 0)
		return (
			<main className="min-h-screen bg-gray-50">
				<Navbar />
				<div className="text-center mt-20 text-lg">🛒 Your cart is empty.</div>
			</main>
		);

	return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			<div className="container mx-auto px-6 py-8 max-w-4xl">
				<h2 className="text-2xl font-bold mb-4">Your Cart</h2>

				<ul className="space-y-4">
					{cart.map((item) => (
						<li key={item.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
							<div>
								<p className="font-semibold">{item.name}</p>
								<p className="text-gray-500 text-sm">
									${item.sellingPrice.toFixed(2)} × {item.quantity}
								</p>
							</div>
							<Button variant="destructive" onClick={() => removeFromCart(item.id)}>
								Remove
							</Button>
						</li>
					))}
				</ul>

				<CouponForm onApplyDiscount={handleApplyDiscount} appliedCoupon={appliedCoupon ?? undefined} />

				<div className="mt-6 flex flex-col items-end gap-3 border-t pt-4">
					<p className="text-sm text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
					{discountPercent > 0 && (
						<p className="text-green-600 text-sm">
							Discount ({discountPercent}%): -${discountAmount.toFixed(2)}
						</p>
					)}
					<p className="text-lg font-semibold">Total: ${finalAmount.toFixed(2)}</p>

					<CheckoutButton userId={userId} couponCode={appliedCoupon?.code ?? null} />

					<Button variant="outline" onClick={clearCart} className="w-40">
						Clear Cart
					</Button>
				</div>
			</div>
		</main>
	);
}
