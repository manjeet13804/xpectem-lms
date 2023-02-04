import { CourseModule } from './modules/course/course.module';
import { CertificationModule } from './modules/course/certification/certification.module';
import { CourseFaqModule } from './modules/course/faq/course-faq.module';
import { CourseCommunicationModule } from './modules/course/communication/course-communication.module';

export const routes = [
  {
    path: '/course',
    module: CourseModule,
    children: [
      {
        path: ':courseId/certification',
        module: CertificationModule,
      },
      {
        path: ':courseId/faq',
        module: CourseFaqModule,
      },
      {
        path: 'communication',
        module: CourseCommunicationModule,
      },
    ],
  },
];
