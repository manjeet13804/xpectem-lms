import { Raw, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyCourseService } from '../../my-course/my-course.service';
import { Certification } from './certification.entity';
import { CourseIsNotFinishedYetException } from '../course-is-not-finished-yet.exception';
import { User } from '../../../entity/User';

@Injectable()
export class CertificationBookingService {
  public constructor(
    public readonly courses: MyCourseService,
    @InjectRepository(Certification) public readonly certifications: Repository<Certification>,
  ) {}

  public async book(user, courseId, certificateId): Promise<void> {
    const course = await this.courses.getMyCourse(user, courseId);

    const student = course.getStudentFor(user);

    if (!student || !student.doneAt) {
      throw CourseIsNotFinishedYetException.for(course);
    }

    const certification = await this.certifications.findOneOrFail(
      certificateId,
      {
        relations: ['bookings', 'bookings.user'],
        where: {
          startAt: Raw(alias => `${alias} > NOW()`),
        },
      },
    );

    certification.book(user, course);

    await this.certifications.save(certification);
  }

  public async cancel(
    user: User,
    courseId: number,
    certificateId: number,
  ): Promise<void> {
    const course = await this.courses.getMyCourse(user, courseId);

    const student = course.getStudentFor(user);

    if (!student || !student.doneAt) {
      throw CourseIsNotFinishedYetException.for(course);
    }

    const certification = await this.certifications.findOneOrFail(
      certificateId,
      {
        relations: [
          'bookings',
          'bookings.user',
          'bookings.course',
        ],
      },
    );

    certification.cancel(user, course);

    await this.certifications.save(certification);
  }
}
