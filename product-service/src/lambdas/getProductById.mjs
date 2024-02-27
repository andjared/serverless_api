import { products } from '../data.mjs';

export async function getProductById(event) {
	const id = event.pathParameters.productId;
	const product = products.find((product) => product.id === id);

	if (!product) {
		return {
			statusCode: 404,
			body: JSON.stringify({ message: `No product with id ${id}` }),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify(product),
	};
}
