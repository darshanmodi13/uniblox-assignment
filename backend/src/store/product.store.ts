import { Product } from '~/types/product.types';

class ProductStore {
	private products: Map<string, Product>;

	constructor() {
		this.products = new Map();

		for (let i = 1; i <= 20; i++) {
			const price = Math.floor(Math.random() * 100) + 20;
			const sellingPrice = price - 10;
			const product: Product = {
				id: `prod-${i}`,
				name: `Product ${i}`,
				description: `This is a detailed description for Product ${i}.`,
				image: `https://picsum.photos/seed/${i}/500/500`,
				price,
				sellingPrice,
				stock: Math.floor(Math.random() * 50) + 1,
				rating: Number((Math.random() * 5).toFixed(1)),
			};

			this.products.set(product.id, product);
		}
	}

	getAll(): Product[] {
		return Array.from(this.products.values());
	}

	getById(id: string): Product | undefined {
		return this.products.get(id);
	}

	updateStock(productId: string, quantity: number): void {
		const product = this.products.get(productId);
		if (product) {
			product.stock = Math.max(product.stock - quantity, 0);
			this.products.set(productId, product);
		}
	}
}

export const productStore = new ProductStore();
