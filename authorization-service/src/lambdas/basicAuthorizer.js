export const basicAuthorizer = (event) => {
	const { headers } = event;
	console.log(event, 'event');
	console.log(process.env.ANDJARED, 'password');
	console.log(headers.Authorization, 'header auth');
};
