import { forwardRef, Module, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tools } from '../../common/tools/tools';
import { User } from '../../entity/User';
import { AuthModule } from '../auth/auth.module';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { LmsGroupModule } from './../lms-group/lms-group.module';
import { UploadModule } from './../upload/upload.module';
import { AdminUserController } from './admin.user.controller';
import { AdminService } from './admin/admin.service';
import { AdminGroupController } from './admin/group/admin.group.controller';
import { AdminGroupService } from './admin/group/admin.group.service';
import { AdminLmsController } from './admin/lms/admin.lms.controller';
import { AdminLmsService } from './admin/lms/admin.lms.service';
import { AdminOrganisationController } from './admin/organisation/admin.organisation.controller';
import { AdminOrganisationService } from './admin/organisation/admin.organisation.service';
import { UserProfileService } from './user-profile.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminStudentController } from './student/admin.student.controller';
import { StudentService } from './student/student.service';
import { AdminCertificationModule } from '../admin-certification/admin-certification.module';
import { AdminTutorController } from './tutor/admin.tutor.controller';
import { AdminTutorService } from './tutor/admin.tutor.service';
import { AdminNotificationsModule } from '../admin-notification/admin-notification.module';
import { AdminTutorFilesController } from './tutor/admin.tutor-files.controller';
import { AdminTutorFilesService } from './tutor/admin.tutor-files.service';
import { CourseCreatorsService } from './course-creators/course.creators.service';
import { CourseCreatorsController } from './course-creators/course.creators.controller';
import { ToolsModule } from '../../common/tools/tools.module';
import { RegistrationLinksService } from './registration-links/registration-links.service';
import { RegistrationLinksController } from './registration-links/registration-links.controller';

@Module({
  controllers: [
    UserController,
    AdminUserController,
    AdminGroupController,
    AdminOrganisationController,
    AdminLmsController,
    AdminStudentController,
    AdminTutorController,
    AdminTutorFilesController,
    CourseCreatorsController,
    RegistrationLinksController,
  ],
  exports: [
    UserService,
    UserProfileService,
    StudentService,
    TypeOrmModule.forFeature([User]),
  ],
  imports: [
    forwardRef(() => LmsGroupModule),
    forwardRef(() => AdminNotificationsModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UploadModule),
    forwardRef(() => AdminCertificationModule),
    HttpModule,
    ToolsModule,
    forwardRef(() => AuthModule)
  ],
  providers: [
    UserService,
    UserProfileService,
    ForgotPasswordService,
    UploadModule,
    AdminGroupService,
    AdminOrganisationService,
    AdminLmsService,
    AdminService,
    StudentService,
    AdminTutorService,
    AdminTutorFilesService,
    CourseCreatorsService,
    RegistrationLinksService,
  ],
})
export class UserModule { }
