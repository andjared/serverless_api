import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3client } from '../libs/s3Client.js';

const bucket = process.env.BUCKET_NAME;

export const importProductsFile = async (event) => {
	try {
		const { name } = event.queryStringParameters;

		if (!name) {
			throw new Error('File name must be provided');
		}

		const key = `uploaded/${name}`;
		const command = new PutObjectCommand({ Bucket: bucket, Key: key });

		const signedUrl = await getSignedUrl(s3client, command, {
			expiresIn: 3600,
		});

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify({ signedUrl }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify({ message: error.message }),
		};
	}
};
