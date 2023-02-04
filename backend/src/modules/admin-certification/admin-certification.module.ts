import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Certification } from '../course/certification/certification.entity';
import { AdminCertificationService } from './admin-certification.service';
import { AdminCertificationController } from './admin-certification.controller';
import { CertificationBooking } from '../course/certification/certification-booking.entity';
import { CertificationBookingService } from '../course/certification/certification-booking.service';
import { CertificationBookingController } from '../course/certification/certification-booking.controller';
import { MyCourseModule } from '../my-course/my-course.module';

@Module({
  imports: [
    forwardRef(() => MyCourseModule),
    TypeOrmModule.forFeature([
      Certification,
      CertificationBooking,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AdminCertificationController,
    CertificationBookingController,
  ],
  providers: [
    AdminCertificationService,
    CertificationBookingService,
  ],
})
export class AdminCertificationModule {}
