import { Module } from '@nestjs/common';
import { CourseFaqController } from './course-faq.controller';
import { FaqModule } from '../../faq/faq.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    FaqModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CourseFaqController],
})
export class CourseFaqModule {
}
