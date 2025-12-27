import { useQuery } from '@tanstack/react-query';
import axiosClient from '~/common/lib/axiosClient';

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	sellingPrice: number;
	stock: number;
	rating: number;
	image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
	const response = await axiosClient.get('/products');
	return response.data.products;
};

export const useProductsQuery = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: fetchProducts,
	});
};
