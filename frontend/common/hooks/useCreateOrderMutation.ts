import { useMutation } from '@tanstack/react-query';
import axiosClient from '~/common/lib/axiosClient';

interface OrderItem {
	productId: string;
	name: string;
	price: number;
	quantity: number;
}

interface CreateOrderInput {
	userId: string;
	items: OrderItem[];
	couponCode: string | null;
}

interface CreateOrderResponse {
	message: string;
	order: {
		orderId: string;
		userId: string;
		totalAmount: number;
		discountApplied: boolean;
		discountAmount: number;
		finalAmount: number;
		createdAt: string;
	};
}

export const useCreateOrderMutation = () => {
	return useMutation({
		mutationFn: async (data: CreateOrderInput): Promise<CreateOrderResponse> => {
			const response = await axiosClient.post('/orders/create', data);
			return response.data;
		},
	});
};
