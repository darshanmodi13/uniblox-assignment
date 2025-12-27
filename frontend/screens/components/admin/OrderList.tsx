'use client';

import { useOrdersQuery } from '~/common/hooks/useAdminDataQueries';
import { Card, CardHeader, CardTitle, CardContent } from '~/common/components/ui/card';

export default function OrderList() {
	const { data: orders, isLoading } = useOrdersQuery();

	if (isLoading) return <p>Loading orders...</p>;

	if (!orders?.length) {
		return (
			<Card className="bg-white shadow-sm">
				<CardHeader>
					<CardTitle>All Orders</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-gray-500 text-sm">No orders found.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="bg-white shadow-sm">
			<CardHeader>
				<CardTitle>All Orders</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{orders.map((order) => (
					<div key={order.orderId} className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors">
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b pb-2">
							<div>
								<p className="text-sm text-gray-500">
									Order ID: <span className="font-medium text-gray-800">{order.orderId}</span>
								</p>
								<p className="text-sm text-gray-500">
									User ID: <span className="font-medium text-gray-800">{order.userId}</span>
								</p>
								<p className="text-sm text-gray-500">
									Coupon Code: <span className={`font-medium ${order.couponCode ? 'text-green-600' : 'text-gray-500'}`}>{order.couponCode ?? '—'}</span>
								</p>
							</div>
							<p className="text-xs text-gray-400 mt-2 sm:mt-0">{new Date(order.createdAt).toLocaleString()}</p>
						</div>

						{/* ✅ Product table */}
						<div className="overflow-x-auto">
							<table className="w-full text-sm border-collapse border border-gray-200">
								<thead className="bg-gray-200">
									<tr className="text-left text-gray-700">
										<th className="p-2 border border-gray-200">Product ID</th>
										<th className="p-2 border border-gray-200">Name</th>
										<th className="p-2 border border-gray-200 text-center">Price ($)</th>
										<th className="p-2 border border-gray-200 text-center">Quantity</th>
										<th className="p-2 border border-gray-200 text-right">Subtotal ($)</th>
									</tr>
								</thead>
								<tbody>
									{order.items.map((item) => (
										<tr key={item.productId} className="hover:bg-gray-100 transition">
											<td className="p-2 border border-gray-200">{item.productId}</td>
											<td className="p-2 border border-gray-200">{item.name}</td>
											<td className="p-2 border border-gray-200 text-center">{item.price.toFixed(2)}</td>
											<td className="p-2 border border-gray-200 text-center">{item.quantity}</td>
											<td className="p-2 border border-gray-200 text-right">{(item.price * item.quantity).toFixed(2)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
							<div className="text-sm text-gray-600 space-y-1">
								<p>
									Total Amount: <span className="font-semibold">${order.totalAmount.toFixed(2)}</span>
								</p>
								{order.discountApplied ? <p className="text-green-600">Discount Applied: -${order.discountAmount.toFixed(2)}</p> : <p className="text-gray-500">No Discount Applied</p>}
							</div>
							<div className="mt-2 sm:mt-0 text-right">
								<p className="text-sm font-bold text-gray-900">Final Amount: ${order.finalAmount.toFixed(2)}</p>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
