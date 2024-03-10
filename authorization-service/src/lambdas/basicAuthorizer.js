import { generateResponse } from '../helpers/generateResponse.js';
export const basicAuthorizer = async (event) => {
	try {
		const { headers } = event;

		const encoded = headers.Authorization.split(' ')[1];
		const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
		const [username, password] = decoded.split(':');

		const effect =
			!process.env[username] || process.env[username] !== password
				? 'Deny'
				: 'Allow';

		return generateResponse(username, effect, event.routeArn);
	} catch (error) {
		console.log(error);
	}
};
