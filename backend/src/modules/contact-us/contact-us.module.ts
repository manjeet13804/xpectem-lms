import { MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { MyCourseModule } from './../my-course/my-course.module';
import { UploadModule } from './../upload/upload.module';
import { UserModule } from './../user/user.module';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailerModule,
    UploadModule,
    UserModule,
    MyCourseModule,
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: [ContactUsService],
})
export class ContactUsModule { }
