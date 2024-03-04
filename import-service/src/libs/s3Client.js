import { S3Client } from '@aws-sdk/client-s3”;';

const REGION = process.env.REGION;

const s3Client = new S3Client({ region: REGION });
export { s3Client };
