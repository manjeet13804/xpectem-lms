import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { Certification } from './certification.entity';
import { User } from '../../../entity/User';
import { Course } from '../../../entity/Course';

@Expose()
export class CertificationView {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly city: string;

  @ApiModelProperty()
  public readonly street: string|null;

  @ApiModelProperty()
  public readonly zip: number|null;

  @ApiModelProperty({ type: 'string', format: 'date-time' })
  public readonly startAt: Date;

  @Exclude()
  public readonly course: Course;

  @Exclude()
  public readonly user: User;

  public constructor(
    certification: Certification,
    course: Course,
    user: User,
  ) {
    this.id = certification.id;
    this.city = certification.city;
    this.street = certification.street;
    this.zip = certification.zip;
    this.startAt = certification.startAt;
    this.course = course;
    this.user = user;
  }

  @Expose()
  public isBooked() {
    if (!this.user) {
      return false;
    }

    const booking = this.course.getBookingFor(
      this.user.id,
    );

    if (!booking || !booking.certification) {
      return false;
    }

    const {
      id: certificationId,
    } = booking.certification;

    return certificationId === this.id;
  }
}
