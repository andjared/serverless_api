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
	} catch (error) {
		throw error;
	}
};

const scanStocksTable = async () => {
	try {
		const scanResults = await client
			.scan({
				TableName: process.env.STOCKS_TABLE,
			})
			.promise();

		return scanResults.Items;
	} catch (error) {
		throw error;
	}
};

export const getProductsList = async () => {
	try {
		const products = await scanProductsTable();
		const stocks = await scanStocksTable();

		const joined = products.map((product) => {
			const stockInfo = stocks.find((stock) => stock.product_id === product.id);

			return { ...product, count: stockInfo?.count || 0 };
		});

		return {
			statusCode: 200,
			body: JSON.stringify(joined),
		};
	} catch (err) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				message: `${err.message}`,
			}),
		};
	}
};
