export const basicAuthorizer = (event) => {
	const { headers } = event;
	const credentials = headers.Authorization.split(' ')[1];
	const decoded = Buffer.from(credentials, 'base64').toString();
	console.log(credentials, 'credentials');
	console.log(decoded, 'decoded');

	const [username, password] = decoded.toString('utf-8').split(':');

	console.log(` username: "${username}" password: "${password}"`);
	console.log(process.env[username], 'password');
	console.log(headers.Authorization, 'header auth');
};
