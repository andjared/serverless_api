import { SQSClient } from '@aws-sdk/client-sqs';

const REGION = process.env.REGION;

export const client = new SQSClient({ region: REGION });
