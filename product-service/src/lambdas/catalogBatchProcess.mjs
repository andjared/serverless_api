import AWS from 'aws-sdk';

const sns = new AWS.SNS();

const snsTopicArn = process.env.SNS_TOPIC_ARN;

export const catalogBatchProcess = async (event, context) => {
	for (const message of event.Records) {
		await processMessageAsync(message);
	}
	console.info('done');
};

async function processMessageAsync(message) {
	try {
		console.log(`Processed message ${message.body}`);
		const newProduct = JSON.parse(message.body);
		console.log(newProduct);
		await sns
			.publish({
				TopicArn: snsTopicArn,
				Subject: 'New Product Created',
				Message: JSON.stringify(newProduct),
			})
			.promise();
	} catch (err) {
		console.error('An error occurred');
		throw err;
	}
}
