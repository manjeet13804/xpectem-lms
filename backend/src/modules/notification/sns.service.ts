import { Injectable, Logger } from '@nestjs/common';

import { SNS } from '../../../lib/aws/sns';
import { ISNSPublishParams, ISNSSetParams, ISNSSubscribe } from './sns.interface';

@Injectable()
export class SNSService {

  constructor() { }

  public async createTopic(topicName: string) {
    return SNS
      .createTopic({ Name: topicName })
      .promise()
      .catch(e => Logger.error(e));
  }

  public async listTopics() {
    return SNS
      .listTopics({})
      .promise()
      .catch(e => Logger.error(e));
  }

  public async deleteTopic(topicArn: string) {
    return SNS
      .deleteTopic({ TopicArn: topicArn })
      .promise()
      .catch(e => Logger.error(e));
  }

  public async getTopicAttributes(topicArn: string) {
    return SNS
      .getTopicAttributes({ TopicArn: topicArn })
      .promise()
      .catch(e => Logger.error(e));
  }

  public async setTopicAttributes(params: ISNSSetParams) {
    return SNS
      .setTopicAttributes(params)
      .promise()
      .catch(e => Logger.error(e));
  }

  public async publishTopic(params: ISNSPublishParams) {
    return SNS
      .publish(params)
      .promise()
      .catch(e => Logger.error(e));
  }

  public async listSubscriptions(topicArn: string) {
    return SNS
      .listSubscriptionsByTopic({ TopicArn: topicArn })
      .promise()
      .catch(e => Logger.error(e));
  }

  public async subscribeEmail(params: ISNSSubscribe) {
    return SNS
      .subscribe(params)
      .promise()
      .catch(e => Logger.error(e));
  }

  public async unsubscribe(subscriptionArn: string) {
    return SNS
      .unsubscribe({ SubscriptionArn: subscriptionArn })
      .promise()
      .catch(e => Logger.error(e));
  }

}
