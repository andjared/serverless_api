import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '../libs/sqsClient.js';

export const sendMessageToQueue = async (data) => {
	try {
		const command = new SendMessageCommand({
			QueueUrl:
				'https://sqs.eu-west-1.amazonaws.com/730335492388/catalogItemsQueue',
			DelaySeconds: 0,
			MessageBody: JSON.stringify(data),
		});
		console.log(command, 'command');

		const result = await sqsClient.send(command);
		console.log('result sent', result);
	} catch (err) {
		console.log(err);
	}
};
