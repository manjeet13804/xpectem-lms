import * as AWS from 'aws-sdk';
import * as config from 'config';

const {
  accessKeyId,
  secretAccessKey,
} = config.get('aws');

export const SNS = new AWS.SNS({ accessKeyId, secretAccessKey });
