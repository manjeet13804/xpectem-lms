import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { FaqQuestion } from './faq-question.entity';
import { Faq } from './faq.entity';
import { ICreateFaqTopic } from './faq.interface';

@Expose()
@Entity()
export class FaqTopic {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ApiModelProperty()
  @Column()
  public title: string;

  @Exclude()
  @JoinTable({
    name: 'faq_to_topic',
  })
  @ManyToMany(
    () => Faq,
    faq => faq.topics,
  )
  public faqs: Faq[];

  @ApiModelProperty({
    type: [FaqQuestion],
  })
  @OneToMany(
    () => FaqQuestion,
    question => question.topic,
  )
  public questions: FaqQuestion[];

  create(data: ICreateFaqTopic) {
    return new FaqTopic(data);
  }

  constructor(faqTopic: Partial<FaqTopic>) {
    !!faqTopic && Object.assign(this, faqTopic);
  }
}
