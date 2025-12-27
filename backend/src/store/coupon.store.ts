import { Coupon } from '~/types/coupon.types';

class CouponStore {
	private coupons: Map<string, Coupon>;

	constructor() {
		this.coupons = new Map();
	}

	createCoupon(coupon: Coupon): Coupon {
		if (this.coupons.has(coupon.code)) {
			throw new Error('Coupon code already exists');
		}
		this.coupons.set(coupon.code, coupon);
		return coupon;
	}

	listCoupons(): Coupon[] {
		return Array.from(this.coupons.values());
	}

	getCoupon(code: string): Coupon | undefined {
		return this.coupons.get(code);
	}

	updateCoupon(code: string, updates: Partial<Coupon>): Coupon | undefined {
		const existing = this.coupons.get(code);
		if (!existing) return undefined;
		const updated = { ...existing, ...updates, updatedAt: new Date() };
		this.coupons.set(code, updated);
		return updated;
	}
}

export const couponStore = new CouponStore();
