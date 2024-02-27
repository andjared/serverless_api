import { products } from '../data.mjs';

export async function getProductsList() {
	console.log('products', products);
	return {
		statusCode: 200,
		body: JSON.stringify(products),
	};
}
