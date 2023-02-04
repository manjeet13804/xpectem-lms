import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';

@Module({
  controllers: [ForgotPasswordController],
  exports: [ForgotPasswordService],
  imports: [
    UserModule,
  ],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
