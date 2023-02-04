import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { differenceInHours } from 'date-fns/fp';
import { CertificationBooking } from './certification-booking.entity';
import { User } from '../../../entity/User';
import { Course } from '../../../entity/Course';
import { CertificationAlreadyBookedException } from './certification-already-booked.exception';
import { CertificationBookingCancellationTimeExpiredException } from './certification-booking-cancellation-time-expired.exception';

@Entity()
@Expose()
export class Certification {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  @ApiModelProperty()
  public city: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  public street: string|null;

  @Column({ nullable: true })
  @ApiModelProperty()
  public zip: number|null;

  @Exclude()
  @OneToMany(
    () => CertificationBooking,
    booking => booking.certification,
    { cascade: ['insert', 'update', 'remove'] },
  )
  public bookings: CertificationBooking[];

  @Column()
  @ApiModelProperty()
  public startAt: Date;

  @Exclude()
  public getStudentById = (id: number): User|undefined => {
    const booking = this.bookings.find(
      ({ user }) => user.id === id,
    );

    return !!booking
      ? booking.user
      : undefined;
  }

  @Exclude()
  public book = (user: User, course: Course): void => {
    const alreadyBookedThisCourse = course.getIsCertificationBookedFor(
      user.id,
    );

    const booking = course.getBookingFor(user.id)
      || new CertificationBooking({
        user,
        course,
        certification: this,
      });

    if (alreadyBookedThisCourse) {
      throw CertificationAlreadyBookedException.forThis(
        booking.certification,
      );
    }

    if (!booking.certification) {
      booking.certification = this;
    }

    this.bookings.push(booking);
  }

  @Exclude()
  public cancel = (user: User, course: Course): void => {
    const isNotExistsBooking = !this.bookings.find(
      ({
         user: { id: userId },
         course: { id: courseId },
      }) => userId === user.id
        && courseId === course.id,
    );

    if (isNotExistsBooking) {
      throw new NotFoundException(
        `Booking for Certification#${this.id} not found.`,
      );
    }

    const leftHours = differenceInHours(Date.now(), this.startAt);

    if (leftHours < 12) {
      throw CertificationBookingCancellationTimeExpiredException.for(this);
    }

    const index = this.bookings.findIndex(
      ({
         user: { id: userId },
         course: { id: courseId },
       }) => userId === user.id
        && courseId === course.id,
    );

    delete this.bookings[index];
  }
}
