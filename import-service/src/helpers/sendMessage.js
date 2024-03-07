import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '../libs/sqsClient.js';

export const sendMessageToQueue = async (data) => {
	console.log('executing send to queue');
	try {
		const command = new SendMessageCommand({
			QueueUrl: process.env.QUEUE_URL,
			DelaySeconds: 0,
			MessageBody: JSON.stringify(data),
		});
		console.log(command, 'command');

		await sqsClient.send(command);
		console.log('result sent', result);
	} catch (err) {
		console.log(err);
	}
};
