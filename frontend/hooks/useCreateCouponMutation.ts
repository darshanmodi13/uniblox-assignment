import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '~/common/lib/axiosClient';

interface CreateCouponInput {
	code: string;
	nthOrder: number;
}

export const useCreateCouponMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateCouponInput) => {
			const res = await axiosClient.post('/coupons/create', data);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin', 'coupons'] });
		},
	});
};
