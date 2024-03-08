import { SQSClient } from '@aws-sdk/client-sqs';

const REGION = process.env.REGION;

export const sqsClient = new SQSClient({ region: REGION });
