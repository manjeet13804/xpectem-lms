import { Connection, Raw, Repository } from 'typeorm';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyCourseService } from '../my-course/my-course.service';
import { Certification } from '../course/certification/certification.entity';
import { CourseIsNotFinishedYetException } from '../course/course-is-not-finished-yet.exception';
import { CertificationView } from '../course/certification/certification.view';
import { CertificationBooking } from '../course/certification/certification-booking.entity';
import { User } from '../../entity/User';
import { Course } from '../../entity/Course';
import { MyCourseRepository } from '../my-course/my-course.repository';
import { CertificateDto, CreateCertificateDto } from './dto/admin.certification.dto';
import { DB_CODES } from '../../common/enums/dataBaseCodes'

const { duplicateKey } = DB_CODES;
@Injectable()
export class AdminCertificationService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    public readonly courses: MyCourseService,
    public readonly connection: Connection,
    private readonly courseRepository: MyCourseRepository,
    @InjectRepository(Certification) public readonly certifications: Repository<Certification>,
  ) {}

  public async deleteCertificate(id: number): Promise<HttpStatus> {
    await this.certifications.delete(id)

    return HttpStatus.OK;
  }
  
  public async updateCertificate(id: number, body: CreateCertificateDto): Promise<CertificateDto> {
    await this.certifications.update({ id }, body);

    return this.certifications.findOne(id);
  }

  public async createCertificate(body: CreateCertificateDto): Promise<CertificateDto> {
    return this.certifications.save(body)
  }

  public async getAllCertifications(): Promise<CertificateDto[]> {
    return this.certifications.find()
  }

  public async getListCertification(studentId: number, courseId: number): Promise<CertificationView[]> {
    const studentEntity = await this.entityManager.findOne(User, { id: studentId });
    const course = await this.connection.getRepository(Course)
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.students', 'students')
      .leftJoinAndSelect('students.user', 'student')
      .where('course.id = :id', { id: courseId })
      .andWhere('student.id = :studentId', { studentId })
      .getOne();

    if (!course) {
      throw new BadRequestException({ error: 'Course isn\'t certified or this course doesnt exists.' });
    }

    const student = course.getStudentFor(studentEntity);

    if (student && student.doneAt) {
      return this.certifications
        .createQueryBuilder('c')
        .select('c.*, cb.id IS NOT NULL as reserved')
        .leftJoin('c.bookings', 'cb', 'cb.user = :studentId', { studentId })
        .getRawMany();
    }

    throw CourseIsNotFinishedYetException.for(course);
  }

  public async reserveCertificationBooking(studentId: number, courseId: number, certificateId: number): Promise<CertificationView[]> {
    const studentEntity = await this.entityManager.findOne(User, { id: studentId });
    const course = await this.connection.getRepository(Course)
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.students', 'students')
      .leftJoinAndSelect('students.user', 'student')
      .where('course.id = :id', { id: courseId })
      .andWhere('student.id = :studentId', { studentId })
      .getOne();

    if (!course) {
      throw new BadRequestException({ error: 'Course isn\'t certified or this course doesnt exists.' });
    }

    const student = course.getStudentFor(studentEntity);

    if (!student || !student.doneAt) {
      throw CourseIsNotFinishedYetException.for(course);
    }

    const certification = await this.connection
      .getRepository(Certification)
      .createQueryBuilder('certification')
      .leftJoinAndSelect('certification.bookings', 'bookings')
      .leftJoinAndSelect('bookings.user', 'student')
      .where('certification.id = :certificateId', { certificateId })
      .andWhere('certification.startAt > NOW()')
      .getOne();

    try {
      certification.book(studentEntity, course);
      await this.certifications.save(certification);
    
      return this.certifications
        .createQueryBuilder('c')
        .select('c.*, cb.id IS NOT NULL as reserved')
        .leftJoin('c.bookings', 'cb', 'cb.user = :studentId', { studentId })
        .getRawMany();
    } catch(e) {
      if (e.code === duplicateKey) {
        throw new BadRequestException({ error: 'You can\'t reserve more then one certification date for one course' });
      }
      throw new BadRequestException({ error: 'Problem with reserve certification date' })
    }
  }

  public async cancelReserve(studentId: number, courseId: number): Promise<CertificationView[]> {
    const certificationBooking = await this.connection.getRepository(CertificationBooking)
      .createQueryBuilder('certificationBooking')
      .where('certificationBooking.user = :studentId', { studentId })
      .andWhere('certificationBooking.course = :courseId', { courseId })
      .getOne();

    if (!certificationBooking) {
      throw new BadRequestException({ error: 'Booking doesn\'t exists.' });
    }

    await this.entityManager.delete(CertificationBooking, certificationBooking);

    return this.certifications
      .createQueryBuilder('c')
      .select('c.*, cb.id IS NOT NULL as reserved')
      .leftJoin('c.bookings', 'cb', 'cb.user = :studentId', { studentId })
      .getRawMany();
  }
}
