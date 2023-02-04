import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { FaqTopic } from './faq-topic.entity';
import { ICreateFaqQuestion } from './faq.interface';

@Expose()
@Entity()
@Index(
  ['question', 'answer'],
  { fulltext: true },
)
export class FaqQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ApiModelProperty()
  @Column({ type: 'text' })
  public question: string;

  @ApiModelProperty()
  @Column({ type: 'text' })
  public answer: string;

  @Exclude()
  @ManyToOne(
    () => FaqTopic,
    topic => topic.questions,
  )
  public topic: FaqTopic;

  create(data: ICreateFaqQuestion) {
    return new FaqQuestion(data);
  }

  constructor(faqQuestion: Partial<FaqQuestion>) {
    !!faqQuestion && Object.assign(this, faqQuestion);
  }
}
