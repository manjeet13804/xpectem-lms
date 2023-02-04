import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../entity/User';
import { TopicView } from '../topic/topic.view';
import { CourseCertificate } from '../course/course-certificate.entity';
import { CourseMedia } from '../course/course-media.embedded';
import { CourseTime } from '../course/course-time.embedded';
import { CourseStudyPlan } from '../course/course-study-plan.embedded';
import { CourseLink } from '../course/course-link.entity';
import { CourseCategory } from '../course-category/course-category.entity';
import { CourseStatus } from '../course/course-status.enum';
import { Course } from '../../entity/Course';
import { CourseStudent } from '../course/course-student.entity';
import * as _ from 'lodash';
import { CourseTranslation } from '../../entity/CourseTranslation';

@Exclude()
export class MyCourseView {
  @Expose()
  @ApiModelProperty()
  public readonly id: number;

  @Expose()
  @ApiModelProperty()
  public readonly title: string;

  @Expose()
  @ApiModelProperty()
  public readonly version: string;

  @Expose()
  @ApiModelProperty()
  public readonly contentList: string;

  @Expose()
  @ApiModelProperty()
  public readonly shortDescription: string;

  @Expose()
  @ApiModelProperty()
  public readonly description: string;

  @Expose()
  @ApiModelProperty()
  public readonly examination: string;

  @Expose()
  @ApiModelProperty()
  public readonly imageUri: string;

  @Expose()
  @ApiModelProperty()
  public readonly language: string;

  @Expose({ name: 'certificate' })
  @ApiModelProperty()
  public readonly courseCertificate: CourseCertificate;

  @Expose()
  @ApiModelProperty()
  public readonly isCertified: boolean;

  @Expose()
  @ApiModelProperty()
  public readonly certifiedInfo: string;

  @Expose()
  @ApiModelProperty()
  public readonly isLinear: boolean;

  @Expose()
  @ApiModelProperty()
  public readonly isConsistently: boolean;

  @Expose()
  @Type(() => CourseMedia)
  @ApiModelProperty()
  public readonly media: CourseMedia;

  @Expose()
  @ApiModelProperty()
  public readonly otherInfo: string;

  @Expose()
  @ApiModelProperty()
  public readonly previousKnowledge: string;

  @Expose()
  @ApiModelProperty()
  public readonly price: number;

  @Expose()
  @ApiModelProperty()
  public readonly systemRequirements: string;

  @Expose()
  @ApiModelProperty()
  public readonly targetGroup: string;

  @Expose()
  @ApiModelProperty()
  public readonly length: string;

  @Expose()
  @ApiModelProperty()
  public isStepByStepTopics: boolean;

  @Expose()
  @Type(() => CourseTime)
  @ApiModelProperty()
  public readonly time: CourseTime;

  @Expose()
  @ApiModelProperty()
  public readonly studyPlan?: CourseStudyPlan | null;

  @Expose()
  @ApiModelProperty()
  public readonly welcomeFileUrl: string;

  @Expose()
  @Type(() => CourseLink)
  @ApiModelProperty({ type: () => CourseLink, isArray: true })
  public readonly links: CourseLink[];

  @Exclude()
  public students: CourseStudent[];

  @Expose()
  @Type(() => User)
  @ApiModelProperty({ type: () => User, isArray: true })
  public readonly tutors: User[];

  @Expose()
  @ApiModelProperty({ type: [CourseCategory] })
  public readonly categories: CourseCategory[];

  @Expose()
  @ApiModelProperty({
    enum: [
      'unpublished',
      'published',
      'archived',
    ],
  })
  public readonly status: CourseStatus;

  @Expose({ name: 'topics', groups: ['full'] })
  @Type(() => TopicView)
  @Transform(
    (courseTopics = [], { student }) => student
      && student.hasAccess
      && courseTopics.map((courseTopic, i) => {
        const isStepByStepTopics = _.get(courseTopic, 'course.isStepByStepTopics', false);
        const previousTopicLessons = _.get(courseTopics[i - 1], 'topic.lessons', []);
        const isViewed = previousTopicLessons.every(lesson => {
          return lesson.studentLogs && lesson.studentLogs.find(({ student: lessonStudent }): boolean => lessonStudent.id === student.user.id)
        })
        const isClosed = i !== 0 && isStepByStepTopics && !isViewed;

        return new TopicView(courseTopic.topic, student.user, isClosed)
      },
    ),
    { toPlainOnly: true },
  )
  public readonly courseTopics: TopicView[];

  @Exclude()
  public readonly course: Course;

  @Exclude()
  public readonly user: User;

  @Expose()
  public readonly welcomeLetterTemplate: string;

  @Expose()
  public readonly translations: CourseTranslation[];

  constructor(course: Course, user: User) {
    const { students } = course;

    Object.assign(
      this,
      {
        ...course,
        students: students.map(
          student => new CourseStudent({
            ...student,
            course,
          }),
        ),
      },
    );

    this.course = course;
    this.user = user;
  }

  @Expose()
  @Type(() => CourseStudent)
  get student() {
    return this.students.find(
      ({ user }: CourseStudent) => user.id === this.user.id,
    );
  }
}
