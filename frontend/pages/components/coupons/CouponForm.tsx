'use client';

import { useState } from 'react';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';
import { Label } from '~/common/components/ui/label';
import { useCouponMutation } from '~/common/hooks/useCouponMutation';
import { Card, CardContent, CardFooter } from '~/common/components/ui/card';
import { useGetUser } from '~/common/hooks/useGetUser';

interface CouponFormProps {
	onApplyDiscount: (discountPercent: number, code: string) => void;
	appliedCoupon?: { code: string; discountPercent: number };
}

export default function CouponForm({ onApplyDiscount, appliedCoupon }: CouponFormProps) {
	const [coupon, setCoupon] = useState('');
	const { mutate, isPending, data, error } = useCouponMutation();
	const user = useGetUser();

	const handleApply = () => {
		if (!coupon.trim()) return;
		mutate(
			{
				couponCode: coupon,
				userId: user,
			},
			{
				onSuccess: (res) => {
					if (res.valid) {
						onApplyDiscount(res.discountPercent, coupon);
					}
				},
			}
		);
	};

	return (
		<Card className="w-full max-w-md bg-white shadow-sm mt-6">
			<CardContent className="p-4 space-y-2">
				<Label htmlFor="coupon">Coupon Code</Label>
				<div className="flex gap-2">
					<Input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon code" />
					<Button onClick={handleApply} disabled={isPending}>
						{isPending ? 'Checking...' : 'Apply'}
					</Button>
				</div>

				{data?.message && <p className={`text-sm ${data.valid ? 'text-green-600' : 'text-red-500'}`}>{data.message}</p>}

				{error && <p className="text-sm text-red-500">{(error as any)?.response?.data?.message ?? 'Invalid coupon'}</p>}
			</CardContent>

			{appliedCoupon && (
				<CardFooter className="flex justify-between text-sm text-gray-600 border-t pt-2">
					<p>
						Applied Coupon: <span className="font-medium text-green-700">{appliedCoupon.code}</span>
					</p>
					<p>{appliedCoupon.discountPercent}% OFF</p>
				</CardFooter>
			)}
		</Card>
	);
}
