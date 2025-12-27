import { useMutation } from '@tanstack/react-query';
import axiosClient from '~/common/lib/axiosClient';

interface CouponResponse {
	valid: boolean;
	discountPercent: number;
	message: string;
}

export const useCouponMutation = () => {
	return useMutation({
		mutationFn: async (body: { couponCode: string; userId: string }): Promise<CouponResponse> => {
			const { data } = await axiosClient.post('/coupons/validate', { ...body });
			return data;
		},
	});
};
