'use client';

import Navbar from '~/common/components/Navbar';
import ProductCard from '~/pages/components/products/ProductCard';
import { useProductsQuery } from '~/common/hooks/useProductsQuery';

export default function ProductPage() {
	const { data, isLoading } = useProductsQuery();

	if (isLoading) return <p className="text-center mt-10">Loading...</p>;

	return (
		<main className="bg-gray-50 min-h-screen">
			<Navbar />
			<div className="flex justify-center">
				<div className="container grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{data?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</main>
	);
}
