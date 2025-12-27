'use client';

import { useCouponsQuery } from '~/common/hooks/useAdminDataQueries';
import { Card, CardHeader, CardTitle, CardContent } from '~/common/components/ui/card';

export default function CouponList() {
	const { data, isLoading } = useCouponsQuery();

	if (isLoading) return <p>Loading coupons...</p>;

	return (
		<Card className="bg-white shadow-sm">
			<CardHeader>
				<CardTitle>Available Coupons</CardTitle>
			</CardHeader>
			<CardContent>
				{data?.length ? (
					<ul className="space-y-2">
						{data.map((coupon) => (
							<li key={coupon.code} className="flex justify-between items-center border p-3 rounded-md">
								<span className="font-semibold">{coupon.code}</span>
								<span>
									{coupon.discountPercent}% off every {coupon.nthOrder}th order
								</span>
							</li>
						))}
					</ul>
				) : (
					<p>No coupons available.</p>
				)}
			</CardContent>
		</Card>
	);
}
