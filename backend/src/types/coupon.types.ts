export interface Coupon {
	code: string;
	nthOrder: number;
	discountPercent: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
