import { z } from 'zod';

export const createCouponSchema = z.object({
	body: z.object({
		code: z.string().min(3, 'Coupon code must be at least 3 characters long').toUpperCase(),
		nthOrder: z.number({ error: 'nthOrder must be a number' }).min(1, 'nthOrder must be greater than 0'),
	}),
});

export type CreateCouponInput = z.infer<typeof createCouponSchema>['body'];
