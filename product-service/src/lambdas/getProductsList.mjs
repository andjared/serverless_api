import AWS from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

const scanProductsTable = async () => {
	try {
		const scanResults = await client
			.scan({
				TableName: process.env.PRODUCTS_TABLE,
			})
			.promise();

		return scanResults.Items;
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Error scanning db' }),
		};
	}
};

const scanStocksTable = async () => {
	const scanResults = await client
		.scan({
			TableName: process.env.STOCKS_TABLE,
		})
		.promise();

	return scanResults.Items;
};

export async function getProductsList() {
	const products = await scanProductsTable();
	const stocks = await scanStocksTable();

	const joined = products.map((product) => {
		const stockInfo = stocks.find((stock) => stock.product_id === product.id);

		return { ...product, count: stockInfo.count || 0 };
	});

	return {
		statusCode: 200,
		body: JSON.stringify(joined),
	};
}
