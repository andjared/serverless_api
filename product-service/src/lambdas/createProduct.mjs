import AWS from 'aws-sdk';
import crypto from 'crypto';

const client = new AWS.DynamoDB.DocumentClient();

const putItem = async (item) => {
	try {
		const params = {
			TableName: process.env.PRODUCTS_TABLE,
			Item: item,
		};

		return client.put(params).promise();
	} catch (err) {
		console.log(err);
	}
};

export const createProduct = async (event) => {
	const requestBody = JSON.parse(event.body);

	try {
		const { title, description, price } = requestBody;

		const newProduct = {
			id: crypto.randomUUID(),
			title,
			description,
			price,
		};

		await putItem(newProduct);

		return {
			statusCode: 201,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ message: 'Successfuly created' }),
		};
	} catch (err) {
		console.log(err);
	}
};
