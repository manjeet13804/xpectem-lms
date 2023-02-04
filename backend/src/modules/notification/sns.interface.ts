export interface ISNSSetParams {
  AttributeName: string;
  TopicArn: string;
  AttributeValue: string;
}

export interface ISNSPublishParams {
  Message: string;
  TopicArn: string;
}

export interface ISNSSubscribe {
  Protocol: string;
  TopicArn: string;
  Endpoint: string;
}
