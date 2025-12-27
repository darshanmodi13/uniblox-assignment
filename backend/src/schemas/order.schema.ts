import { z } from 'zod';

export const createOrderSchema = z.object({
	body: z.object({
		userId: z.string().min(1, 'User ID is required'),
		items: z
			.array(
				z.object({
					productId: z.string(),
					name: z.string(),
					price: z.number().min(0),
					quantity: z.number().min(1),
				})
			)
			.min(1, 'At least one item is required'),
		couponCode: z.string().min(3, 'Coupon code must be at least 3 characters').optional(),
	}),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
