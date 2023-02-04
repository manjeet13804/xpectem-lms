import { Module } from '@nestjs/common';

import { AddEmailController } from './add-email.controller';
import { AddEmailService } from './add-email.service';

@Module({
  controllers: [AddEmailController],
  providers: [AddEmailService],
})
export class AddEmailModule { }
