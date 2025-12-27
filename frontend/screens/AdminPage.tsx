'use client';

import Navbar from '~/common/components/Navbar';
import AdminStats from '~/screens/components/admin/AdminStats';
import CouponList from '~/screens/components/admin/CouponList';
import CreateCouponForm from '~/screens/components/admin/CreateCouponForm';
import OrderList from '~/screens/components/admin/OrderList';

export default function AdminPage() {
	return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			<div className="container mx-auto p-6 space-y-6">
				<h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
				<AdminStats />
				<div className="grid md:grid-cols-2 gap-6">
					<CreateCouponForm />
					<CouponList />
				</div>
				<OrderList />
			</div>
		</main>
	);
}
