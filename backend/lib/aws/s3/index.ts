import * as AWS from 'aws-sdk';
import * as config from 'config';
import { Stream } from 'stream';

const {
  accessKeyId,
  secretAccessKey,
} = config.get('aws');

const S3 = new AWS.S3({ accessKeyId, secretAccessKey });

export const upload = (bucket: string, mimeType: string, filename: string, stream: Stream, attachmentName?: string) =>
  S3.upload({
    Bucket: bucket,
    Body: stream,
    Key: filename,
    ContentType: mimeType,
    ContentDisposition: 'inline',
  }).promise()
    .then(({ Location }) => ({ url: Location }));

export const updateContentDisposition = (bucket: string, mimeType: string, url: string, attachmentName: string) =>
  S3.copyObject({
    Bucket: bucket,
    CopySource: `${bucket}/${url}`,
    Key: url,
    ContentType: mimeType,
    ContentDisposition: 'inline',
    CacheControl: 'Max-Age=1',
    MetadataDirective: 'REPLACE',
  }).promise();

export const remove = (bucket: string, filename: string) =>
  S3.deleteObject({
    Bucket: bucket,
    Key: filename,
  }).promise();

export const download = (bucket: string, url: string) =>
  S3.getObject({
    Bucket: bucket,
    Key: url,
  }).promise();
