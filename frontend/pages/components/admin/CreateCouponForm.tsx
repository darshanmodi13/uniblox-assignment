'use client';

import { useState } from 'react';
import { useCreateCouponMutation } from '~/common/hooks/useCreateCouponMutation';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';
import { Label } from '~/common/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '~/common/components/ui/card';
import { toast } from 'sonner';

export default function CreateCouponForm() {
	const { mutate, isPending } = useCreateCouponMutation();
	const [code, setCode] = useState('');
	const [nthOrder, setNthOrder] = useState(3);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(
			{ code, nthOrder },
			{
				onSuccess: () => {
					toast('Coupon created successfully!');
					setCode('');
				},
				onError: (err: any) => {
					toast('Failed to create coupon');
				},
			}
		);
	};

	return (
		<Card className="w-full max-w-md bg-white shadow-sm">
			<CardHeader>
				<CardTitle>Create New Coupon</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<Label htmlFor="code">Coupon Code</Label>
						<Input id="code" placeholder="SAVE10" value={code} onChange={(e) => setCode(e.target.value)} required />
					</div>

					<div>
						<Label htmlFor="nthOrder">Applicable every nth order</Label>
						<Input id="nthOrder" type="number" value={nthOrder} onChange={(e) => setNthOrder(Number(e.target.value))} min={1} required />
					</div>

					<Button type="submit" disabled={isPending} className="w-full">
						{isPending ? 'Creating...' : 'Create Coupon'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
