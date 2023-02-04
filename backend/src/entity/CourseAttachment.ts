import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileTopics } from './FileTopics';
import { Course } from './Course';
import { Lesson } from './Lesson';
import { Topic } from './Topics';

@Expose()
@Entity()
export class CourseAttachment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;

  @Column()
  public createdAt: Date;

  @ManyToOne(type => FileTopics, fileTopics => fileTopics.files)
  public fileTopics: FileTopics;

  @ManyToMany(type => Course, course => course.courseAttachment)
  public courses: Course[];

  @ManyToOne(() => Lesson, lesson => lesson.files, { onDelete: 'CASCADE' })
  public lesson: Lesson;

  @ManyToOne(() => Topic, topic => topic.files, { onDelete: 'CASCADE' })
  public topic: Topic;

  constructor(courseAttachment: Partial<CourseAttachment>) {
    !!courseAttachment && Object.assign(this, courseAttachment);
  }
}
