import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../../entity/User';
import { Course } from '../../../entity/Course';
import { Certification } from './certification.entity';

@Entity()
@Unique(['user', 'course'])
export class CertificationBooking {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ManyToOne(() => User)
  public user: User;

  @ManyToOne(
    () => Course,
    course => course.certificationBookings,
  )
  public course: Course;

  @ManyToOne(
    () => Certification,
    certification => certification.bookings,
  )
  public certification: Certification;

  constructor(booking: Partial<CertificationBooking>) {
    !!booking && Object.assign(
      this,
      booking,
    );
  }
}
