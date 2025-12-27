import { useQuery } from '@tanstack/react-query';
import axiosClient from '~/common/lib/axiosClient';

export interface Coupon {
	code: string;
	discountPercent: number;
	nthOrder: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface Order {
	orderId: string;
	userId: string;
	totalAmount: number;
	discountApplied: boolean;
	discountAmount: number;
	finalAmount: number;
	createdAt: string;
	couponCode: string | null;
	items: {
		productId: string;
		quantity: number;
		price: number;
		name: string;
	}[];
}

export const useCouponsQuery = () => {
	return useQuery({
		queryKey: ['listCoupons'],
		queryFn: async (): Promise<Coupon[]> => {
			const res = await axiosClient.get('/coupons/list');
			return res.data.coupons;
		},
	});
};

export const useOrdersQuery = () => {
	return useQuery({
		queryKey: ['listOrders'],
		queryFn: async (): Promise<Order[]> => {
			const res = await axiosClient.get('/orders/list');
			return res.data.orders;
		},
	});
};
