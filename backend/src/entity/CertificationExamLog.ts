import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { CourseStudent } from './CourseStudent';

@Entity()
export class CertificationExamLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => CourseStudent, courseStudent => courseStudent.certificationExamLogs, { onDelete: 'CASCADE' })
  public courseStudent: CourseStudent;

  @Column()
  public date: Date;

  @Column()
  public results: string;

  @Column()
  public isPassed: boolean;

  constructor(certificationExamLog: Partial<CertificationExamLog>) {
    if (certificationExamLog) {
      Object.assign(this, certificationExamLog);
    }
  }
}
