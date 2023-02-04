import { Injectable } from '@nestjs/common';
import { User } from '../../entity/User';
import { Course } from '../../entity/Course';
import { MyCertificateDto } from './my-certificate.dto';
import { MyCourseRepository } from '../my-course/my-course.repository';
import * as _ from 'lodash';

@Injectable()
export class MyCertificateService {
  constructor(private readonly courses: MyCourseRepository) {}

  async getMyCertificates(user: User): Promise<MyCertificateDto[]> {
    const courses = await this.courses.getDoneCoursesFor(user.id);

    return courses.map(
      (course: Course): MyCertificateDto => {
        const student = course.getStudentFor(user);
        const url = _.get(course, 'courseCertificate.url', '');

        return new MyCertificateDto(
          student.id,
          url,
          course,
        );
      },
    );
  }
}
