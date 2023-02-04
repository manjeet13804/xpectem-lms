import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../entity/User';
import { Assignment } from './assignment/assignment.entity';
import { AssignmentView } from './assignment/assignment.view';
import { Exam } from '../../entity/Exam';
import { Lesson } from './lesson/lesson.entity';
import { LessonView } from './lesson/lesson.view';
import { Topic } from '../../entity/Topics';

@Expose()
export class TopicView {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly version: string;

  @ApiModelProperty()
  public readonly description: string|null;

  @Expose()
  @Type(() => LessonView)
  public readonly lessons: LessonView[];

  @Expose()
  @Type(() => Topic)
  public readonly topic: Topic;

  @Expose()
  @Type(() => AssignmentView)
  public readonly assignments: AssignmentView[];

  @Expose()
  public readonly exams: Exam[];

  @Exclude()
  public readonly user: User;

  @Expose()
  public readonly isClosed: boolean;

  public constructor(
    {
      id,
      name,
      version,
      description,
      lessons,
      assignments,
      exams,
    }: Topic,
    user: User,
    isClosed: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.description = description;
    this.isClosed = isClosed;
    this.lessons = lessons && lessons.map(
      (lesson: Lesson) => new LessonView(lesson, user),
    );
    this.assignments = assignments && assignments.map(
      (assignment: Assignment) => new AssignmentView(assignment, user),
    );
    this.exams = exams;
    this.user = user;
  }

  @Expose()
  public isCompleted() {
    return this.lessons.every(
      ({ isViewed }: LessonView): boolean => isViewed,
    );
  }
}
