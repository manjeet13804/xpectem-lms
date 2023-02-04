import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Course } from '../../entity/Course';
import { FaqTypeEnum } from './faq-type.enum';
import { FaqTopic } from './faq-topic.entity';

@Expose()
@Entity()
export class Faq {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Exclude()
  @JoinColumn()
  @OneToOne(
    () => Course,
    { nullable: true },
  )
  public course?: Course|null;

  @ApiModelProperty({
    type: [FaqTopic],
  })
  @JoinTable({
    name: 'faq_to_topic',
  })
  @ManyToMany(
    () => FaqTopic,
    topic => topic.faqs,
  )
  public topics: FaqTopic[];

  @ApiModelProperty()
  @Column({ type: 'enum', enum: FaqTypeEnum })
  public type: FaqTypeEnum;

  constructor(faq: Partial<Faq>) {
    if (faq) {
      Object.assign(this, faq);
    }
  }
}
