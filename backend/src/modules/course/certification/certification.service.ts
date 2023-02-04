import { Connection, Raw, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyCourseService } from '../../my-course/my-course.service';
import { Certification } from './certification.entity';
import { CourseIsNotFinishedYetException } from '../course-is-not-finished-yet.exception';
import { CertificationView } from './certification.view';
import { User } from '../../../entity/User';
import { Course } from '../../../entity/Course';

@Injectable()
export class CertificationService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    public readonly courses: MyCourseService,
    @InjectRepository(Certification) public readonly certifications: Repository<Certification>,
    public readonly connection: Connection,
  ) {}

  public async getAll(user, courseId) {
      const studentEntity = await this.entityManager.findOne(User, { id: user.id });
      const course = await this.connection.getRepository(Course)
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.students', 'students')
        .leftJoinAndSelect('students.user', 'student')
        .where('course.id = :id', { id: courseId })
        .andWhere('student.id = :studentId', { studentId: user.id })
        .getOne();

      if (!course) {
        throw new BadRequestException({ error: 'Course isn\'t certified or this course doesnt exists.' });
      }

      const student = course.getStudentFor(studentEntity);

      if (student && student.doneAt) {
        const certifications = await this.certifications
          .createQueryBuilder('c')
          .leftJoinAndSelect('c.bookings', 'cb')
          .leftJoinAndSelect('cb.user', 'user')
          .leftJoinAndSelect('cb.course', 'course')
          .where('c.startAt > NOW()')
          .orderBy('c.startAt', 'ASC')
          .getMany();

        return certifications
          .map(
          certification => new CertificationView(
            certification,
            course,
            user,
          ),
        );
      }

    throw CourseIsNotFinishedYetException.for(course);
  }
}
