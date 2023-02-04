import * as AWS from 'aws-sdk';
import * as config from 'config';

const {
  accessKeyId,
  secretAccessKey,
} = config.get('aws.ses');

AWS.config.update({
  accessKeyId,
  secretAccessKey,
});

export const SES = new AWS.SES();
