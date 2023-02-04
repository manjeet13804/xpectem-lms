import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MyCourseModule } from '../my-course/my-course.module';
import { MyCertificateController } from './my-certificate.controller';
import { MyCertificateService } from './my-certificate.service';

@Module({
  controllers: [MyCertificateController],
  exports: [MyCertificateService],
  imports: [
    MyCourseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    MyCertificateService,
  ],
})
export class MyCertificateModule {}
