'use client';

import { useOrdersQuery, useCouponsQuery } from '~/common/hooks/useAdminDataQueries';
import { Card } from '~/common/components/ui/card';

export default function AdminStats() {
	const { data: orders } = useOrdersQuery();
	const { data: coupons } = useCouponsQuery();

	const totalOrders = orders?.length ?? 0;
	const totalPurchase = orders?.reduce((sum, o) => sum + o.totalAmount, 0) ?? 0;
	const totalDiscount = orders?.reduce((sum, o) => sum + o.discountAmount, 0) ?? 0;
	const activeCoupons = coupons?.length ?? 0;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<Card className="p-4">
				<h3 className="text-sm text-gray-500">Total Orders</h3>
				<p className="text-xl font-bold">{totalOrders}</p>
			</Card>
			<Card className="p-4">
				<h3 className="text-sm text-gray-500">Total Purchase</h3>
				<p className="text-xl font-bold">${totalPurchase.toFixed(2)}</p>
			</Card>
			<Card className="p-4">
				<h3 className="text-sm text-gray-500">Total Discounts</h3>
				<p className="text-xl font-bold text-green-600">-${totalDiscount.toFixed(2)}</p>
			</Card>
			<Card className="p-4">
				<h3 className="text-sm text-gray-500">Active Coupons</h3>
				<p className="text-xl font-bold">{activeCoupons}</p>
			</Card>
		</div>
	);
}
