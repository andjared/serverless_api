import AWS from 'aws-sdk';
import { stocks } from './data.mjs';

const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const insertData = async (tableName, data) => {
	const params = {
		TableName: tableName,
		Item: data,
	};

	try {
		await docClient.put(params).promise();
		console.log(`Successfully inserted data into ${tableName}`);
	} catch (err) {
		console.error(`Unable to insert data into ${tableName}. Error JSON:`, err);
	}
};

products.forEach((product) => insertData('products', product));
stocks.forEach((stock) => insertData('stocks', stock));
