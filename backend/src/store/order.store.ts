import { Order } from '~/types/order.types';

class OrderStore {
	private orders: Map<string, Order>;
	private userOrderCount: Map<string, number>;

	constructor() {
		this.orders = new Map();
		this.userOrderCount = new Map();
	}

	createOrder(order: Order): Order {
		this.orders.set(order.orderId, order);
		this.userOrderCount.set(order.userId, 1 + (this.userOrderCount.get(order.userId) ?? 0));
		return order;
	}

	listOrders(): Order[] {
		return Array.from(this.orders.values());
	}

	getOrder(orderId: string): Order | undefined {
		return this.orders.get(orderId);
	}

	getUserToOrderCount(userId: string): number | undefined {
		return this.userOrderCount.get(userId);
	}

	clear(): void {
		this.orders.clear();
	}
}

export const orderStore = new OrderStore();
