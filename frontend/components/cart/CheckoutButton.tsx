'use client';

import { Button } from '~/components/ui/button';
import { useCreateOrderMutation } from '~/hooks/useCreateOrderMutation';
import { useState } from 'react';
import { useCart } from '~/contextProviders/useCart';
import { toast } from 'sonner';

interface CheckoutButtonProps {
	userId: string;
	couponCode: string | null;
	discountPercent?: number;
}

export default function CheckoutButton({ userId, couponCode }: CheckoutButtonProps) {
	const { cart, clearCart } = useCart();
	const [isProcessing, setIsProcessing] = useState(false);
	const { mutate } = useCreateOrderMutation();

	const handleCheckout = () => {
		if (cart.length === 0) {
			toast('Cart is empty');
			return;
		}

		setIsProcessing(true);

		const items = cart.map((item) => ({
			productId: item.id,
			name: item.name,
			price: item.sellingPrice,
			quantity: item.quantity,
		}));

		mutate(
			{ userId, items, couponCode },
			{
				onSuccess: (res) => {
					toast('Order placed successfully!');
					clearCart();
					setIsProcessing(false);
				},
				onError: (err: any) => {
					toast('Failed to place order');
					setIsProcessing(false);
				},
			}
		);
	};

	return (
		<Button onClick={handleCheckout} disabled={isProcessing} className="w-40 mt-2">
			{isProcessing ? 'Processing...' : 'Checkout'}
		</Button>
	);
}
