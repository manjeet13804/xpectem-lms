import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../../entity/User';
import { Lesson } from './lesson.entity';
import { StudentLessonLog } from './student-lesson-log.entity';

@Expose()
export class LessonView {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly url: string;

  @Exclude()
  public readonly lesson: Lesson;

  @Exclude()
  public readonly user: User;

  public constructor(
    lesson: Lesson,
    user: User,
  ) {
    this.id = lesson.id;
    this.name = lesson.name;
    this.url = lesson.url
    this.lesson = lesson;
    this.user = user;
  }

  @Expose()
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  get viewedAt() {
    const studentLog = this.lesson.studentLogs.find(
        ({ student }: StudentLessonLog): boolean => student.id === this.user.id,
    );

    return studentLog && studentLog.viewedAt || null;
  }

  @Expose()
  @ApiModelProperty({ type: Boolean })
  get isViewed() {
    return !!this.viewedAt;
  }
}
