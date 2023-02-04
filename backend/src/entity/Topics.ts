import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { Lesson } from './Lesson';
import { Assignment } from './Assignment';
import { Exam } from './Exam';
import { CourseTopic } from '../modules/course/course-topic.entity';
import { CourseAttachment } from './CourseAttachment';

@Expose()
@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  @ApiModelProperty()
  public name: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  public version: string;

  @Column({ nullable: true, type: 'text' })
  @ApiModelProperty()
  public description?: string;

  @Type(() => Lesson)
  @OneToMany(() => Lesson, lesson => lesson.topic, { cascade: true })
  @ApiModelProperty({ type: () => Lesson, isArray: true })
  public lessons: Lesson[];

  @Type(() => Assignment)
  @OneToMany(() => Assignment, assignment => assignment.topic, { cascade: true })
  @ApiModelProperty({ type: () => Assignment, isArray: true })
  public assignments: Assignment[];

  @Type(() => Exam)
  @OneToMany(() => Exam, exam => exam.topic, { cascade: true })
  @ApiModelProperty({ type: () => Exam, isArray: true })
  public exams: Exam[];

  @Exclude()
  @OneToMany(() => CourseTopic, courseTopic => courseTopic.topic, { cascade: true })
  public courseTopics: CourseTopic[];

  @OneToMany(() => CourseAttachment, courseAttachment => courseAttachment.topic, { cascade: true })
  public files: CourseAttachment[];

  constructor(topic: Partial<Topic>) {
    if (topic) {
      Object.assign(this, topic);
    }
  }
}
