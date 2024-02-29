import AWS from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

const queryProductsTable = async (productId) => {
	try {
		const params = {
			TableName: process.env.PRODUCTS_TABLE,
			KeyConditionExpression: 'id = :id',
			ExpressionAttributeValues: {
				':id': productId,
			},
		};

		const queryResults = await client.query(params).promise();

		return queryResults.Items[0];
	} catch (err) {
		console.log(err);
	}
};

export async function getProductById(event) {
	const id = event.pathParameters.productId;
	const product = await queryProductsTable(id);

	if (!product) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				message: `No product with id ${id}, tableName: ${process.env.PRODUCTS_TABLE}`,
			}),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify(product),
	};
}
