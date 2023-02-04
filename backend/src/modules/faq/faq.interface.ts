import { FaqQuestion } from './faq-question.entity';
import { Faq } from './faq.entity';
import { FaqTopic } from './faq-topic.entity';

export interface ICreateFaqTopic {
  readonly title: string;
  readonly questions: FaqQuestion[];
  readonly faqs: Faq[];
}

export interface ICreateFaqQuestion {
  readonly topic: FaqTopic;
  readonly answer: string;
  readonly question: string;
}
