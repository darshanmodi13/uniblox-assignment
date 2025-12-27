import { useMutation } from '@tanstack/react-query';
import axiosClient from '~/common/lib/axiosClient';

interface CouponResponse {
	valid: boolean;
	discountPercent: number;
	message: string;
}

export const useCouponMutation = () => {
	return useMutation({
		mutationFn: async (couponCode: string): Promise<CouponResponse> => {
			const { data } = await axiosClient.post('/coupons/validate', { couponCode });
			return data;
		},
	});
};
