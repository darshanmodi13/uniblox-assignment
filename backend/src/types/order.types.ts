export interface OrderItem {
	productId: string;
	name: string;
	price: number;
	quantity: number;
}

export interface Order {
	orderId: string;
	userId: string;
	items: OrderItem[];
	totalAmount: number;
	discountApplied: boolean;
	discountAmount: number;
	finalAmount: number;
	couponCode: string | null;
	createdAt: Date;
	updatedAt: Date;
}
