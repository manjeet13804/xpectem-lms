import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Topic } from '../../entity/Topics';
import { Course } from '../../entity/Course';

@Entity()
@Unique(['course', 'topic'])
export class CourseTopic {
  @ManyToOne(
    () => Topic,
    topic => topic.courseTopics,
    { primary: true, onDelete: 'CASCADE' },
  )
  public topic: Topic;

  @ManyToOne(
    () => Course,
    course => course.courseTopics,
    { primary: true },
  )
  public course: Course;

  @PrimaryColumn()
  public order: number;

  constructor(courseTopic: Partial<CourseTopic>) {
    !!courseTopic && Object.assign(this, courseTopic);
  }
}
