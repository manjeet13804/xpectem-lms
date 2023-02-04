import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Certification } from './certification.entity';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { CertificationBooking } from './certification-booking.entity';
import { CertificationBookingService } from './certification-booking.service';
import { CertificationBookingController } from './certification-booking.controller';
import { MyCourseModule } from '../../my-course/my-course.module';

@Module({
  imports: [
    MyCourseModule,
    TypeOrmModule.forFeature([
      Certification,
      CertificationBooking,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    CertificationController,
    CertificationBookingController,
  ],
  providers: [
    CertificationService,
    CertificationBookingService,
  ],
})
export class CertificationModule {}
